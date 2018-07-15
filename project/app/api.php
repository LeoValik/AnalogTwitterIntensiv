<?php 

require_once("config.php"); // config
require_once("db.php"); // $link

	//echo "Hello from api.php";
	//print_r($_POST);

	if ( isset($_POST['tweetText']) ) {
		$text = $_POST['tweetText'];
		
		if ( $text == '') {
			$errors[] = ['title' => 'Введите текст Твита'];
		} 

		//Защита от различных кавычек, sql-инекций 
		// + Отправляем запрос в БД
		if ( empty($errors) ) {
			$text = mysqli_real_escape_string($link, $text);
			$query = "INSERT INTO tweets (date, text) VALUES ( NOW(), '" . $text . "')";
			$result = mysqli_query($link, $query);
			if ( !$result ) {
				die(mysqli_error($link));
			}
			echo "success";
		} else {
			echo "error";
		}
	}

 ?>