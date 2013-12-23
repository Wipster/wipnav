wipnav
======

Wipnav - jQuery Plugin
Responsive Navigation

Copyright (c) 2013 Florian Fassing

@author Florian Fassing

@version 0.2.7 (23-DEC-13)

Requires: jQuery v1.7+

Licensed under Creative Commons Attribution-NonCommercial 3.0:
http://creativecommons.org/licenses/by-nc/3.0/legalcode





Wipnav is a navigation solution for websites in form of a jQuery plugin. It's fully responsive and gives
a lot of space for customization. It's small and fast! 

Look at the usage examples in the package.

1. Functionality
------------------------------

    The wipnav plugin uses nested HTML lists as navigation trees.

    My-Website
    ├── 
    │   ├── My-First-Point
    │   │   ├── Interesting content
    │   │   └── Even more interesting
    │   ├── My-Second-Point
    │   │   ├── Following Page
    │   │   └── Imprint


    Hint:
    You should try to prevent content on the sites "My-First-Point" and "My-Second-Point".
    It's no problem when viewed on a bigger screen, (hover for submenu -> click for content)
    but when viewed on a smartphone you have no hover action. A click shows the submenu. A
    second click could show the content, but I think thats only confusing and not a common or
    widely spread behaviour.

2. Options (with default values)
------------------------------

    'type'          : 'accordion'        // Determines the animation type of the mobile navigation. 'accordion' and 'slider' are available.
    'threshold'     : 980                // Wipnav gets activated when page-width is equal or under threshold.
    'navButton'     : null               // The selector for an optional button to hide and display the whole navigation.
    'animIn'        : {height: 'show'}   // Animation when navigation is toggled. (See parameter for jQuery animate method.)
    'animOut'       : {height: 'hide'}   // Animation when navigation is toggled. (See parameter for jQuery animate method.)
    'mobNavAnim'    : {height: 'toggle'} // Animation when navigation is toggled via the trigger specified in navButton. (See parameter for jQuery animate method.)
    'speed'         : 250                // Animation speed for hover and click effects.
    'colClass'      : 'collapsed'        // Class used for toggling.
    'expClass'      : 'expanded'         // Class used for toggling.
    'hoverClass'    : 'wip-hover'        // Class used for hover effects.


3. Roadmap
------------------------------

	1. Provide easy to understand and different usage examples.
    2. Split the css for the examples into necessary styles and fancy stuff.


