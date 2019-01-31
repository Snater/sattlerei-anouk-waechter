let intervals = {};

const nextImage = ($active) => {
	$active.removeClass('active');
	let $next = $active.next();
	if (!$next.length) {
		$next = $active.parent().children().first();
	}
	$next.addClass('active').find('a').trigger('click');
};

const startSlideShow = ($images) => {
	$images.each(function() {
		intervals[this] = setInterval(() => {
			nextImage($(this).find('.product-image-thumbnail.active'));
		}, 5000);
		$(this).find('.product-image-thumbnail a').one('mouseenter', () => {
			clearInterval(intervals[this]);
		});
	});
};

const attachImageToggle = ($thumbnails) => {
	$thumbnails.on('click', (e) => {
		if ($('.navbar-toggler').is(':visible')) {
			return false;
		}

		const $target = $(e.target).closest('a');
		const $images = $target.closest('.product-images');
		const $image = $images.find('.product-image');
		const $img = $image.children();

		$img.stop(true, true).fadeOut('fast').promise().done(() => {
			$img.attr('src', $target.attr('href')).fadeIn('fast');
			$images.find('.product-image-thumbnail').removeClass('active');
			$target.parent().addClass('active');
		});

		return false;
	});
};

const attachMoreToggle = ($link) => {
	$link.on('click', (e) => {
		const $more = $(e.target).parent();
		const $images = $more.closest('.product-images');
		$images.find('.product-images-thumbnails').hide().removeClass('d-none').slideDown({
			easing: 'easeInExpo'
		});
		$more.slideUp();

		return false;
	});
};

export {startSlideShow, attachImageToggle, attachMoreToggle};
