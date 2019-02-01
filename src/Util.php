<?php

namespace Utility;

class Util {

	/**
	 * @param string $imagesSubDir
	 * @return string[]
	 */
	static function getImages($imagesSubDir) {
		$files = [];
		$dir = __DIR__
			. DIRECTORY_SEPARATOR . '..'
			. DIRECTORY_SEPARATOR . 'img'
			. DIRECTORY_SEPARATOR . $imagesSubDir;

		if (!file_exists($dir)) {
			return $files;
		}

		foreach (array_diff(scandir($dir), ['.', '..']) as $filename) {
			$files[] = 'img/' . $imagesSubDir . '/' . $filename;
		}

		return $files;
	}
}
