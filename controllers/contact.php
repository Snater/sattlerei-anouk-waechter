<?php

if (!isset($_POST['form']) || $_POST['form'] !== 'contact') {
	die('Invalid parameters.');
}

require_once __DIR__
	. DIRECTORY_SEPARATOR . '..'
	. DIRECTORY_SEPARATOR . 'init.php';

$output = [
	'errors' => [],
];

if (isset($_SESSION['contact']) && $_SESSION['contact'] + 5 * 60 > time()) {
	$output['errors'][] = 'Sie haben das Kontaktformular innerhalb der letzten Minuten bereits verwendet. Um Spam zu entgegnen, ist das Abensenden des Formulars nur alle 5 Minuten gestattet.';
	echo json_encode($output);
	exit();
}

$fields = [
	[
		'key' => 'name',
		'label' => 'Name',
		'required' => true,
	], [
		'key' => 'phone',
		'label' => 'Telefon',
	], [
		'key' => 'email',
		'label' => 'E-Mail',
		'required' => true,
		'check' => [
			'filter' => FILTER_VALIDATE_EMAIL,
			'error' => 'Die eingegebene E-Mail-Adresse ist ungültig.',
		],
	], [
		'key' => 'text',
		'label' => 'Nachricht',
		'required' => true,
	],
];

$values = [];

foreach ($fields as &$field) {
	$value = filter_var(
		trim($_POST[$field['key']]),
		FILTER_SANITIZE_STRING
	);

	if (
		isset($field['required']) && $field['required'] === true
		&& empty($value)
	) {
		$output['errors'][] = 'Pflichtfeld nicht ausgefüllt: ' . $field['label'] . '.';
	}

	if (isset($field['check'])) {
		if (!filter_var($value, $field['check']['filter'])) {
			$output['errors'][] = $field['check']['error'];
		}
	}

	$values[$field['key']] = $value;
}

if (count($output['errors'])) {
	echo json_encode($output);
	exit();
}

$message = $twig->render('contact-mail.html.twig', array_merge($values, [
	'REMOTE_ADDR' => $_SERVER['REMOTE_ADDR'],
]));

if (empty($_POST['men'])) {
	$sent = mail(
		'info@sattlerei-anouk-waechter.de',
		'[sattlerei-anouk-wächter.de] Kontaktforumlar',
		$message,
		join("\r\n", [
			'From: "' . $values['name'] . '" <' . $values['email'] . '>',
			'Content-Type: text/plain; Charset=utf-8'
		])
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
