document.visibilityState = (function() {
	return document.visibilityState ||  document.mozVisibilityState || document.webkitVisibilityState;
})();
(function() {
	var checkVisibility = true;

	var setAnimationPlayState = function(value) {
		var allCSSAni = document.body.getElementsByTagName('*'),
			length = allCSSAni.length;
		while (length--) {
			if (window.getComputedStyle(allCSSAni[length], null).getPropertyValue('animation-name') !== 'none') {
				allCSSAni[length].style.animationPlayState = value;
			}
		}
		if (length <= 0) {
			return true;
		}
	};

	function visibility(visibility) {
		if (visibility === 'visible') {
			document.title = 'visible';

			setAnimationPlayState('running');
		} else {
			document.title = 'hidden';

			setAnimationPlayState('paused');
		}
	}

	var evt,
		vendorprefixes = {
			mozHidden: 'mozvisibilitychange',
			webkitHidden: 'webkitvisibilitychange',
			hidden: 'visibilitychange'
	};
	function buildVisibilitychange(evt) {
		document.addEventListener(vendorprefixes[evt], function() {
			if (document.visibilityState === 'visible') {
				visibility('visible');
				checkVisibility = true;
			} else {
				visibility('hidden');
				checkVisibility = false;
			}
		});
	}

	if (document.visibilityState) {
		// Standards:
		for (evt in vendorprefixes) {
			if (evt in document) {
				buildVisibilitychange(evt);
				break;
			}
		}
	} else if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
		// for IOS:
		document.onpageshow = function() {
			if (!checkVisibility) {
				visibility('visible');
				checkVisibility = true;
			}
		};
		document.onpagehide = function() {
			visibility('hidden');
			checkVisibility = false;
		};
	} else if (document.documentMode !== undefined) {
		// IE 9 and lower:
			document.onfocusin = function() {
				if (!checkVisibility) {
					visibility('visible');
					checkVisibility = true;
				}
			};
			document.onfocusout = function() {
				visibility('hidden');
				checkVisibility = false;
			};
	} else {
		//  All others
		document.onfocus = function() {
			if (!checkVisibility) {
				visibility('visible');
				checkVisibility = true;
			}
		};
		document.onblur = function() {
			visibility('hidden');
			checkVisibility = false;
		};
	}
})();
