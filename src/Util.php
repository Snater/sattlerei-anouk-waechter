<?php

namespace Utility;

class Util {

	/**
	 * @param string $category
	 * @return string[]
	 */
	static function getImages($category) {
		$files = [];
		$categoryDir = __DIR__
			. DIRECTORY_SEPARATOR . '..'
			. DIRECTORY_SEPARATOR . 'img'
			. DIRECTORY_SEPARATOR . $category;

		if (!file_exists($categoryDir)) {
			return $files;
		}

		foreach (array_diff(scandir($categoryDir), ['.', '..']) as $productLineId) {
			$productLineDir = $categoryDir . DIRECTORY_SEPARATOR . $productLineId;

			if (is_file($productLineDir)) {
				continue;
			}

			$files[$productLineId] = [];

			foreach (array_diff(scandir($productLineDir), ['.', '..']) as $filename) {
				if (is_file($productLineDir . DIRECTORY_SEPARATOR . $filename)) {
					$files[$productLineId][]
						= join('/', ['img', $category, $productLineId, $filename]);
				}
			}
		}

		return $files;
	}

	/**
	 * @param array[] $fieldDefinitions
	 * @param string[] $rawValues
	 * @return string[]
	 * @throws SanitizeException
	 */
	static public function sanitizeValues($fieldDefinitions, $rawValues) {
		$values = [];
		$errors = [];

		foreach ($fieldDefinitions as $field) {
			$value = filter_var(
				trim($rawValues[$field['key']]),
				FILTER_SANITIZE_STRING
			);

			if (
				isset($field['required']) && $field['required'] === true
				&& empty($value)
			) {
				$errors[] = 'Pflichtfeld nicht ausgefüllt: ' . $field['label'] . '.';
			}

			if (isset($field['check'])) {
				if (!filter_var($value, $field['check']['filter'])) {
					$errors[] = $field['check']['error'];
				}
			}

			$values[$field['key']] = $value;
		}

		if (count($errors) > 0) {
			throw new SanitizeException($errors);
		}

		return $values;
	}
}

class SanitizeException extends \Exception {
	/**
	 * @var string[]
	 */
	protected $errors;

	/**
	 * @param string[] $errors
	 */
	public function __construct($errors) {
		parent::__construct();

		$this->errors = $errors;
	}

	/**
	 * @return string[]
	 */
	public function getErrorMessages() {
		return $this->errors;
	}
}
