    /**
     * Wipnav - jQuery Plugin
     * Responsive Navigation
     *
     * Copyright (c) 2013 Florian Fassing
     * 
     * @author Florian Fassing
     * @version 0.2.2 (19-SEP-13)
     * 
     * Requires: jQuery v1.4.3+
     *
     * Licensed under Creative Commons Attribution-NonCommercial 3.0:
     *   http://creativecommons.org/licenses/by-nc/3.0/legalcode
     */

    var ns = 'wipnav'; // Namespace

    (function($) {

        var methods = {
            /*
             * The initialization method.
             *
             * @param options Configuration of the wipnav plugin.
             *
             */
            init: function(options) {

                // SETTINGS
                var settings = $.extend({
                    'type': 'accordion', // Determines the type of the mobile navigation.
                    'threshold': 980, // Wipnav gets activated when page-width is equal or under threshold.
                    'navButton': null, // The selector for an optional button to hide and display the whole navigation.
                    'navAnim': {height: 'toggle'}, // Animation when navigation is toggled via the trigger specified in navButton.
                    'colClass': 'collapsed', // Class used for toggling.
                    'expClass': 'expanded',  // Class used for toggling.
                    'hoverClass': 'wip-hover' // Class used for hover effects.
                }, options);

                return this.each(function() {

                    var $this = $(this),
                        data = $this.data(ns);

                    // If the plugin hasn't been initialized yet
                    if (settings['sufi'] && settings['sufiSettings'] == null) {
                        console.warn('Wipnav: Superfish settings are required in order to restart the Superfish Navigation on window resize. ' + settings['sufiSettings'] + ' is given!');
                    } else if (!data) {

                        // DATA INIT
                        $this.data(ns, {
                            mobNavAct: false,
                            navAct: false,
                            navWidth: 0,
                            settings: settings
                        });
                        data = $this.data(ns);

                        /*
                         *  Handles visibility of the nav button.
                         *  Enables and disables superfish if necessary.
                         *  Initializes and kills mobile navigation if necessary.
                         *
                         */
                        $(window).bind('resize.' + ns, function(event) {
                            if ($(window).width() <= settings['threshold']) {

                                data['navWidth'] = $(this).outerWidth(true);

                                if (data.navAct === true) {

                                    data.navAct = methods.killNav.apply($this);
                                }

                                if (data.mobNavAct === false) {

                                    $(settings['navButton']).show();
                                    data.mobNavAct = methods.initMobNav.call($this);
                                }
                            } else {

                                if (data.navAct === false) {

                                   data.navAct = methods.initNav.call($this);
                                }

                                if (data.mobNavAct === true) {

                                    $(settings['navButton']).hide();
                                    data.mobNavAct = methods.killMobNav.call($this);
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
             */
            initNav: function( ) {
                var $this = $(this),
                    data = $this.data(ns),
                    hoverClass = data.settings['hoverClass'];

                $this.find('li').bind('mouseenter.' + ns, function( ) {
                    $(this).addClass(hoverClass);
                }).bind('mouseleave.' + ns, function( ) {
                    $(this).removeClass(hoverClass);
                });

                /*$this.find('li > ul').bind('mouseenter.' + ns, function( ) {
                    $(this).addClass(hoverClass);
                }).bind('mouseleave.' + ns, function( ) {
                    $(this).removeClass(hoverClass);
                });*/

                return true;
            },
            /*
             * Disables the superfish Menu
             *
             */
            killNav: function( ) {
                var $this = $(this),
                    data = $this.data(ns),
                    hoverClass = data.settings['hoverClass'];

                $this.find('li').unbind('mouseenter.' + ns).unbind('mouseleave.' + ns).removeClass(hoverClass);
                /*$this.find('li > ul').unbind('mouseenter.' + ns).unbind('mouseleave.' + ns).removeClass(hoverClass);*/

                return false;
            },
            /*
             * Enables the mobile navigation.
             *
             */
            initMobNav: function( ) {
                // $this The DOM object on which the wipnav got intialized.
                var $this = $(this),
                    data = $this.data(ns),
                    colClass = data.settings['colClass'],
                    expClass = data.settings['expClass'],
                    toggleClass = colClass + ' ' + expClass;

                // navButton logic
                if ( !($(data.settings['navButton']) == null) ) {

                    // Hide menu initially.
                    $this.hide();

                    /* Navbutton logic.
                    *  The expanded class gets applied immediately when the navbutton was hit.
                    *  Collapsed class gets applied after navigation completely has collapsed. 
                    */
                    var navButton = $(data.settings['navButton']);
                    var toggleControl = false;
                    navButton.removeClass(expClass).addClass(colClass);
                    navButton.bind('click.' + ns, function() {
                        if (navButton.hasClass(colClass)) {
                            navButton.toggleClass(toggleClass);
                        }
                        $this.animate(data.settings['navAnim'], function() {
                            if (navButton.hasClass(expClass) && toggleControl) {
                                navButton.toggleClass(toggleClass);
                            }
                            toggleControl = !toggleControl;
                        });
                    });
                }

                // Find submenu containing li elements and mark them with a class. Find the first a or span element and bind a click event to them.
                $this.find('li').has('ul').addClass('hasSub ' + colClass).find('a:first-child:first, span:first-child:first').bind('click.' + ns, function(event) {

                    // Disables anchor functionality.
                    event.preventDefault();
                    var clicked = $(this);

                    // TYPE: ACCORDION
                    if ( data.settings['type'] === 'accordion' ) {
                        // Close all currently open menu entries.
                        $this.find('li.' + expClass).not($(this).parents('li.hasSub')).toggleClass(toggleClass).find('ul:first').slideUp();
                        // Toggle class of the submenu containing li element.
                        clicked.parents('li.hasSub').toggleClass(toggleClass);
                        // Open the submenu.
                        clicked.siblings('ul').slideToggle();
                    }
                    // TYPE: SLIDER
                    else {
                        // Navigate forth ->
                        if ( clicked.parents('li.hasSub').hasClass(colClass) ) {

                            clicked.parents('li.hasSub:first').toggleClass(toggleClass);

                            // Part of the menu that is going to slide.
                            menuPart = clicked.parents('ul:first').add($('.' + expClass).parents('ul:first'));

                            // Move menu to the right, out of the viewport.
                            menuPart.css('left', 'auto').animate({'right':data['navWidth'] * -1}, function() {
                                // Hide the last opened menu entry.
                                clicked.parents('.' + expClass).eq(1).find('> span:first, > a:first').hide();
                                // Hide all menu entries which have not been clicked.
                                clicked.parents('li.hasSub:first').siblings('li').hide();
                                // Put the menu to the left and it slide into the viewport.
                                menuPart.css({'right':'auto', 'left':data['navWidth'] * -1}).add(clicked.siblings('ul').show()).animate({'left':0});
                             });

                            // Navigate back <-
                        } else {
                            
                            // Let the menu slide out of the viewport.
                            menuPart.css('right', 'auto').animate({'left':data['navWidth'] * -1}, function() {
                                // Let the last opened menu entry reappear.
                                clicked.parents('.' + expClass).eq(1).find('> span:first, > a:first').show();
                                // Hide the submenu after it was shifted out of the viewport.
                                clicked.siblings('ul').hide();
                                // Let the menu entries which have not been clicked reappear.
                                clicked.parents('li.hasSub:first').siblings('li').show();
                                // Put the menu to the right and let it slide into the viewport.
                                menuPart.css({'right':data['navWidth'] * -1, 'left':'auto'}).animate({'right':0});
                                // Toggle class in callback so the last opened menu entry can be hidden.
                                clicked.parents('li.hasSub:first').toggleClass(toggleClass);
                            });
                        }
                    }
                });

                return true;
            },
            /*
             * Disables the mobile navigation.
             *
             */
            killMobNav: function( ) {
                var $this = $(this),
                    data = $this.data(ns),
                    colClass = data.settings['colClass'],
                    expClass = data.settings['expClass'];

                // REMOVE navButton logic
                if (!($(data.settings['navButton']) == null)) {
                    $this.show();
                    $(data.settings['navButton']).unbind('click.' + ns);
                }

                // REMOVE TYPE: ACCORDION
                if (data.settings['type'] === 'accordion') {
                    $this.find('li').removeClass('hasSub ' + colClass + ' ' + expClass).find('a:first-child:first, span:first-child:first').unbind('.' + ns);
                }

                // REMOVE TYPE: SLIDER
                if (data.settings['type'] === 'slider') {
                    $this.find('li').has('ul').removeClass('hasSub '  + colClass + ' ' + expClass).find('a:first-child:first, span:first-child:first').unbind('.' + ns);
                }

                return false;
            },
            /*
             * Destroys the wipnav plugin.
             *
             */
            destroy: function( ) {

                return this.each(function( ) {
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
        $.fn.wipnav = function(method) {
            // Method calling logic
            if (methods[method]) {
                return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist in jQuery.wipnav');
            }
        };

    })(jQuery);

