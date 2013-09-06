wipnav
======

Wipnav - jQuery Plugin
Responsive Navigation

Copyright (c) 2013 Florian Fassing

@author Florian Fassing

@version 0.1.0 (06.09.13)

Requires: jQuery v1.4.3+

Licensed under Creative Commons Attribution-NonCommercial 3.0:
http://creativecommons.org/licenses/by-nc/3.0/legalcode




1. Example
----------


	<div id="nav-wrap">
		<ul>
			<li>
				<a href="https://github.com/Wipster/wipnav">Some link</a>
			</li>
			<li>
				<span>More links</span>
				<ul class="sub">
					<li>
						<a href="https://github.com/Wipster/wipnav">Some link</a>
					</li>
					<li>
						<a href="https://github.com/Wipster/wipnav">Some other link</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="https://github.com/Wipster/wipnav">Some other link</a>
			</li>
		</ul>
	</div>




	(function( $ ) {

	// Superfish example configuration
	superfishOptions = {
		animation: {height: 'show'},
		speed: 200,
		autoArrows: false,
		delay: 400,
		dropShadows: false  
	}

	// SUPERFISH & WIPNAV
	$(".sf-menu").superfish(sufiOpt).wipnav({
		sufi : true,
		sufiSettings : sufiOpt,
		navButton : '#navButton',
		type : 'slider',
		threshold : 1023
	});

	})( jQuery );



2. Options with default values
------------------------------

    'sufi'          : false,             // Use wipnav in conjunction with superfish?
    'sufiSettings'  : null,              // If used with superfish the settings are needed for restarting the superfish navigation at certain pagewidth.
    'type'          : 'accordion',       // Determines the type of the mobile navigation. 'accordion' and 'slider' are available.
    'threshold'     : 980,               // Wipnav gets activated when page-width is equal or under threshold.
    'navButton'     : null,              // The selector for an optional button to hide and display the whole navigation.
    'navAnim'       : {height: 'toggle'} // Animation when navigation is toggled via the trigger specified in navButton.


3. Roadmap
----------

	- Remove superfish usage and provide simple standalone desktop navigation with css fallback.


