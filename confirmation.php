<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
		<meta charset="utf-8" />
		<meta http-equiv="refresh" content="15;url=http://dfriedrich.de">
		<title>D. Friedrich - Bestätigung</title>
		<link rel="stylesheet" href ="stylesheet.css" />
		<link rel="icon" href ="logo.png" />
	</head>
<body>

</body>
</html>

<?php
    function post_captcha($user_response) {
        $fields_string = '';
        $fields = array(
            'secret' => '6Lc3MDEUAAAAAGeQVTDbo_SQJV1yH6F25CMLoLUR',
            'response' => $user_response
        );
        foreach($fields as $key=>$value)
        $fields_string .= $key . '=' . $value . '&';
        $fields_string = rtrim($fields_string, '&');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }

    // Call the function post_captcha
    $res = post_captcha($_POST['g-recaptcha-response']);

    if (!$res['success']) {
        // What happens when the CAPTCHA wasn't checked
        echo '<p>Please go back and make sure you check the security CAPTCHA box.</p><br>';
    } else {
        // If CAPTCHA is successfully completed...
				
				$name = $_POST["name"];
				$header = "Von: Kontakt <$name>";
				$betreff = $_POST["betreff"];
				$nachricht = $_POST['nachricht'];
				$empfaenger = "kontakt@dfriedrich.de";
				
				$main = "Kontaktanfrage von {$name} auf DFriedrich.de \n\nBetreff: {$betreff} \n\nNachricht: \n\n{$nachricht}";
        
				mail ($empfaenger, "Kontaktanfrage auf DFriedrich.de", $main);
				
        echo '<br>Danke ';
				echo $name;
				echo ', deine Nachricht wurde versendet!<br><br>';
				echo "Deine Nachricht:<br>";
				echo $betreff;
				echo "<br>";
				echo $nachricht;
				echo "<br><br>Weiterleitung zur Startseite in 15 Sekunden..."; //Siehe meta Eintrag im HEAD
				//$seconds = 5;
				//sleep ( $seconds );
				//header("Location: https://www.dfriedrich.de/");
    }
?>