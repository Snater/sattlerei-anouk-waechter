import $ from 'jquery';
import 'jquery.easing';

/**
 * @return {int}
 */
const getNavbarHeight = () => {
	const $mainNav = $('#mainNav');
	const $navbarExt = $mainNav.find('.navbar-collapse.show');
	return $mainNav.outerHeight() - ($navbarExt.outerHeight() || 0);
};

/**
 * @param {jQuery} $target
 */
const scrollTo = $target =>
	$('html, body').animate({
		scrollTop: ($target.offset().top - getNavbarHeight() + 1)
	}, 1000, 'easeInOutExpo');

/**
 * @param {jQuery} $elements
 */
const attachSmoothScroll = $elements => {
	$elements.click(function() {
		if (
			location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
			&& location.hostname == this.hostname
		) {
			let $target = $(this.hash);
			$target = $target.length ? $target : $('[name=' + this.hash.slice(1) + ']');

			if (!$target.length) {
				return;
			}

			scrollTo($target);

			return false;
		}
	});
};

/**
 * @param {jQuery} $flipContainers
 * @param {int} i
 */
const initialFlip = ($flipContainers, i) => {
	$flipContainers.eq(i).removeClass('initial');
	if ($flipContainers.length > i) {
		setTimeout(() => initialFlip($flipContainers, i + 1), 80);
	}
};

/**
 * @param {jQuery} $flipContainers
 */
const initialProductsFlip = $flipContainers => {
	if (!$flipContainers.length) {
		return;
	}

	let waypoint = new Waypoint.Inview({
		element: $flipContainers.find('.rounded-circle').get(0),
		entered: () => {
			waypoint.destroy();
			initialFlip($flipContainers, 0);
		},
	});
};

const initAutoScrolling = () => {
	$('#imprint-container').find('.collapse').on('shown.bs.collapse', e => {
		scrollTo($(e.target).parents('#imprint-container'));
	});

	if ($('.alert-danger').length) {
		scrollTo($('#contact'));
	}

	$('.collapse').on('shown.bs.collapse', e => {
		scrollTo($(e.target));
	});
};

const closeReponsiveMenuOnClick = () => {
	$('.navbar-collapse > ul > li > a').click(() => {
		$('.navbar-collapse').collapse('hide');
	});
};

export {
	attachSmoothScroll,
	initialProductsFlip,
	initAutoScrolling,
	closeReponsiveMenuOnClick
};
