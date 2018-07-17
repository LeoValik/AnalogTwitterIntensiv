$(document).ready(function() {
	// Переменные с '$' означают что в них находится jQuery код!
	let likes = 0;
	let idValue = 0;
	let $tweetLikeIcon;
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


 	// Функция создания твита
 	let createTweet = (date, text) => {

 		let $tweetBox = $('<div class="card tweet-card new">'); // Создаем обертку для твита
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
 		//countTweets();
 		setTimeout(function() {
 			$tweetBox.removeClass('new');
 		}, 2000);
 	};

	let getDate = function () {

		let d = new Date(),
			day = d.getDate(),
			hrs = d.getHours(),
			min = d.getMinutes(),
			sec = d.getSeconds();

		let mnt = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");

		if (day <= 9) day = "0" + day; //Чтобы отображалась дата так : 05, 07 и т.д.
		if (hrs <= 9) hrs="0" + hrs;
		if (min <=9 ) min="0" + min;
		if (sec <= 9) sec="0" + sec;
		let actualDate = `${day} ${mnt[ d.getMonth()]} ${d.getFullYear() } г.`;	

		return actualDate;	
	};

	let showNotification = function(apiResult){
		console.log(apiResult);
		// console.log(apiResult[0]['result']);
		if ( apiResult === "success") {
			$('#resultSuccess').slideDown(400, function() {
				setTimeout(function(){
					$('#resultSuccess').slideUp(400);
				}, 2000);
			});
		} else if ( apiResult === "error" ){
			$('#resultError').slideDown(400, function() {
				setTimeout(function(){
					$('#resultError').slideUp(400);
				}, 2000);
			});
		}
	}

	let increaseCounter = function(html){
			if (html === "success") {
				// increase счетчик +1
				let counter = $('#tweetsCounter').text();
				counter++;
				console.log(counter);
				$('#tweetsCounter').text(counter);
			}
		}
	//Считаем кол-во лайков
	let countLikes = function() {
		$('#likeCount').text(likes);
	}
	// Форма отправки  твитта
	$('#postNewTweet').on('submit', function(e){
		e.preventDefault();

		//Текст, введенный пользователем
		let tweetText = $('#tweetText').val().trim(); //trim - будет обрезать пробелы в начале и конце строки
		

		//Проверка, чтобы не отправлялся пустой твит

		if ( tweetText != "" ) {
			createTweet( getDate(), tweetText );
		}

		//Отправлять текст твита в БД

		tweetText = wrapURLs(tweetText, true);
		

		let sendData = "tweetText=" + tweetText;

		//Функция AJAX, дабы отправить запрос на серв без перезагрузки 
		$.ajax({
			type: "POST",
			url: "api.php",
			data: sendData,
			success: function (html) {
				//console.log(html);
				showNotification(html);
				increaseCounter(html);
			}
		});

	});

	//Like
	$('.like').on('click', function(e) {

		var likeId = $(this).attr('id');
		console.log(likeId);
		// e.preventDefault();
		if($(this).hasClass('active')) {
			$(this).removeClass("active");
			$(this).find('.fa-heart').removeClass('fas').addClass('far');
			likes--;
			countLikes();
		}
		else {
			$(this).addClass("active");
			$(this).find('.fa-heart').removeClass('far').addClass('fas');
			likes++;
			countLikes();
		}
	})
});