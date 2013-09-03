wipnav
======

Wipnav - jQuery Plugin
Responsive Navigation

Copyright (c) 2013 Florian Fassing

@author Florian Fassing
@version 0.0.30 (07.08.13)

Requires: jQuery v1.4.3+

Licensed under Creative Commons Attribution-NonCommercial 3.0:
http://creativecommons.org/licenses/by-nc/3.0/legalcode




1. Example
----------


	<div id="navigation_wrap">
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



2. Options
----------
