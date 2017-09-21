function toggleNav() {
	if (document.getElementById("hauptnav").style.display.match ("block")) {
		document.getElementById("hauptnav").style.display = "none";
	} else {
		document.getElementById("hauptnav").style.display = "block";
	}
}

function toggleText() {
	var texte = document.getElementsByClassName("blogtext");
	for (var i = 0; i < texte.length; i++) {
		if (texte[i].style.display.match ("none")) {
			texte[i].style.display = "block";
		} else {
			texte[i].style.display = "none";
		}
	}
}

function togglePics() {
	var texte = document.getElementsByClassName("blogbild");
	for (var i = 0; i < texte.length; i++) {
		if (texte[i].style.display.match ("none")) {
			texte[i].style.display = "block";
		} else {
			texte[i].style.display = "none";
		}
	}
}
