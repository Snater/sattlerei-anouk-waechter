const shrinkableNavbar = () => {
	new Waypoint.Inview({
		element: $('.nav-scroller').get(0),
		enter: (direction) => {
			if (direction === 'up') {
				if ($('.navbar-toggler').is(':visible')) {
					$('#mainNav').removeClass('navbar-shrink');
				} else {
					$('#mainNav').stop(true, true).slideUp('fast').promise().done(() => {
						$('#mainNav').removeClass('navbar-shrink').fadeIn({
							duration: 'fast',
							easing: 'easeOutExpo'
						});
					});
				}
			}
		},
		exit: (direction) => {
			if (direction === 'down') {
				if ($('.navbar-toggler').is(':visible')) {
					$('#mainNav').addClass('navbar-shrink');
				} else {
					$('#mainNav').stop(true, true).slideUp('fast').promise().done(() => {
						$('#mainNav').addClass('navbar-shrink').slideDown({
							duration: 'fast',
							easing: 'easeOutExpo'
						});
					});
				}
			}
		}
	});
};

export {shrinkableNavbar};
