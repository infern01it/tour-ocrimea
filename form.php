<?php
if(isset($_POST['name']) && isset($_POST['tel']) && isset($_POST['email']) && $_COOKIE['formid']){
	$formid = $_COOKIE['formid'];
	$string = mb_strlen($_POST['name'],'utf-8').$_POST['tel'].$_POST['email'];
	if(strcmp(md5($string),$formid) == 0){
		if(substr_count($_POST['tel'],'/[^0-9-+()]/') > 0){
			die('В поле "Имя" содержатся недопустимые символы');
		}
		$name = preg_replace('/[^А-Яа-яA-Za-z.]/ui', '', $_POST['name']);
		if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
			die('Не верно указан email');
		}
		$email = $_POST['email'];
		$cc = substr_count($_POST['tel'],'/[^0-9-+()]/');
		if($cc > 0){
			die('Не верно указан номер телефона '.$cc);
		}
		$tel = preg_replace('/[^0-9-+()]/', '', $_POST['tel']);
		
		$header = 'From: Остров КРЫМ <noreply@tour.o-crimea.ru>' . "\r\nContent-type: text/html; charset=utf-8\r\n";
		
		//АДРЕСА ПОЧТЫ
		$mails = array(
			'info@o-crimea.ru',
			'ad.nkvadrat@gmail.com'
		);
		
		$message = "<html>";
		$message .= "<h2>Отправлена форма с сайта tour.o-crimea.ru.</h2><p>Имя: ".$name.";</p><p>Телефон: ".$tel.";</p><p>Email: ".$email."</p>";
		$message .= "</html>";
		$message = iconv("utf-8","CP1251",$message);
		$err = false;
		foreach($mails as $mail){
			$result = mail($mail,"Отправлена форма с сайта tour.o-crimea.ru",$message,$header);
			if(!$result)$err = false;
		}
		if(!$err){
			die("Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.");
		}
		else{
			die("Ошибка");
		}
	}else{
		die("Unknown form 1 ".$string." ".$_POST['id']);
	}
}else{
	die("Unknown form 2");
}
?>