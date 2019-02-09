<?php

use Anouk\Util;

require_once __DIR__ . DIRECTORY_SEPARATOR . 'init.php';

$exe = isset($_GET['exe']) ? $_GET['exe'] : 'index';

echo $twig->render($exe . '.html.twig', [
	'exe' => $exe,
	'is_index' => $exe === 'index',
	'images' => Util::getImages($exe),
]);
