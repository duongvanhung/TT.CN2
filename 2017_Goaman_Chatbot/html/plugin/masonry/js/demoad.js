(function() {
	var bsa = document.createElement('script');
	bsa.type = 'text/javascript';
	bsa.async = true;
	bsa.id = '_carbonads_js';
	bsa.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=codrops';
	demoad.appendChild(bsa);

	var adChecked = false;
	var attempts = 5;
	var cntAttempts = 0;
	var adInterval;

	function checkAd() {
		if (adChecked || cntAttempts >= attempts) {
			clearInterval(adInterval);
			return;
		}

		cntAttempts++;

		var carbonImg = document.querySelector('.carbon-img');

		if (!carbonImg) return;

		var adImgHeight = carbonImg.offsetHeight;

		if (adImgHeight >= 30) {
			_gaq.push(['_trackEvent', 'Codrops Demo Ad', 'Carbon Ad VISIBLE','Carbon Ad']);
			
			adChecked = true;
		} 
	}

	if(window._gaq) {
		_gaq.push(['_trackEvent', 'Codrops Demo Ad', 'Carbon ad included', '1']);

		adInterval = setInterval(checkAd, 3000);
	}
})();