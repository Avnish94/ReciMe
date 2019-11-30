//changes color over image when mouse moves over it
//color changes based off healthScore
function hoverControl(overlayId){

	//get the overlay of the image mouse is hovering over
	var overlay =document.getElementById(overlayId);

	var textDisplay = document.getElementById(overlay.id+"Text");

	var healthScore = overlay.getAttribute("health");

	var recipeName = textDisplay.getAttribute("name");


	//changes color of overlay based on health value
	if (healthScore>75){
		overlay.style.backgroundColor="green";
		overlay.style.opacity=0.75;

	}
	else if(healthScore<25){
		overlay.style.backgroundColor="red";
		overlay.style.opacity=0.75;
	}
	else{
		overlay.style.backgroundColor="yellow";
		overlay.style.opacity=0.5;
	}

		textDisplay.innerHTML = recipeName;
}

//used to remove color over image effect
function hoverControlStop(overlayId){
	var overlay =document.getElementById(overlayId);
	overlay.style.opacity=0;
}


