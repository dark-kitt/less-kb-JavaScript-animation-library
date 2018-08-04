# Less kb JavaScript animation library

This lightweight library is very useful, when jQuery or any other JavaScript library is not available or you don't wanna use them.

### The library includes:

	gid(id); -> document.getElementById(id);
	gcl(class); -> document.getElementsByClassName(class);
	gtn(tag); -> document.getElementsByTagName(tag);

Just shorthand.

	animationInterval(func, interval);
	animationTimeout(func, delay);

	clearAnimationInterval(clear);
	clearAnimationTimeout(clear);

Created with requestAnimationFrame. If requestAnimationFrame is not supported, the function returns an expended setInterval / setTimeout.

	isMobile(); // returns true

Mobile browser detection.

	addClass(elem, {
		class: class,
		remove: delay
	});
	hasClass(elem, class);
	removeClass(elem, class);

Must have when jQuery is not available.

	fade();
	alongPath();
	colorSwap();
	distortPath();
	drawPath();
	textTyping();

Usage of all functions is explained in `js/animation-library/_examples`. Open the html file in your editor to see what is required.
