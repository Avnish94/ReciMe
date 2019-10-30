/*script practice file */

var recipe1 = {

	ingredients: [
	'butter',
 	'ground pepper',
  	'horseradish',
  	'parsley',
  	'potatoes',
  	'sour cream'],

	instructions: "'Bring a large pot of salted water to a boil."+
	"Add potatoes and cook until tender but still firm, about 15 minutes."+
	" Drain, and mash with 1 tablespoon butter and black pepper.  Stir in sour cream, horseradish and parsley."+
	"Whip potatoes and place in medium serving bowl. Melt remaining 1 tablespoon butter and pour over potatoes. Serve immediately.",

	image: 'https://spoonacular.com/recipeImages/294674-556x370.jpg',

	name:'Mashed Potatoes with Horseradish'
}//recipe1

var recipe2 = {

	ingredients: [
	'breadcrumbs',
  	'cauliflower',
  	'fresh parsley',
  	'fresh rosemary',
  	'golden raisins',
  	'olive oil',
  	'pine nuts',
  	'sea salt',
  	'sumac'],

	instructions: "Cut the florets off the stems and and then chop them into tiny florets."+
  "You can also chop up the stems into tiny pieces if you want. You should have about 6"+
   "cups of chopped cauliflower. In a large skillet heat 2 tablespoons of olive oil over"+
   "medium-high heat. Add the cauliflower, 1 teaspoon of salt, rosemary, and sumac. Sauté"+
    "until cauliflower is tender and starts to brown a bit, stirring as necessary, about 15 minutes."+
    "You can also add a bit of olive oil if the pan starts to get too dry or the cauliflower is starting to stick."+
    "Meanwhile, in a small skillet, toast the pinenuts over medium heat until golden brown. Set aside. Heat the "+
    "remaining 2 tablespoons of olive oil in the same pan. Once oil is shimmering, toss in the breadcrumbs and stir,"+
    "toasting the breadcrumbs. Season with a pinch of kosher salt and a few turns of freshly ground black pepper."+
    "Remove from the heat and toss in half of the chopped parsley. When cauliflower is done, remove from the heat and"+
    "season to taste with freshly ground black pepper and a pinch or so of salt if necessary. Toss in the toasted pine nuts,"+
    "the chopped raisins, and the remaining parsley. When ready to serve, sprinkle the top with the toasted breadcrumbs and some pecorino.",

	image: 'https://spoonacular.com/recipeImages/479101-556x370.jpg',

	name: "Pan Roasted Cauliflower From Food52"
}//recipe2

var recipe3 = {

	ingredients: [
	'butter',
  	'cooking oil',
  	'food coloring',
  	'water',
  	'white sugar'],

	instructions: "Place sugar and 3 tablespoons butter into a large heavy-bottomed pot over medium heat. \
	Pour the boiling water over, and stir to dissolve. Allow the mixture to come to a rolling boil. It \
	will boil up in the pot as if it is going to boil over, but it will settle down. Use some of the remaining butter \
	to butter a marble slab.                            When the sugar mixture reaches the soft crack stage of 270 to 280 degrees \
	F (132 to 140 degrees C), remove from the heat immediately. Pour onto the buttered marble slab. Add peppermint oil and food \
	coloring if desired. Butter your hands, and start pulling up pieces of the sugar blob. Keep  stretching so that it will not set \
	up. Continue to stretch until it has lost it's shine and is stringier.                            Pull the candy out into one long\
	 string, and cut into 1 inch segments using scissors. Store candies in an airtight tin.",

	image: 'https://spoonacular.com/recipeImages/294685-556x370.png',

	name: "Grandmama Pampas' Old-Fashion Pull Mints"
}//recipe3

var recipe4 = {

	ingredients: [
 	'butter',
  	'chicken broth',
  	'fresh cilantro',
  	'garlic powder',
  	'ground cumin',
  	'ground pepper',
  	'onion',
  	'onion powder',
  	'orange juice',
  	'salt',
  	'white rice'],

	instructions: "Melt the butter in a saucepan over medium-high heat. Stir in onion, and cook until tender.\
	 Mix in rice, and season with cumin, garlic powder, onion powder, pepper, cayenne pepper, and salt. Cook \
	 and stir until rice is golden brown. Pour in orange juice and broth, and bring to a boil. Reduce heat to\
	  low, cover and simmer 20 minutes.                            Remove cooked rice from heat, and gently mix\
	   in cilantro to serve.",

	image: 'https://spoonacular.com/recipeImages/343465-556x370.jpg',

	name: 'Orange Cilantro Rice'
}//recipe4





function api(){
	console.log(recipe1.instructions);
}









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

function recipeDisplay(){
	document.getElementById("recipe-1-list").style.backgroundColor="cyan";
}

function search(){
	var input = document.getElementById("searchBar").value;
}

function hoverControl(overlay){
	var overlay =document.getElementById(overlay);
	overlay.style.opacity=0.75;
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
	source.value = "../resources/images/a.jfif";
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

	console.log(document.getElementById("grid"));




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
	source.value = "../resources/images/b.jfif";
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

	console.log(document.getElementById("grid"));




}


  /**    <img src="./a.jfif" class="image">

        <div class="overlay" id = "overlay1" onmouseover='hoverControl("overlay1")' onmouseout='hoverControlStop("overlay1")'>
    <div class="text" id="overlay1Text">Hello World</div>
  </div> */
