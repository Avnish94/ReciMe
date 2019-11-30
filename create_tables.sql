
CREATE TABLE IF NOT EXISTS favorites (
  user_name VARCHAR(30),
  recipe jsonb,         /* Json file holding the recipe*/
  PRIMARY KEY(user_name) /* Username can't be the same */
  );

  CREATE TABLE IF NOT EXISTS users (
  user_name VARCHAR(30),
  password VARCHAR(30),
  PRIMARY KEY(user_name) /* Username can't be the same */
  );
