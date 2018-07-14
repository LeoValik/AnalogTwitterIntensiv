$(document).ready(function() {
	// Переменные с '$' означают что в них находится jQuery код!


	let getDate = function () {

		let d = new Date(),
			hrs = d.getHours(),
			min = d.getMinutes(),
			day = d.getDate(),
			month = d.getMonth(),
			year = d.getFullYear();

		let monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");

		if (day <= 9) day = "0" + day; //Чтобы отображалась дата так : 05, 07 и т.д.


		let actualDate = `${day} ${monthArray[month]} ${year} года ${hrs} часов ${min} минут`;	

		return actualDate;	
	};

	let countTweets = function() {
		let tweetCounter = $('.tweet-card').length;
		$('#tweetsCounter').text(tweetCounter);
	};


	//Wraps all URLs in anchor tags with a `href` and `target` inside some given text.
	// Источник функции - https://gist.github.com/ryansmith94/0fb9f6042c1e0af0d74f
	var wrapURLs = function (text, new_window) {
	  var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
	  var target = (new_window === true || new_window == null) ? '_blank' : '';
	  
	  return text.replace(url_pattern, function (url) {
	    var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
	    var href = protocol_pattern.test(url) ? url : 'http://' + url;
	    return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
	  });
	};


	/*let test = wrapURLs('Узнал, что улучшилось в новом стандарте JavaScript https://radioprog.ru/post/81');
	console.log(test);*/
 	
 	// Функция создания твита
 	var createTweet = (date, text) => {

 		let $tweetBox = $('<div class="card tweet-card">'); // Создаем обертку для твита
 		let $tweetDate = $('<div class="tweet-date">').text( date ); // Создаем дату
 		let $tweetText = $('<div class="tweet-text">').html( wrapURLs(text) ).wrapInner('<p></p>'); // Создаем контент с Твитом
 		
 		//Определяем размер текста и подставляем соотвествующий font-size
 		let additionalClassName;

 		if ( text.length < 100 ) {
 			additionalClassName = 'font-size-large';
 		} else if (text.length > 150 ) {
 			additionalClassName = 'font-size-small';
 		} else {
 			additionalClassName = 'font-size-normal';
 		}

 		$tweetText.addClass(additionalClassName);

 		$tweetBox.append($tweetDate).append($tweetText); // Получаем разметку твита с датой и текстом твита
 		$('#tweetsList').prepend($tweetBox);
 		countTweets();
 	};

	let tweetsBase = [ 
		{
		date: '20 июня 2018 года',
		text: 'Выражения стрелочных функций имеют более короткий синтаксис по сравнению с функциональными выражениями и лексически привязаны к значению this (но не привязаны к собственному this, arguments, super, или new.target). Стрелочные функции всегда анонимные.'
		},
		{
			date: '21 июня 2018 года',
			text: 'Всегда пиши код так, как будто человек, который будет его саппортить — психопат-убийца, который знает, где ты живешь.'
		},
		{
			date: '25 июня 2018 года',
			text: 'Это была супер конференция! Я её надолго запомню :) http://3-works.up-skills.ru/webdevsummit2018'
		},
		{
			date: '01 июля 2018 года',
			text: 'Узнал, что улучшилось в новом стандарте JavaScript https://radioprog.ru/post/81'
		}
	];


	tweetsBase.forEach( function(tweet) {
		//console.log(tweet.date);
		//console.log(tweet.text);
		createTweet(tweet.date, tweet.text);
	});

	// Форма отправка твита
	$('#postNewTweet').on('submit', function(e) {
		e.preventDefault(); //Отменяем отправку формы
		let tweetText = $('#tweetText').val(); //Получаем текст нашего твита
		createTweet( getDate(), tweetText);
		$('#tweetText').val('');

	});

});