document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;   
var nichtZumachen = null;

function resize(){
	bildcontainerbreite();
	largePictureGeladen();
}

function bildcontainerbreite() {
	var containerbreite = document.getElementById("c1").offsetWidth;
	for(var i=0, len=document.getElementsByClassName("galeriecontainer").length; i<len; i++)
		{
			document.getElementsByClassName("galeriecontainer")[i].style.height = containerbreite*0.63 + "px";
		}
}

function toggleNav() {
	if (document.getElementById("hauptnav").style.display.match ("block")) {
		document.getElementById("hauptnav").style.display = "none";
	} else {
		document.getElementById("hauptnav").style.display = "block";
	}
}

function openLargePicture(pfad, geklicktesBild, containernummer) {
	document.getElementById("galerievollbildhintergrund").style.display = "block";
	var x = document.createElement("img");
	var y = pfad + "/large/" + geklicktesBild;
	x.setAttribute("src", y);
	x.setAttribute("alt", document.getElementById(containernummer).getElementsByTagName('img')[0].alt);
	x.setAttribute("id", "largeimgID");
	document.getElementById("galerievollbildcontainer").appendChild(x);
	x.setAttribute("onload", "largePictureGeladen()");
	document.getElementById("vollbildunterschrift").innerHTML = x.alt;
}

function largePictureGeladen(){
	var x = document.getElementById("largeimgID");
	document.getElementsByClassName("bildunterschrift")[0].style.width = (x.width) + "px";
	var outwidthcontainer = document.getElementById("galerievollbildcontainer").offsetWidth;
	var inwidthcontainer = x.width;
	var widthwindow = window.innerWidth;
	var pfeilwidth = document.getElementById("pl").width;
	if ((widthwindow - inwidthcontainer) > (pfeilwidth * 2)){		//Pfeile im Bild oder direkt daneben
		document.getElementById("pl").style.left = ((outwidthcontainer - inwidthcontainer)/2)-pfeilwidth  + "px";
		document.getElementById("pr").style.right = ((outwidthcontainer - inwidthcontainer)/2)-pfeilwidth  + "px";
	} else {
		document.getElementById("pl").style.left = (outwidthcontainer - inwidthcontainer)/2  + "px";
		document.getElementById("pr").style.right = (outwidthcontainer - inwidthcontainer)/2  + "px";
	}
}

function ChangePicture(m) {
	nichtZumachen = 1;		//damit Bild nicht durch funktion closeLargePicture geschlossen wird
	var aktuellesBild = document.getElementById("largeimgID").src;		//aktuelles src vom Bild bekommen
	lastSlash = aktuellesBild.lastIndexOf("/");		//letztes Slash im String finden
	aktuellesBild = aktuellesBild.slice(lastSlash+1);		//alles vor dem Slash abschneiden (Bild bleibt über)
	var bildliste = document.getElementsByClassName("galeriecontainer");
	var listnumber = 0;
	for (listnumber = 0; listnumber < bildliste.length; listnumber++) { 	//Bildliste durchgehen und Bild finden
		if (bildliste[listnumber].childNodes[1].src.includes(aktuellesBild)) { 	//selektiert das aktuelle Bild
			if (listnumber == 0 && m == -1) {		//erstes Bild der Seite und nach links
				var x = bildliste[bildliste.length-1].childNodes[1].src;		//gesamter Pfad vom letztes Bild
				var y = bildliste[bildliste.length-1].childNodes[1].alt;
			}
			else if (listnumber == bildliste.length-1 && m == 1) {		//Letztes Bild der Seite und nach rechts
				var x = bildliste[0].childNodes[1].src;		//gesamter Pfad vom ersten Bild
				var y = bildliste[0].childNodes[1].alt;
			}
			else {
				var x = bildliste[listnumber+m].childNodes[1].src;		//gesamter Pfad vom Bild
				var y = bildliste[listnumber+m].childNodes[1].alt;
			}
			lastSlash = x.lastIndexOf("/");		//letztes Slash im String finden
			vorlastSlash = x.lastIndexOf("/", lastSlash-1);		//vorletzten Slash im String finden
			firstSlash = x.lastIndexOf("/", vorlastSlash-1);		//erstes Slash im String finden
			pfad = x.slice(firstSlash+1, vorlastSlash);
			x = x.slice(lastSlash+1);		//alles vor dem Slash abschneiden (Bild bleibt über)
			document.getElementById("largeimgID").src = pfad + "/large/" + x;		//Zusammensetzen
			document.getElementById("vollbildunterschrift").innerHTML = y;
			break;
		}
	}
}

function lastPicture() {
	ChangePicture(-1);
}

function nextPicture() {
	ChangePicture(1);
}

function keypressed(event) {
	if (document.getElementById("galerievollbildhintergrund").style.display == "block") {
		var x = event.keyCode;
		if (x == 37) {
			lastPicture();
		}
		else if (x == 39) {
			nextPicture();
		}
	}
}

function handleTouchStart(evt) {                                         
	xDown = evt.touches[0].clientX;                                      
	yDown = evt.touches[0].clientY;                                      
}

function handleTouchMove(evt) {
	if ( ! xDown || ! yDown ) {
		return;
	}
	var xUp = evt.touches[0].clientX;                                    
	var yUp = evt.touches[0].clientY;
	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;
	if (document.getElementById("galerievollbildhintergrund").style.display == "block") {
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 0 ) {
				lastPicture();
			} else {
				nextPicture();
			}                       
		} else {
			if ( yDiff > 0 ) {
				/*alert ("You swiped up!");*/
			} else { 
				/*alert ("You swiped down!");*/
			}                                                                 
		}
	}
	/* reset values */
	xDown = null;
	yDown = null;                                             
};

function closeLargePicture() {
	if (nichtZumachen == null){
		document.getElementById("galerievollbildhintergrund").style.display = "none";
		document.getElementById("galerievollbildcontainer").removeChild(document.getElementById("largeimgID"));
	}
	nichtZumachen = null;
}

function setRating(x){
	alert ("setRating: " + x);
}