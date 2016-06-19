document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;   
var nichtZumachen = null;

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

function openLargePicture(geklicktesBild) {
	document.getElementById("galerievollbildhintergrund").style.display = "block";
	var x = document.createElement("img");
	var y = "images/large/" + geklicktesBild;
	x.setAttribute("src", y);
	x.setAttribute("alt", "TODO Bildbeschreibung");
	x.setAttribute("id", "largeimgID");
	document.getElementById("galerievollbildcontainer").appendChild(x);
}

function nextPicture() {
	nichtZumachen = 1;		//damit Bild nicht durch funktion closeLargePicture geschlossen wird
	var aktuellesBild = document.getElementById("largeimgID").src;		//aktuelles src vom Bild bekommen
	lastSlash = aktuellesBild.lastIndexOf("/");		//letztes Slash im String finden
	aktuellesBild = aktuellesBild.slice(lastSlash+1);		//alles vor dem Slash abschneiden (Bild bleibt über)
	var bildliste = document.getElementsByClassName("galeriecontainer");
	if (bildliste[1].childNodes[1].src.includes(aktuellesBild)) { //findet das 2. Bild
		alert ("found");
	}
}

function lastPicture() {
	nichtZumachen = 1;
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