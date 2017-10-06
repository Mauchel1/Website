<!DOCTYPE html>
<html lang="de">

	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
		<meta charset="utf-8" />
		<title>D. Friedrich - Terra</title>
		<link rel="stylesheet" href ="stylesheet.css" />
		<link rel="icon" href ="../logo.png" />
      <script language="javascript" type="text/javascript" src="javascript.js"></script>
	</head>

	<body>
		<header>
			<div class="seitentitel">
				Terrarium
			</div>
			<nav onclick="toggleNav()" class="navigation">
				Menü
				<ul id="hauptnav">
					<li><a href="../fotografie/fotografie.html"> Fotografie </a></li>
					<li><a href="baublog.html"> Terrarium </a></li>
					<li><a href="../stuff.html"> stuff </a></li>
					<li><a href="../about_me.html"> Über mich </a></li>
				</ul>
			</nav>
			<nav class="home">
				<a href="../index.html"> <img src="home.png" width="30" height="30" 
				onmouseover="src='go_home.png'" onmouseout="src='home.png'" onmousedown="src='home_pfeil.png'"
				alt="homebutton" /> </a>
			</nav>
			<div class="blogNavWrapper">
				<nav>
					<ul class="blognav">
						<li><a href="baublog.html">Baublog</a></li>
<!--						<li><a href="live.html">LIVE</a></li>-->
						<li><a href="statics.php">Statistiken</a></li> 
						<div class="clear"></div>
					</ul>
				</nav>
			</div>
		</header>
		
		<main>
			<div class="blogheader">
				<h2>Statistiken</h2>
			</div>
			<div class="statisticBody">
				<div class="statisticBodyHead">
					nächste Fütterung: <?php writeData("beide", "Fütterung"); ?><br>
					nächste Säuberung: <?php writeData("beide", "Säuberung"); ?>
				</div>
				<div class="statisticColumn">
					&#9794 <br>
					<div class="staticBild">
						<img src="Terrabilder/CATIA Modell.jpg" alt="Männliche Schlange">
					</div>                
					Länge: <?php writeData("ER", "Länge"); ?><br>
					Gewicht: <?php writeData("ER", "Gewicht"); ?><br>
					letzte Fütterung: <?php writeData("ER", "Fütterung"); ?><br>
					letzte Häutung:	<?php writeData("ER", "Häutung"); ?><br>
					<button onclick="toggleStatics(1)" class="button">Zeig mehr / weniger</button>
					<div class="statisticDeep" id="statisticEr">
						Häutungen: <br>  <?php allLineWith("haeutungen.txt", "ER", "13"); ?>
						Länge: <br> <?php allLineWith("schlangendaten.txt", "Laenge ER", "10"); ?>
						Gewicht: <br> <?php allLineWith("schlangendaten.txt", "Gewicht ER", "12"); ?>
						Fütterungen: <br> <?php allLineWith("fuetterung.txt", "ER", "0"); ?>
					</div>
				</div>
				<div class="statisticColumn">
					&#9792 <br>
					<div class="staticBild">
						<img src="Terrabilder/CATIA Modell.jpg" alt="Weibliche Schlange">
					</div>
					Länge: <?php writeData("SIE", "Länge"); ?><br>
					Gewicht: <?php writeData("SIE", "Gewicht"); ?><br>
					letzte Fütterung: <?php writeData("SIE", "Fütterung"); ?><br>
					letzte Häutung: <?php writeData("SIE", "Häutung"); ?><br>
					<button onclick="toggleStatics(2)" class="button">Zeig mehr / weniger</button>
					<div class="statisticDeep" id="statisticSie">
						Häutungen: <br> <?php allLineWith("haeutungen.txt", "SIE", "14"); ?>
						Länge: <br> <?php allLineWith("schlangendaten.txt", "Laenge SIE", "11"); ?>
						Gewicht: <br> <?php allLineWith("schlangendaten.txt", "Gewicht SIE", "13"); ?>
						Fütterungen: <br> <?php allLineWith("fuetterung.txt", "SIE", "0"); ?>
					</div>
				</div>
			</div>
		</main>
		
		<footer>
			<div class="footer_links">
				<p> <small> 
				<a href="../impressum.html"> Impressum </a>
				<br><a href="../kontakt.html"> Kontakt </a> </small> </p>
			</div>
			<div class="footer_rechts">
			<p> <small>   
				<br>&copy Copyright by D. Friedrich</small> </p>
			</div>
		</footer>

		<?php
		function writeData($wer, $was) {
			if ($wer == "ER") {
				if ($was == "Länge") {
					echo substr(lastLineWith("schlangendaten.txt", "Laenge ER"), 11);
				} else if ($was == "Gewicht") {
					echo substr(lastLineWith("schlangendaten.txt", "Gewicht ER"), 12);
				} else if ($was == "Fütterung") {
					echo substr(lastLineWith("fuetterung.txt", "erfolgreich ER"), 26);
				} else {
					echo substr(lastLineWith("haeutungen.txt", " ER"), 13);
				}
			} else if ($wer == "SIE") {
				if ($was == "Länge") {
					echo substr(lastLineWith("schlangendaten.txt", "Laenge SIE"), 12);
				} else if ($was == "Gewicht") {
					echo substr(lastLineWith("schlangendaten.txt", "Gewicht SIE"), 13);
				} else if ($was == "Fütterung") {
					echo substr(lastLineWith("fuetterung.txt", "erfolgreich SIE"), 27);
				} else {
					echo substr(lastLineWith("haeutungen.txt", " SIE"), 14);
				}
			} else {
				if ($was == "Fütterung"){
					echo substr(lastLineWith("fuetterung.txt", "naechste Fuetterung"), 21);
				} else {
					echo substr(lastLineWith("saeuberungen.txt", "naechste"), 20);
				}
			}
		}
		
		function allLineWith($file, $keystring, $cut){
			$myfile = fopen($file, "r") or die("Datei nicht gefunden...");
			while(!feof($myfile)) {
				$actualLine = fgets($myfile);
				if (strpos($actualLine, $keystring) !== false) {
					echo substr($actualLine, $cut) . "<br>";
				}
			}
			fclose($myfile);
		}

		function lastLineWith($file, $keystring){
			$myfile = fopen($file, "r") or die("Datei nicht gefunden...");
			while(!feof($myfile)) {
				$actualLine = fgets($myfile);
				if (strpos($actualLine, $keystring) !== false) {
					$lastLine = $actualLine;
				}
			}
			fclose($myfile);
			return $lastLine;
		}
		
		?>
		
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-84931807-1', 'auto');
			ga('send', 'pageview');

		</script>
		
 	</body>
</html>