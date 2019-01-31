import '../node_modules/popper.js/dist/umd/popper.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import * as contact from './contact.es6.js';
import * as images from './images.es6.js';
import * as navbar from './navbar.es6.js';
import * as scroll from './scroll.es6.js';
import '../scss/styles.scss';

$(() => {
	contact.attachFormSubmitHandler($('#contact').find('form'));

	images.startSlideShow($('.product-images'));
	images.attachImageToggle($('.product-image-thumbnail'));
	images.attachMoreToggle($('.product-images-more a'));

	if ($('#mainNav').hasClass('navbar-index')) {
		navbar.shrinkableNavbar();
	}

	scroll.attachSmoothScroll($('a[href*="#"]:not([href="#"]):not([data-toggle="collapse"])'));
	scroll.initialProductsFlip($('.flip-container'));
});
