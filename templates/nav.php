<nav class="navbar navbar-expand-md navbar-light<?= $exe !== 'index' ? ' navbar-shrink' : ' navbar-index'; ?>" id="mainNav">
	<div class="container">
		<a class="navbar-brand" href="<?= $exe === 'index' ? '#page-top' : './'; ?>"><img src="img/logo.png" alt="Logo" height="40"><span style="font-family: 'Alex Brush',cursive;font-size: 1.6rem;font-weight: normal;margin-left: 0.6rem;"><span class="d-none d-sm-inline" style="
    font-family: Raleway,sans-serif;
    font-size: 0.8rem;
    font-weight: normal;
">Sattlerei</span> Anouk Wächter</span></a>
		<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
			Menü <i class="fa fa-bars"></i>
		</button>

		<div class="collapse navbar-collapse" id="navbarResponsive">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="<?= $exe === 'index' ? '' : './'; ?>#products">Produkte</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="<?= $exe === 'index' ? '' : './'; ?>#about">Über mich</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="<?= $exe === 'index' ? '' : './'; ?>#workshop">Die Werkstatt</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="<?= $exe === 'index' ? '' : './'; ?>#contact">Kontakt</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<div class="nav-scroller">
	<div class="container">
	<nav class="nav nav-underline">
		<div class="nav-table">
			<div>
				<div><a class="nav-link<?= $exe === 'menschen' ? ' active' : ''; ?>" href="menschen">für Menschen</a></div>
				<div><hr></div>
				<div><a class="nav-link<?= $exe === 'pferde' ? ' active' : ''; ?>" href="pferde">für Pferde</a></div>
				<div><hr></div>
				<div><a class="nav-link<?= $exe === 'hunde' ? ' active' : ''; ?>" href="hunde">für Hunde</a></div>
			</div>
		</div>
	</nav>
	</div>
</div>