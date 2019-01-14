(function($) {
	'use strict';

	$('#contact').find('form').on('submit', function(e) {
		var $form = $(this);
		var $fieldset = $form.find('fieldset');
		var $loading = $form.find('.loading');
		var $message = $form.find('.status-message');
		var deferred = $.Deferred();

		if (!$message.is(':visible')) {
			deferred.resolve();
		} else {
			$message.stop().slideUp().promise().done(function() {
				deferred.resolve();
			});
		}

		$fieldset.prop('readonly', true);
		$loading.fadeIn();

		deferred.promise().done(function() {
			$message.removeClass('alert-danger alert-success');

			$.ajax({
				url: $form.attr('action'),
				data: $form.serialize(),
				type: 'POST',
				dataType: 'json'
			}).done(function(response) {
				var messages = [];

				$loading.fadeOut();
				$fieldset.removeProp('readonly');

				if (response.errors.length) {
					$.each(response.errors, function() {
						messages.push(this);
					});
					$message.addClass('alert-danger');
				} else if(response.success) {
					$message.addClass('alert-success');
					messages.push(response.success);
					$form.get(0).reset();
				}

				$message.html(messages.join('<br>')).slideDown();
			});
		});

		return false;
	});

})(jQuery);
