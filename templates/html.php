<!doctype html>
<html lang="de">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="Lederwaren, von Hand gefertig – für Mensch, Pferd und Hund.">

	<title>Sattlerei Anouk Wächter – Königsberg i.Bay.</title>

	<link href="dist/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="dist/vendor/typeface-alex-brush/index.css" rel="stylesheet" type="text/css">
	<link href="dist/vendor/typeface-raleway/index.css" rel="stylesheet" type="text/css">

	<link href="dist/main.css" rel="stylesheet">
</head>

<body id="page-top" class="<?= $exe; ?>"<?= $exe === 'index' ? ' data-spy="scroll" data-target="#mainNav" data-offset="200"' : '' ?>>

<?php include $TEMPLATE_DIR . 'nav.php'; ?>

<?php if (!isset($exe)): ?>
	<?php include $TEMPLATE_DIR . 'index.php'; ?>
<?php else: ?>
	<?php include $TEMPLATE_DIR . $exe . '.php'; ?>
<?php endif; ?>

<?php include $TEMPLATE_DIR . 'footer.php'; ?>

<script src="dist/conditional-polyfill.js"></script>
<script src="dist/main.js"></script>

</body>
</html>
