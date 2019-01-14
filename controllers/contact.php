<?php

if (!isset($_POST['form']) || $_POST['form'] !== 'contact') {
	die('Invalid parameters.');
}

$output = [
	'errors' => [],
];

if (isset($_SESSION['contact']) && $_SESSION['contact'] + 5 * 60 > time()) {
	$output['errors'][] = 'Sie haben das Kontaktformular innerhalb der letzten Minuten bereits verwendet. Um Spam zu entgegnen, ist das Abensenden des Formulars nur alle 5 Minuten gestattet.';
	echo json_encode($output);
	exit();
}

$fields = [
	'name' => 'Name',
	'phone' => 'Telefon',
	'email' => 'E-Mail',
	'text' => 'Anliegen',
];

$required = [
	'name',
	'email',
	'text',
];

$values = [];

foreach ($fields as $key => $title) {
	$values[$key] = filter_var(trim($_POST[$key]), FILTER_SANITIZE_STRING);
}

foreach ($required as $key) {
	if (empty($values[$key])) {
		$output['errors'][] = 'Pflichtfeld nicht ausgefüllt: ' . $fields[$key] . '.';
	}
}

if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
	$output['errors'][] = 'Die eingegebene E-Mail-Adresse ist ungültig.';
}

if (count($output['errors'])) {
	echo json_encode($output);
	exit();
}

ob_start();
?>
Name: <?php echo $values['name'] . "\r\n"; ?>
<?php echo (!empty($values['phone']) ? 'Telefon: ' . $values['phone'] . "\r\n" : ''); ?>
E-Mail: <?php echo $values['email'] . "\r\n"; ?>

Nachricht:
<?php echo $values['text'] . "\r\n"; ?>

---
www.sattlerei-anouk-wächter.de | <?php echo $_SERVER['REMOTE_ADDR']; ?> | <?php echo date('d.m.Y'); ?> – <?php echo date('H:i'); ?> Uhr

<?php
$message = ob_get_clean();

if (empty($_POST['men'])) {
	$sent = mail(
		'info@sattlerei-anouk-waechter.de',
		'[sattlerei-anouk-wächter.de] Kontaktforumlar',
		$message,
		'From: "' . $values['name'] . '" <' . $values['email'] . '>' . "\r\n" . 'Content-Type: text/plain; Charset=utf-8'
	);
}

if (isset($sent) && !$sent) {
	$output['errors'][] = 'Aufgrund eines Server-Fehlers konnte das Formular leider nicht bearbeitet werden. Bitte kontaktieren Sie uns per E-Mail oder versuchen Sie es später erneut.';
} else {
	$output['success'] = 'Vielen Dank für Ihre Nachricht.';
	$_SESSION['contact'] = time();
}

echo json_encode( $output );
exit();
