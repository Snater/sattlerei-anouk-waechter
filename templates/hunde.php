<div class="products">

	<h1>Produkte für Hunde</h1>

<section id="products-dogs">
	<div class="container">

		<h2 class="text-center mt-sm-4">Die Bunten</h2>


		<div class="row">
			<div class="col-md-6 product-images">
				<div class="row">
					<?php foreach (getImages('hunde') as $i => $image): ?>
						<?php if ($i === 0): ?>
							<div class="col-12 product-image">
								<img src="<?= $image; ?>" class="img-fluid">
							</div>
							<div class="col-12 d-sm-none product-images-more text-center">
								<a href="#" class="d-block mt-3 mb-3 p-1" role="button">mehr Bilder</a>
							</div>
							<div class="col-12 product-images-thumbnails d-none d-sm-block">
								<div class="row">
						<?php endif; ?>

							<div class="col-12 col-sm-3 col-md-4 product-image-thumbnail<?= $i === 0 ? ' d-none d-sm-block active' : ''; ?>">
								<a href="<?= $image; ?>">
									<img src="<?= $image; ?>" class="img-fluid">
								</a>
							</div>

					<?php endforeach; ?>
							</div>
							</div>
				</div>
			</div>
			<div class="col-md-6">
				<p>Aus gedoppeltem Rindsleder in Nubukoptik.</p>
				<p>Durch Anschleifen der Oberfläche wird eine matte rustikale Oberflächenstruktur des Leders erreicht. Die Behandlung mit Fetten und Wachsen machen das Leder feuchtigkeits&shy;abweisend und geben der Oberfläche eine gewisse Zweifarbigkeit. Dieses besondere Oberflächenbild machen die Halsbänder zu einem echten Hingucker.</p>
				<p>Erhältlich in 7 Farben: rot, grau, blau, grün, schwarz, orange und braun sowie in 3 Breiten: 13&thinsp;mm, 19&thinsp;mm und 25&thinsp;mm</p>
				<p>Durch das verkleben und anschließende Abnähen von zwei Schichten Volleder ist selbst im nassen Zustand ein Ausdehnen fast unmöglich.</p>
				<p>Die passenden Leinen mit einer Breite von 13&thinsp;mm, 16&thinsp;mm oder 19&thinsp;mm sind, einfach mit Handschlaufe oder einstellbar in verschiedenen Längen, sind ebenfalls in 7 verschiedenen Farben erhältlich.</p>
				<p>Halsband: 49,– bis 59,– €.<br>Leine: 65,– bis 79,– €<br>
					<strong>Sonderanfertigungen nach Absprache möglich.</strong></p>
			</div>
		</div>
	</div>
</section>

</div>
