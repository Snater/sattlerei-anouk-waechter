<?php

require_once __DIR__
	. DIRECTORY_SEPARATOR . 'vendor'
	. DIRECTORY_SEPARATOR . 'autoload.php';

$loader = new Twig_Loader_Filesystem(__DIR__ . DIRECTORY_SEPARATOR . 'templates');
$twig = new Twig_Environment($loader);

$REMOTE_DIR = './';

function getImages($subDir) {
	global $REMOTE_DIR;

	$files = [];
	$dir = __DIR__ . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $subDir;

	if (!file_exists($dir)) {
		return $files;
	}

	foreach (array_diff(scandir($dir), ['.', '..']) as $filename) {
		$files[] = $REMOTE_DIR . 'img/' . $subDir . '/' . $filename;
	}

	return $files;
}

$TEMPLATE_DIR = __DIR__ . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR;

$exe = isset($_GET['exe']) ? $_GET['exe'] : 'index';

echo $twig->render('html.html.twig', [
	'exe' => $exe,
	'is_front' => $exe === 'index',
	'REMOTE_DIR' => $REMOTE_DIR,
	'images' => getImages($exe),
]);
