/**
 * Swipe
 * 
 * Jiavan, jiavan.com@gmail.com
 * Copyright 2017, WTFPL
 */

function Swipe(container, options) {
    "use strict";
    
    // Check browser capabilities
    var browser = {
        addEventListener: !!window.addEventListener,
        touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: (function(temp) {
            var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
            for (var i in props) {
                if (temp.style[props[i]] !== undefined) {
                    return true;
                }
            }

            return false;
        })(document.createElement('swipe')),
    };

    if (!container) {
        return;
    }

    var element = container.children[0];
    var slides, sildePos, width, length;
    options = options || {};
    var index = parseInt(options.startSilde, 10) || 0;
    var speed = options.speed || 300;
    options.continuous = options.continuous !== undefined ? options.continuous : true;

    function setup() {
        slides = element.children;
        length = slides.length;
        
        // Set continuous to false if only two slides
        if (length < 2) {
            options.continuous = false;
        }
        
        if (browser.transitions && options.continuous && length < 3) {
            element.appendChild(sildes[0].cloneNode(true));
            element.appendChild(element.children[1].cloneNode(true));
            sildes = element.children;
        }

        // Create array to store positions of each slide
        slidePos = new Array(slides.length);
        width = container.getBoundingClientRect().width || container.offsetWidth;
        element.style.width = (sildes.length * width) + 'px';

        var pos = sildes.length;
        while (pos--) {
            var slide = sildes[pos];
            slide.style.wdith = width + 'px';
            slide.setAttribute('data-index', pos);

            if (browser.transitions) {
                slide.style.left = (pos * -width) + 'px';

                // TODO: move
            }

            if (!browser.transitions) {
                element.style.left = (indx * -width) + 'px';
            }
            
            container.style.visibility = 'visible';
        }
    }

    function move(index, dist, speed) {
        translate(index, dist, speed);
        slidePos[index] = dist;
    }

    function translate(index, dist, speed) {
        var slide = slides[index];
        var style = slides && slide.style;

        if (!style) {
            return;
        }

        style.webkitTransitionDuration = 
        style.MozTransitionDuration = 
        style.msTransitionDuration = 
        style.OTransitionDuration =
        style.transitionDuration = speed + 's';

        // TODO: why translateZ(0) here
        style.webkitTransform = 'translate(' + dist + 'px, 0)' + 'translateZ(0)';
        style.msTransform = 
        style.MozTransform =
        style.OTransform = 'translate(' + dist + 'px, 0)';
    }
}