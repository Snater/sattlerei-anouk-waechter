<?php

session_name('SID');
session_start();

require_once __DIR__
	. DIRECTORY_SEPARATOR . '..'
	. DIRECTORY_SEPARATOR . 'vendor'
	. DIRECTORY_SEPARATOR . 'autoload.php';

$loader = new Twig_Loader_Filesystem(__DIR__ . DIRECTORY_SEPARATOR . 'templates');
$twig = new Twig_Environment($loader);
