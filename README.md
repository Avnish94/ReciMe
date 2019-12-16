~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ReciMe~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                                    ORGANIZATION/STRUCTURE
                                                
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The repo is structured into the following way:
  - All-project-code-components
    - create_tables.sql (database table creation file for project)
    - server.js
    - node_modules (npm installed add-ons like express-session)
    - package.json (build info for deployment environment)
    - package-lock.json
    - resources
      - css 
      - imgs
      - js
     - spec (for jasmine feature testing)
       - support
     - views
       - pages (html pages templated in pug)
       - partials (headers, footers, navbar)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                           
                               HOW TO BUILD/RUN PROJECT LOCALLY:
  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FIRST SET-UP DATABASE

      CREATE recipe_db before running included sql file

      use commands:

      sudo -u postgres psql
      create database recipe_db;
      \c recipe_db;

      Then inside the recipe_db run
      \i create_tables.sql

      Note make sure to be in the file directory with create_table.sql or go to the file path
    
NAVIGATE TO SERVER.JS FILE

      On line 59, change "var password = __ " to whatever your local postgres machine password is
       
IN YOUR COMPUTER TERMINAL

      Navigate to the directory the git repo is saved at.
      Make sure you have node installed on your computer
      
      run command:
      node server.js
      
      In web browser go to:
      http://localhost:3000/
      
      Enjoy!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                                   RUN VIA DEPLOYMENT ENVIRONMENT
                                            
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GO TO https://r3cim3.herokuapp.com/
      
      Enjoy!
      
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                                      RUN TESTING SUITE ON CODE
                                              
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
