/* eslint-disable no-loop-func */
function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true,
		});
	} else {
		obj[key] = value;
	}
	return obj;
}
function _objectSpread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		var ownKeys = Object.keys(source);
		if (typeof Object.getOwnPropertySymbols === 'function') {
			ownKeys = ownKeys.concat(
				Object.getOwnPropertySymbols(source).filter(function (sym) {
					return Object.getOwnPropertyDescriptor(source, sym).enumerable;
				}),
			);
		}
		ownKeys.forEach(function (key) {
			_defineProperty(target, key, source[key]);
		});
	}
	return target;
}
(function () {
	var _ua = navigator.userAgent.toLowerCase();
	var polyfill = document.createElement('script');
	polyfill.src = './vitals/polyfill.js';
	polyfill.defer = true;
	var $head = document.getElementsByTagName('head')[0];
	$head.prepend(polyfill);
	var vitalScript = document.createElement('script');
	vitalScript.src = './vitals/web-vitals.umd.js';
	vitalScript.defer = true;
	$head.prepend(vitalScript);

	if (_ua.indexOf('chrome') > -1) {
		var postStatic = function postStatic(staticObject) {
			
			var url = 'http://localhost:9000/statics';
			var parsingFunc = function (item, key) {
				var whiteList = ['id', 'tagName', 'className', 'outerHTML'];
				var stringObj = JSON.stringify(item[key], whiteList);
				var obj = _objectSpread({}, item, { target: JSON.parse(stringObj) });
				return obj;
			};
			var handler = {
				get: function (target, key) {
					if (Array.isArray(target[key])) {
						return target[key].map(function (item) {
							if ('target' in item) {
								return parsingFunc(item, 'target');
							} else if ('element' in item) {
								return parsingFunc(item, 'element');
							} else {
								return item;
							}
						});
					} else {
						return target[key];
					}
				},
			};
			var proxy = new Proxy(staticObject, handler);
			var obj = {
				...deepCopy(proxy),
				location: window.location
			};

			fetch(url, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(obj),
			});
		};
		var _version = parseInt(
			_ua.split('chrome/')[1].toString().split(' ')[0].toString().split('.')[0],
		);
		function deepCopy(target) {
			if (target && typeof target === 'object') {
				Object.keys(target).forEach(function (key) {
					if (typeof target[key] === 'object') {
						return deepCopy(target[key]);
					}
				});
			}
			return target;
		}

		var cb = postStatic;
		// var cb = console.log

		if (_version > 83) {
			vitalScript.onload = function () {
				window.webVitals.getCLS(cb);
				window.webVitals.getFID(cb);
				window.webVitals.getFCP(cb);
				window.webVitals.getLCP(cb);
				window.webVitals.getTTFB(cb);
			};
		}
	}
})();
