(function($) {
	'use strict';

	var $window = $(window);
	var $mainNav = $('#mainNav');

	function getNavbarHeight() {
		var $navbarExt = $mainNav.find('.navbar-collapse.show');
		return $mainNav.outerHeight() - ($navbarExt.outerHeight() || 0);
	}

	function scrollTo($target) {
		$('html, body').animate({
			scrollTop: ($target.offset().top - getNavbarHeight() + 1)
		}, 1000, 'easeInOutExpo');
	}

	// Attach smooth scrolling handler to anchor links:
	$('a[href*="#"]:not([href="#"]):not([data-toggle="collapse"])').click(function() {
		if (
			location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
			&& location.hostname == this.hostname
		) {
			var $target = $(this.hash);
			$target = $target.length ? $target : $('[name=' + this.hash.slice(1) + ']');

			if (!$target.length) {
				return;
			}

			scrollTo($target);

			return false;
		}
	});

	$('#imprint-container').find('.collapse').on('shown.bs.collapse', function(e) {
		scrollTo($(e.target).parents('#imprint-container'));
	});

	// $('body').scrollspy({
	// 	target: '#mainNav',
	// 	offset: getNavbarHeight()
	// });

	// Close responsive menu when a link is clicked:
	$('.navbar-collapse>ul>li>a').click(function() {
		$('.navbar-collapse').collapse('hide');
	});

	if ($('.alert-danger').length) {
		scrollTo($('#contact'));
	}

	$(function() {

		// $window.on('resize', function() {
		// 	if (!$('.navbar-toggler').is(':visible')) {
		// 		$('#mainNav').removeClass('navbar-shrink');
		// 	} else {
		//
		// 	}
		// });

		if ($('#mainNav').hasClass('navbar-index')) {

		var waypoint = new Waypoint.Inview({
			element: $('.nav-scroller').get(0),
			enter: function(direction) {
				if (direction === 'up') {
					if ($('.navbar-toggler').is(':visible')) {
						$('#mainNav').removeClass('navbar-shrink');
					} else {
						$('#mainNav').stop(true, true).slideUp('fast').promise().done(function() {
							$('#mainNav').removeClass('navbar-shrink').fadeIn({
								duration: 'fast',
								easing: 'easeOutExpo'
							});
						});
					}
				}
			},
			exit: function(direction) {
				if (direction === 'down') {
					if ($('.navbar-toggler').is(':visible')) {
						$('#mainNav').addClass('navbar-shrink');
					} else {
						$('#mainNav').stop(true, true).slideUp('fast').promise().done(function() {
							$('#mainNav').addClass('navbar-shrink').slideDown({
								duration: 'fast',
								easing: 'easeOutExpo'
							});
						});
					}
				}
			}
		});

		}

		var intervals = {};

		$('.product-images').each(function() {
			var self = this;
			intervals[this] = setInterval(function() {
				nextImage($(self).find('.product-image-thumbnail.active'));
			}, 5000);
			$(this).find('.product-image-thumbnail a').one('mouseenter', function() {
				clearInterval(intervals[self]);
			});
		});

		function nextImage($active) {
			$active.removeClass('active');
			var $next = $active.next();
			if (!$next.length) {
				$next = $active.parent().children().first();
			}
			$next.addClass('active').find('a').trigger('click');
		}

		$('.product-image-thumbnail').on('click', function(e) {
			if ($('.navbar-toggler').is(':visible')) {
				return false;
			}

			var $target = $(e.target).closest('a');
			var $images = $target.closest('.product-images');
			var $image = $images.find('.product-image');
			var $img = $image.children();

			$img.stop(true, true).fadeOut('fast').promise().done(function() {
				$img.attr('src', $target.attr('href')).fadeIn('fast');
				$images.find('.product-image-thumbnail').removeClass('active');
				$target.parent().addClass('active');
			});


			return false;
		});

		$('.product-images-more a').on('click', function(e) {
			var $more = $(e.target).parent();
			var $images = $more.closest('.product-images');
			$images.find('.product-images-thumbnails').hide().removeClass('d-none').slideDown({
				easing: 'easeInExpo'
			});
			$more.slideUp();

			return false;
		});

		$('.collapse').on('shown.bs.collapse', function(e) {
			scrollTo($(e.target));
		});

	});

})(jQuery);
