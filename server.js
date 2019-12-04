/***********************

  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pug          - A view engine for dynamically rendering HTML pages
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database

***********************/
const fs = require('fs');
const express = require('express'); // Add the express framework has been added
const session = require('express-session'); //add express session for password and username storing
const cookieParser = require('cookie-parser');
let app = express();
app.use(session({secret: "my_little_secret"}));

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

var password='toor';
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'recipe_db',
	user: 'postgres',
	password: password
};

let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/')); // This line is necessary for us to use relative paths and access our resources directory

const apiKey='apiKey=bc4bf97a26b6451f8265794ecb32f145';


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
  recipe={"title": recipe.title, "image": recipe.image, "id": recipe.id}
  recipe=JSON.stringify(recipe);
  console.log(recipe)
  db.query("insert into favorites (user_name, recipe) values ($1, $2) ", [user, recipe])

  }

}

//renders home page when user puts in browser localhost:30000/
app.get('/', async function(req, res) {

    var number = 2;
    req.session.pass = "lit";
    req.session.user = "Aaron";
    //calls random recipe query on spoonacular
    //number sets amount of recipes returned
    var api_query = `https://api.spoonacular.com/recipes/random?number=${number}&${apiKey}`;

        /*returns json {recipes:
                                [ recipejson,
                                  recipejson ] }
        and sends to home_page.pug as data
        */
        const recipe_data = await getData(api_query);

        //see home_page.pug
        res.render('pages/home_page',{
        my_title: "reciMe",
        data: recipe_data.recipes

      })

}); //end get request

app.get('/recipe', async function(req, res) {

  var recipe_id= req.query.recipe;

  //gets one recipe json
  var api_query = `https://api.spoonacular.com/recipes/${recipe_id}/information?${apiKey}`;

  const data = await getData(api_query);

         const image = data.image;
         const health_info = `https://api.spoonacular.com/recipes/${recipe_id}/nutritionWidget?defaultCss=true&${apiKey}`;
         const instructions = data.instructions;

         //create smaller array ingredients for ease of use
         const tempIngredients = data.extendedIngredients;
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
        recipe_name: data.title,
        id: data.id,
        data: data

      })

}); //end get request

app.get('/search', async function(req, res) {

  var search =req.query.search;
  var number = 4;

  //api call based on string entered by user
  var api_query = `https://api.spoonacular.com/recipes/search?number=${number}&query=${search}&${apiKey}`;

  const data = await getData(api_query);

        res.render('pages/search',{
        my_title: "reciMe",
        data: data.results
      })

}); //end get request

//simply loads login page to get data from user
app.get('/login', async function(req, res) {

  var query1 = `SELECT * FROM users;`;
  const users = await getPostgres(query1);

res.render('pages/login',{
  data:users

      })

});//get

//handles when user signs in
app.post('/login', async function(req, res) {




  //get all users and passwords
  var query1 = `SELECT * FROM users;`;
  const data = await getPostgres(query1);

  var password=req.body.password;
  var user_name=req.body.user_name;


var user_array=data[0];

  //search array for user
for(var i=0;i<user_array.length;i++){
  var db_user = user_array[i].user_name;
  var db_user_password = user_array[i].password;
  if(user_name==db_user){
    console.log("WE CAN NOW LOAD Favorite RECIPES");
    //verify entered passwrod matches db
    if(db_user_password==password){
      console.log("password verified, yay we can log them in");
    }//inner if
  }//outer if
}

//will have to render recipe page
//need to change topnav as well to remove signup
//and change where favorite recipes links to
//cannot edit headers after sent, so we may just want to remake pages with a different topNav
//not sure about what best way to do this is. need to think for now.
res.render('pages/favorites')




});//post


app.post('/sign_up', function(req, res) {

  var query1 = `SELECT * FROM users;`;
  var password=req.body.password;
  var user_name=req.body.user_name;

  var add_user=`INSERT INTO users(user_name, password) VALUES ('${user_name}', '${password}');`;

  db.query(add_user);


res.render('pages/login')



});//post

app.get('/saved_recipes', function(req, res) {
	var query = 'select * from users;';
  console.log(req.session.user);
	db.any(query)
      .then(function (rows) {
          res.render('pages/saved_recipes',{
      			my_title: "Favorite Recipes",
      			data: rows,
      		})

      })
      .catch(function (err) {
        console.log('error', err);
        res.render('pages/saved_recipes', {
          title: 'Favorited Recipes',
          data: '',
        })
      })
});

app.get('/favorite', async function(req, res) {

  var query1 = `SELECT recipe FROM favorites;`;
  var title = req.query.title;
  var image = req.query.image;
  var id = parseInt(req.query.recipe_id, 10);



  //var user_name = GET USER NAME SOMEHOW

  var db_json = {
    "id": id,
    "image": image,
    "title": title

  }

var db_json=JSON.stringify(db_json);

//still need to figure out how to get the user here as well. forced login is problably the way to go
//Might need to make an async function or somethinfg here, but i dont think itll matter too much
//but the data base takes time to insert things so we migth want to add a setTimeout or something for doing things
//after here. but i doubt it will matter
var add_favorite =`INSERT INTO favorites(user_name, recipe) VALUES ('Aaron', '${db_json}');`;

//db.query(add_favorite);

const favorite_recipes = await getPostgres(query1);

//api query for getting recipe info bulk
var url= `https://api.spoonacular.com/recipes/informationBulk?${apiKey}&ids=`;
for(var i =0;i<favorite_recipes.length;i++){


var id = favorite_recipes[i].recipe.id;

 //if recipe_id is the last one, dont add a comma after
  if(i==favorite_recipes.length-1){
  url = `${url}${id}`;
  }
  else{
    url = `${url}${id},`;
  }


}//for loop
console.log(url);

const data= await getData(url);

 console.log(data);

        res.render('pages/home_page',{
        my_title: "reciMe",
        data: data

      })


});//get

//returns json. helper function
async function getData(url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getPostgres(query){
  const data = await db.any(query);
  return data;

}


app.listen(3000);
console.log('3000 is the magic port');
