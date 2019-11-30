/***********************

  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pug          - A view engine for dynamically rendering HTML pages
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database

***********************/
const fs = require('fs');
const express = require('express'); // Add the express framework has been added
let app = express();

const bodyParser = require('body-parser'); // Add the body-parser tool has been added
app.use(bodyParser.json());              // Add support for JSON encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add support for URL encoded bodies

const pug = require('pug'); // Add the 'pug' view engine

//Create Database Connection
const pgp = require('pg-promise')();

//Create fetch API. use command: 'npm i node-fetch --save' to install 
const fetch = require("node-fetch");

//attempting to add jquery to this server


/**********************

  Database Connection information

  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!

**********************/
// REMEMBER to chage the password

const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'recipe_db',
	user: 'postgres',
	password: 'lit'
};

let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/')); // This line is necessary for us to use relative paths and access our resources directory

var apiKey='apiKey=bc4bf97a26b6451f8265794ecb32f145'

/*

function get_all_files(){
  var files = fs.readdirSync('recipes');
  return files
}


// Take in the username of the person
// and put in database
function add_data_all(user){
  // create an empty list that will be used to insert the data of the username and recipe
  files=get_all_files();
  // Read in Grab JSON file and convert to string
  //grab file length for efficiency
  length=files.length
  // loop thourgh all files
  for(i=0; i<length; i++){
  let rawdata = fs.readFileSync('recipes/'+files[i]);
  let recipe= JSON.parse(rawdata)
  recipe=JSON.stringify(recipe);

  var test= '{"recipe": 0}'
  var query ='INSERT INTO favorites(user_name, recipe) VALUES('+user+','+test+")'"
  db.query("insert into favorites (user_name, recipe) values ($1, $2) ", [user, recipe])

  }

}

add_data_all('Aaron');

*/

app.get('/', function(req, res) {

    //gets random recipes, can change how many by changing number

    var number = 4;

    var url= `https://api.spoonacular.com/recipes/random?number=${number}&${apiKey}`;


     fetch(url).then(response => {
          return response.json();
        })
        .then(data =>{

      res.render('pages/home_page',{
        my_title: "reciMe",
        data: data.recipes

      })
        });//end fetch 
}); //end get request

app.get('/recipe', function(req, res) {

  var recipe_id= req.query.recipe;

  var url = `https://api.spoonacular.com/recipes/${recipe_id}/information?${apiKey}`

       fetch(url).then(response => {
          return response.json();
        })
        .then(data =>{

         var image = data.image;
         var health_info = `https://api.spoonacular.com/recipes/${recipe_id}/nutritionWidget?defaultCss=true&${apiKey}`;
         var instructions = data.instructions;
         
         //create smaller array ingredients for ease of use
         var tempIngredients = data.extendedIngredients;
         var ingredients = [];
         for (var i = 0;i<tempIngredients.length;i++) {
          ingredients[i]= {
          "name": tempIngredients[i].name,
          "amount": tempIngredients[i].amount,
          "unit":tempIngredients[i].unit           
         }
          }//for loop

          
         
      res.render('pages/recipe_page',{
        my_title: "reciMe",
        health_info: health_info,
        ingredients: ingredients,
        image: image,
        instructions: instructions,
        recipe_name: data.title

      })
        });//end fetch


}); //end get request*/


app.get('/search', function(req, res) {

  var search =req.query.search;
  var number = 4;

  //api call based on string entered by user
  var url = `https://api.spoonacular.com/recipes/search?number=${number}&query=${search}&${apiKey}`

     fetch(url).then(response => {
          return response.json();
        })
        .then(data =>{

      res.render('pages/search',{
        my_title: "reciMe",
        data: data.results
      })
        });//end fetch 

}); //end get request*/


app.listen(3000);
console.log('3000 is the magic port');
