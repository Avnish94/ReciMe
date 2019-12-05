/*
CREATE recipe_db before running sql file

use commands:

sudo -u postgres psql
create database recipe_db;
\c recipe_db;

Then inside the recipe_db run
\i create_tables.sql

Note make sure to be in the file directory with create_table.sql or go to the file path

*/



DROP TABLE favorites;
DROP TABLE users;


CREATE TABLE IF NOT EXISTS favorites (
  user_name VARCHAR(30),
  recipe jsonb,         /* Json file holding the recipe*/
  PRIMARY KEY(user_name, recipe) /* Username can't be the same */
  );

CREATE TABLE IF NOT EXISTS users (
  user_name VARCHAR(30),
  password VARCHAR(30),
  PRIMARY KEY(user_name) /* Username can't be the same */
  );


INSERT INTO favorites(user_name, recipe)
VALUES
('Aaron','{"title":"Cashew Fried Rice","image":"https://spoonacular.com/recipeImages/114160-556x370.jpg","id":114160}'),
('Aaron', '{"title":"Dal and Rice With Spicy Fried Cabbage","image":"https://spoonacular.com/recipeImages/93639-556x370.jpg","id":93639}')
;

INSERT INTO users(user_name, password)
VALUES
('Aaron', 'lit')
;
