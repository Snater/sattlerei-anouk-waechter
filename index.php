<?php

$REMOTE_DIR = './';

function getImages($subDir) {
	global $REMOTE_DIR;

	$files = [];

	foreach (array_diff(scandir(__DIR__ . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $subDir), ['.', '..']) as $filename) {
		$files[] = $REMOTE_DIR . 'img/' . $subDir . '/' . $filename;
	}

	return $files;
}

$TEMPLATE_DIR = __DIR__ . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR;

$exe = isset($_GET['exe']) ? $_GET['exe'] : null;

include $TEMPLATE_DIR . 'html.php';
