<?php

use Utility\Util;

require_once __DIR__
	. DIRECTORY_SEPARATOR . 'vendor'
	. DIRECTORY_SEPARATOR . 'autoload.php';

$loader = new Twig_Loader_Filesystem(__DIR__ . DIRECTORY_SEPARATOR . 'templates');
$twig = new Twig_Environment($loader);

$exe = isset($_GET['exe']) ? $_GET['exe'] : 'index';

echo $twig->render($exe . '.html.twig', [
	'exe' => $exe,
	'is_index' => $exe === 'index',
	'images' => Util::getImages($exe),
]);
