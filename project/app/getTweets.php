<?php 

// Формируем запрос
$query = "SELECT * FROM tweets ORDER BY date DESC";
//Делаем запрос
$result = mysqli_query($link, $query);
//Если он не произошел - выводим ошибку
if ( !$result ) {
	die(mysqli_error($link));
}
//Кол-во твитов
$numRows = mysqli_num_rows($result);

$tweets = array();
//Набиваем массив tweets
for ( $i = 0; $i < $numRows; $i++ ) {
	$row = mysqli_fetch_assoc($result);
	$tweets[] = $row;
}


?>