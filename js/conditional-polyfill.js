(function() {
	var supportsES6 = function() {
		try {
			new Function('(a = 0) => a');
			return true;
		}
		catch (err) {
			return false;
		}
	}();

	if (!supportsES6) {
		var script = document.createElement('script');
		script.src = 'dist/vendor/@babel/polyfill/dist/polyfill.min.js';
		document.head.appendChild(script);
	}
})();
