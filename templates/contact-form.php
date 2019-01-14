<form class="contact" method="post" action="<?php echo $REMOTE_DIR; ?>/controllers/contact.php">
	<fieldset>
		<input type="hidden" name="form" value="contact">
		<div class="row form-group">
			<div class="col-sm-3">
				<label for="name" class="required">Name</label>
			</div>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="name" name="name" required="required">
			</div>
		</div>
		<div class="row form-group">
			<div class="col-sm-3">
				<label for="phone">Telefon</label>
			</div>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="phone" name="phone">
			</div>
		</div>
		<div class="row form-group">
			<div class="col-sm-3">
				<label for="email" class="required">E-Mail</label>
			</div>
			<div class="col-sm-9">
				<input type="email" class="form-control" id="email" name="email" required="required">
			</div>
		</div>
		<div class="row form-group">
			<div class="col-12">
				<label for="text" class="required">Ihre Nachricht</label>
			</div>
			<div class="col-12">
				<textarea id="text" name="text" rows="6" required="required" class="form-control"></textarea>
			</div>
		</div>
		<div class="row form-group form-men">
			<div class="col-12">
				<label for="men" class="required">Ich bin kein Mensch</label>
			</div>
			<div class="col-12">
				<input type="checkbox" name="men" id="men">
			</div>
		</div>

		<div class="form-group status-message p-2 pl-3 pr-3"></div>

		<div class="form-group text-center">
			<span class="loading mr-3"><i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i></span><button type="submit" class="btn btn-primary">Absenden</button><i class="fa fa-circle-o-notch invisible ml-3" aria-hidden="true"></i>
		</div>

	</fieldset>
</form>
