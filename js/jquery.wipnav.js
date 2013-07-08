/**
* Wipnav - jQuery Plugin
* Responsive Navigation
*
* Copyright (c) 2013 Florian Fassing
* 
* @author Florian Fassing
* @version 0.0.13 (03.07.13)
* 
* Requires: jQuery v1.4.3+
*
* Licensed under Creative Commons Attribution-NonCommercial 3.0:
*   http://creativecommons.org/licenses/by-nc/3.0/legalcode
*/

var ns = 'wipnav'; // Namespace

(function( $ ) {

  var methods = {
    /*
    * The initialization method.
    *
    * @param options Configuration of the wipnav plugin.
    *
    */
    init : function( options ) {

      // SETTINGS
      var settings = $.extend({
        'sufi'          : false,             // Use wipnav in conjunction with superfish?
        'sufiSettings'  : null,              // If used with superfish the settings are needed for restarting the superfish navigation.
        /*'subIndent'   : 0,*/               // Indention for links on lower levels.
        'linkScaleUp'   : '',                // Scale mobile links up. Padding in px.
        'type'          : 'accordion',       // Determines the type of the mobile navigation.
        'threshold'     : 980,               // Wipnav gets activated when page-width is equal or under threshold.
        'navButton'     : null,              // The selector for an optional button to hide and display the whole navigation.
        'navAnim'       : {height: 'toggle'} // Animation when navigation is toggled via the trigger specified in navButton.
      }, options);
      
      return this.each(function(){

        var $this = $(this),
        data = $this.data(ns);
        
        // If the plugin hasn't been initialized yet
        if ( settings['sufi'] && settings['sufiSettings'] == null ) {
          console.warn('Wipnav: Superfish settings are required in order to restart the Superfish Navigation on window resize. ' + settings['sufiSettings'] + ' is given!');
        } else if ( !data ) {

          // DATA INIT
          $this.data(ns, {
            mobNavAct : false,
            navWidth  : 0,
            settings  : settings,
            ulStyle   : { 'width' : '100%', 'padding-left' : '0', 'padding-right' : '0', 'visibility' : 'visible', 'position' : 'relative' },
            liAStyle  : { 'height' : 'auto', 'display' : 'block', 'width' : 'auto', 'padding-top' : settings['linkScaleUp'], 'padding-bottom' : settings['linkScaleUp'] },
            liStyle   : { 'width' : '100%', 'float' : 'none' }
          });
          data = $this.data(ns);
          
          /*
          *  Handles visibility of the nav button.
          *  Enables and disables superfish if necessary.
          *  Initializes and kills mobile navigation if necessary.
          *
          */
          $(settings['navButton']).hide();
          
          $(window).bind('resize.' + ns, function(){
            if ( $(window).width() <= settings['threshold'] ) {

              data['navWidth'] = $(this).outerWidth(true);

              if ( data.mobNavAct === false ) {

                $(settings['navButton']).show();

                if ( settings['sufi'] === true ) {
                  methods.killSF.apply($this);
                }
                
                data.mobNavAct = methods.initMobNav.call($this);
              }
            } else {

              if ( data.mobNavAct === true ) {

                $(settings['navButton']).hide();

                data.mobNavAct = methods.killMobNav.call($this);
                
                if ( settings['sufi'] === true ) {
                  methods.initSF.apply($this);
                }
              }  
            }
          });
          
          // Fire resize event once at the beginning.
          $(window).trigger('resize');
        } else {
          console.warn('Wipnav: Plugin has already been initialized!');
        }
      });
},

    /*
    * Enables the superfish Menu
    *
    * @param selector Selector of the container in which the superfish <ul> tag is nested.
    *
    */
    initSF : function( ) {
      var $this = $(this),
      data = $this.data(ns);
      
      $this.superfish( data.settings['sufiSettings'] );
    },
    
    /*
    * Disables the superfish Menu
    *
    */
    killSF : function( ) {
      var $this = $(this),
      data = $this.data(ns);
      
      $this.removeClass('sf-js-enabled');
      $this.find('li').off('mouseover').off('mouseout').off('hover');
    },
    
    /*
    * Enables the mobile navigation.
    * @param this The DOM object on which the wipnav got intialized.
    *
    */
    initMobNav : function( ) {
      var $this = $(this),
      data = $this.data(ns);
      
      // navButton logic
      if ( !($(data.settings['navButton']) == null) ) {
        // Hide menu initially
        $this.hide();
        $(data.settings['navButton']).removeClass('expanded').addClass('collapsed');
        $(data.settings['navButton']).bind('click.' + ns, function(){
          $(this).toggleClass('collapsed expanded')
          $this.animate(data.settings['navAnim']);
        });
      }

      // TYPE: ACCORDION
      if ( data.settings['type'] === 'accordion' ) {

        $this.find('li').css( data.liStyle ).has('ul').addClass('hasSub collapsed').find('>a,>span').bind('click.' + ns, function(){
          $this.find('li.expanded').not($(this).parent('li')).toggleClass('collapsed expanded').find('>ul').slideToggle();
          $(this).parent('li').toggleClass('collapsed expanded');
          $(this).siblings('ul').slideToggle();
          // Disables anchor functionality.
          return false;
        });

        $this.find('ul').css( data.ulStyle );
      }
      
      // TYPE: SLIDER
      if ( data.settings['type'] === 'slider' ) {

        $this.find('li').css( data.liStyle ).has('ul').addClass('hasSub collapsed').find('>a,>span').bind('click.' + ns, function(){

          // Navigate forth ->
          if( $(this).parent('li').hasClass('collapsed') ) {
            // show() needs to be called because superfish makes the submenu ul display: none.
            // TODO: Remove when removing superfish.
            $(this).siblings('ul').show().css('position', 'relative').animate({'left': 0});
            // Hide all navlinks which have not been clicked.
            $(this).parent('li').siblings('li').hide();
            $(this).parents('ul:first').siblings('a, span').hide();
            // Navigate back <-
          } else {
            $(this).siblings('ul').animate({'left': data['navWidth'] * -1}, function() {
              $(this).parent('li').siblings('li').show();
              $(this).parents('ul:first').siblings('a, span').show();
              $(this).css('position', 'absolute');
            });
          }

          $(this).parent('li').toggleClass('collapsed expanded');

          // Disables anchor functionality.
          return false;
        });

        $this.find('ul').css( data.ulStyle );
        $this.find('.hasSub > ul').css({'position': 'absolute', 'left' : data['navWidth'] * -1});
      }
      
      // Necessary styles
      $this.find('li a').css( data.liAStyle );
      
      return true;
    },
    
    /*
    * Disables the mobile navigation.
    *
    */
    killMobNav : function( ) {
      var $this = $(this),
      data = $this.data(ns);
      
      // REMOVE navButton logic
      if ( !($(data.settings['navButton']) == null) ) {
        $this.show();
        $(data.settings['navButton']).unbind('click.' + ns);
      }
      
      // REMOVE TYPE: ACCORDION
      if ( data.settings['type'] === 'accordion' ) {
        $this.find('ul').css( clearValues(data.ulStyle) );
        $this.find('li').css( clearValues(data.liStyle) ).has('ul').removeClass('hasSub collapsed expanded').find('>a,>span').unbind('click.' + ns);
      }
      
      // REMOVE TYPE: SLIDER
      if ( data.settings['type'] === 'slider' ) {
        $this.find('ul').css( clearValues(data.ulStyle) ).css({ 'position' : '', 'left' : ''});
        $this.find('li').css( clearValues(data.liStyle) ).css({'display' : ''}).has('ul').removeClass('hasSub collapsed expanded').find('>a,>span').unbind('click.' + ns).css('display', '');
      }
      
      // REMOVE NECESSARY SETTINGS
      $this.find('li a').css( clearValues(data.liAStyle) );
      
      return false;
    },
    
    /*
    * Destroys the wipnav plugin.
    *
    */
    destroy : function( ) {

      return this.each(function( ){   
        var $this = $(this),
        data = $this.data(ns);
        
        $(window).unbind('.' + ns);
        data.wipnav.remove();
        $this.removeData(ns);
      });
    }
  };
  
  /*
  * Main Function
  *
  * @param method The method to call. If no param is passed the init method gets called.
  *
  */
  $.fn.wipnav = function( method ) {
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist in jQuery.wipnav' );
    }   
  };
  
  function clearValues( obj ) {
    var tmpObj = new Object();
    
    $.each( obj, function( key, val ) {
      tmpObj[ key ] = '';
    });
    
    return tmpObj;
  }
})( jQuery );

