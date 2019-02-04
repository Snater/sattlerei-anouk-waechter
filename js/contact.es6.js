import $ from 'jquery';

const attachFormSubmitHandler = ($form) => {
	$form.on('submit', () => {
		const $fieldset = $form.find('fieldset');
		const $spinner = $form.find('.spinner');
		const $message = $form.find('.status-message');
		const $submit = $form.find('button[type="submit"]');
		const deferred = $.Deferred();

		if (!$message.is(':visible')) {
			deferred.resolve();
		} else {
			$message.stop().slideUp().promise().done(() => {
				deferred.resolve();
			});
		}

		$fieldset.prop('readonly', true);
		$spinner.addClass('active');
		$submit.prop('disabled', true);

		deferred.promise().done(() => {
			$message.removeClass('alert-danger alert-success');

			$.ajax({
				url: $form.attr('action'),
				data: $form.serialize(),
				type: 'POST',
				dataType: 'json'
			}).done((response) => {
				let messages = [];

				$spinner.removeClass('active');
				$fieldset.removeProp('readonly');
				$submit.prop('disabled', false);

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
