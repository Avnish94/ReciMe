/*script practice file */

function getSearch(){
	var input = document.getElementById("searchBar").value;
	console.log(input);
	if(input=="hello"){
		document.getElementById("bar").style.backgroundColor= "red";
	}
	else{
		document.getElementById("bar").style.backgroundColor= "cyan";
	}

	return input;
}

function search(){
	var input = document.getElementById("searchBar").value;
}

function hoverControl(overlay){
	var overlay =document.getElementById(overlay);
	overlay.style.opacity=0.75;
	console.log(overlay.id);
	var string= overlay.id+"Text";

	var text = document.getElementById(overlay.id+"Text");


	if(overlay.id == "overlay1"){
		overlay.style.backgroundColor="red";
		text.innerHTML = "UNHEALTHY";

	}

		if(overlay.id == "overlay2"){
		overlay.style.backgroundColor="green";
		text.innerHTML = "HEALTHY";

	}
		if(overlay.id == "overlay3"){
		overlay.style.backgroundColor="yellow";
		text.style.color= "black";
		text.innerHTML = "HIGH IN FATS, BUT LOW ON SUGAR";

	}
		if(overlay.id == "overlay4"){
		overlay.style.backgroundColor="orange";
		text.innerHTML = "HIGH IN sugar, BUT LOW ON starch";

	}

			if(overlay.id == "overlay5"){
		overlay.style.backgroundColor="green";
		text.innerHTML = "a heathy dish";

	}
			if(overlay.id == "overlay6"){
		overlay.style.backgroundColor="red";
		text.innerHTML = "HIGH IN sugar AND fat";

	}
	if(overlay.id == "overlay7"){
		overlay.style.backgroundColor="purple";
		text.innerHTML = "FAT ASS";

	}
		if(overlay.id == "overlay8"){
		overlay.style.backgroundColor="magenta";
		text.innerHTML = "exotic meal";

	}



}

function hoverControlStop(overlay){
	var overlay =document.getElementById(overlay);
	overlay.style.opacity=0;
	overlay.style.backgroundColor="blue";
}

function populate(){


	 /** creates <div class="col"> </div> inside grid*/

	var grid = document.getElementById("grid");
	var col=document.createElement("div");
	var att = document.createAttribute("class");
	att.value="col";
	col.setAttributeNode(att);
	grid.appendChild(col);




	 /** <img src="./a.jfif" class="image"> inside col*/

	var img = document.createElement("img");
	var source = document.createAttribute("src");
	source.value = "./a.jfif";
	img.setAttributeNode(source);
	var att2 = document.createAttribute("class");
	att2.value="image";
	img.setAttributeNode(att2);
	col.appendChild(img);

	/**	<div class="overlay" id = "overlay1" onmouseover='hoverControl("overlay1")' onmouseout='hoverControlStop("overlay1")'> */


	var colDiv = document.createElement("div");
	
	var att3 = document.createAttribute("class");
	att3.value="overlay";
	colDiv.setAttributeNode(att3);
	
	var att4 = document.createAttribute("id");
	att4.value="overlay1";
	colDiv.setAttributeNode(att4);

	var att5 = document.createAttribute("onmouseover");
	att5.value='hoverControl("overlay1")';
	colDiv.setAttributeNode(att5);

	var att6 = document.createAttribute("onmouseout");
	att6.value='hoverControlStop("overlay1")';
	colDiv.setAttributeNode(att6);
	col.appendChild(colDiv);


/**  <div class="text" id="overlay1Text">Hello World</div> */

	var text =document.createElement("div");
	var att7 = document.createAttribute("class");
	att7.value="text";
	text.setAttributeNode(att7);
	var att8 = document.createAttribute("id");
	att8.value="overlay1Text";
	text.setAttributeNode(att8);
	colDiv.appendChild(text);




}

function populate2(){


	 /** creates <div class="col"> </div> inside grid*/

	var grid = document.getElementById("grid");
	var col=document.createElement("div");
	var att = document.createAttribute("class");
	att.value="col";
	col.setAttributeNode(att);
	grid.appendChild(col);




	 /** <img src="./a.jfif" class="image"> inside col*/

	var img = document.createElement("img");
	var source = document.createAttribute("src");
	source.value = "./b.jfif";
	img.setAttributeNode(source);
	var att2 = document.createAttribute("class");
	att2.value="image";
	img.setAttributeNode(att2);
	col.appendChild(img);

	/**	<div class="overlay" id = "overlay1" onmouseover='hoverControl("overlay1")' onmouseout='hoverControlStop("overlay1")'> */


	var colDiv = document.createElement("div");
	
	var att3 = document.createAttribute("class");
	att3.value="overlay";
	colDiv.setAttributeNode(att3);
	
	var att4 = document.createAttribute("id");
	att4.value="overlay1";
	colDiv.setAttributeNode(att4);

	var att5 = document.createAttribute("onmouseover");
	att5.value='hoverControl("overlay1")';
	colDiv.setAttributeNode(att5);

	var att6 = document.createAttribute("onmouseout");
	att6.value='hoverControlStop("overlay1")';
	colDiv.setAttributeNode(att6);
	col.appendChild(colDiv);


/**  <div class="text" id="overlay1Text">Hello World</div> */

	var text =document.createElement("div");
	var att7 = document.createAttribute("class");
	att7.value="text";
	text.setAttributeNode(att7);
	var att8 = document.createAttribute("id");
	att8.value="overlay1Text";
	text.setAttributeNode(att8);
	colDiv.appendChild(text);




}


  /**    <img src="./a.jfif" class="image">

        <div class="overlay" id = "overlay1" onmouseover='hoverControl("overlay1")' onmouseout='hoverControlStop("overlay1")'>
    <div class="text" id="overlay1Text">Hello World</div>
  </div> */
