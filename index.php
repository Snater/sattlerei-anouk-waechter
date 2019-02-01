<?php

require_once __DIR__
	. DIRECTORY_SEPARATOR . 'vendor'
	. DIRECTORY_SEPARATOR . 'autoload.php';

$loader = new Twig_Loader_Filesystem(__DIR__ . DIRECTORY_SEPARATOR . 'templates');
$twig = new Twig_Environment($loader);

function getImages($subDir) {
	$files = [];
	$dir = __DIR__ . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $subDir;

	if (!file_exists($dir)) {
		return $files;
	}

	foreach (array_diff(scandir($dir), ['.', '..']) as $filename) {
		$files[] = 'img/' . $subDir . '/' . $filename;
	}

	return $files;
}

$exe = isset($_GET['exe']) ? $_GET['exe'] : 'index';

echo $twig->render($exe . '.html.twig', [
	'exe' => $exe,
	'is_front' => $exe === 'index',
	'images' => getImages($exe),
]);
