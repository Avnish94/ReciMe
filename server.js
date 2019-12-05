/***********************

  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pug          - A view engine for dynamically rendering HTML pages
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
  express-session - Collects cookies for each session to store login information

***********************/
const fs = require('fs');
const express = require('express'); // Add the express framework has been added
const session = require('express-session'); //add express session for password and username storing
//const cookieParser = require('cookie-parser');
let app = express();
app.use(session({
  secret: "my_little_secret",
  cookie: {path : '/'}
}));

const bodyParser = require('body-parser'); // Add the body-parser tool has been added
app.use(bodyParser.json());              // Add support for JSON encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add support for URL encoded bodies
//used to dynamically render header
app.use(function(req, res, next) {

  res.locals.isLoggedIn = req.session.log;
  next();
});

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

const dbConfig = process.env.DATABASE_URL;

let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/')); // This line is necessary for us to use relative paths and access our resources directory

const apiKey='apiKey=18ea56ebfa7440c7af5cd6faf4776fb5';


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
    //will need to change the below to login credentials
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
         req.session.image = image;
         req.session.rec_id = data.id;
         req.session.name = data.title;
         // console.log(data.id)
         // console.log(req.session.rec_id)

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
        data: data,
        user: req.session.user

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

  res.render('pages/login',{
  });

});//get

//logs user out when hitting logout button
app.get('/log_out', function(req, res) {

  req.session.destroy();
  res.redirect('/');
});

//handles when user signs in
app.post('/login', function(req, res) {

  //get all users and passwords
  var query1 = `SELECT * FROM users;`;
  var password=req.body.password;
  var user_name=req.body.user_name;

  db.any(query1)
        .then(function (data) {
          var suc = "The log-in info you have provided does not match.";
          for(var i=0; i<data.length; i++){
            var db_user = data[i].user_name;
            var db_user_password = data[i].password;
            if(user_name == db_user){
              //verify entered passwrod matches db
              if(password == db_user_password){
                req.session.pass = password;
                req.session.user = user_name;
                req.session.log = true;
                suc = "Succesfully logged in!"
              }//inner if
            }//outer if
          }
          if(req.session.log == false){
            res.render('pages/login',{
              my_title: "Saved Recipes",
              d: suc
            })
          }
          else{
            res.redirect('/');
          }
        })
        .catch(function (err) {
            // display error message in case an error
            console.log(err)
            console.log(req.session.user);
            console.log(req.session.pass);
            res.render('pages/saved_recipes', {
                title: 'Saved Recipes',
                d: ''
            })
        })
}); //post from login

//will have to render recipe page
//need to change topnav as well to remove signup
//and change where favorite recipes links to
//cannot edit headers after sent, so we may just want to remake pages with a different topNav
//not sure about what best way to do this is. need to think for now.
// res.render('pages/home_page')


app.post('/sign_up', function(req, res) {

  var query1 = `SELECT * FROM users;`;
  var password=req.body.password;
  var user_name=req.body.user_name;

  var add_user=`INSERT INTO users(user_name, password) VALUES ('${user_name}', '${password}');`;

  db.query(add_user);


res.render('pages/login')



});//post

app.get('/saved_recipes', function(req, res) {
	var query = `SELECT recipe FROM favorites WHERE user_name = '${req.session.user}';`;
	db.any(query)
      .then(function (rows) {
        console.log(rows)
          res.render('pages/saved_recipes',{
      			my_title: "Favorite Recipes",
      			data: rows
      		})
      })
      .catch(function (err) {
        console.log('error', err);
        res.render('pages/saved_recipes', {
          title: 'Favorited Recipes',
          data: ''
        })
      })
});

app.post('/favorite', function(req, res) {

  var title = req.session.name;
  var image = req.session.image;
  var id = req.session.rec_id;
  var user_name = req.session.user;

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
  var add_favorite =`INSERT INTO favorites(user_name, recipe) VALUES ('${user_name}', '${db_json}');`;

  db.query(add_favorite, function (err, result) {
    if (err) throw err;
    })

});//post to db favorited recipe

//returns json. helper function
async function getData(url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


app.listen(process.env.PORT);
