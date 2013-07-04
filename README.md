wipnav
======

Responsive Navigation - jQuery Plugin (Can be used in conjunction with superfish navigation)



1. Example
==========

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


<script>

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

</script>


2. Options
==========