import $ from 'jquery';

const attachFormSubmitHandler = ($form) => {
	$form.on('submit', () => {
		const $fieldset = $form.find('fieldset');
		const $loading = $form.find('.loading');
		const $message = $form.find('.status-message');
		const deferred = $.Deferred();

		if (!$message.is(':visible')) {
			deferred.resolve();
		} else {
			$message.stop().slideUp().promise().done(() => {
				deferred.resolve();
			});
		}

		$fieldset.prop('readonly', true);
		$loading.fadeIn();

		deferred.promise().done(() => {
			$message.removeClass('alert-danger alert-success');

			$.ajax({
				url: $form.attr('action'),
				data: $form.serialize(),
				type: 'POST',
				dataType: 'json'
			}).done((response) => {
				let messages = [];

				$loading.fadeOut();
				$fieldset.removeProp('readonly');

				if (response.errors.length) {
					messages = response.errors;
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
};

export {attachFormSubmitHandler};
