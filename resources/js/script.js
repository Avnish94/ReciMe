//changes color over image when mouse moves over it
//color changes based off healthScore
function hoverControl(overlayId){

	//get the overlay of the image mouse is hovering over
	var overlay =document.getElementById(overlayId);

	var textDisplay = document.getElementById(overlay.id+"Text");

	var healthScore = overlay.getAttribute("health");

	var recipeName = textDisplay.getAttribute("name");

	if(healthScore == undefined){
		overlay.style.backgroundColor = "#3c8f76";
		overlay.style.opacity = .70;
	}
	//changes color of overlay based on health value
	else if (healthScore>50){
		overlay.style.backgroundColor="#5aa614";
		overlay.style.opacity=0.75;

	}
	else if(healthScore<25){
		overlay.style.backgroundColor="#b52826";
		overlay.style.opacity=0.75;
	}
	else{
		overlay.style.backgroundColor="#bab82d";
		overlay.style.opacity=0.5;
	}

		textDisplay.innerHTML = recipeName;
}

//used to remove color over image effect
function hoverControlStop(overlayId){
	var overlay =document.getElementById(overlayId);
	overlay.style.opacity=0;
}

//function for favoriting recipes so the page doesn't need to reload
$(function() {
    $('#favorite').submit(function(event) {
        event.preventDefault(); // Stops browser from navigating away from page
				alert("Saved to your favorites!")
        $.post('/favorite', function(resp) {
        });
    });
});

//sets navbar active item
$(document).ready(function() {
  $('li.active').removeClass('active');
  $('a[href="' + location.pathname + '"]').closest('li').addClass('active');
});
