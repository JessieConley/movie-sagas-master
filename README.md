# Project Name

Movie Sagas Master

## Description

The Movie Sagas application is a movie application that displays existing movies within an SQL database and gives you the option to select a movie and edit the title and description. Upon submit of the title and description edit, the database will be updated with the new movie title and description.  

## Approach
The approach I took with this application was starting with the databse set up in SQL. After the DB was set up, I set up my server side routes. Following back-end set up, I updated my Index.js to include my generator functions and set up my page components.

Once I had the basic functionality of my application working and I was able to update the dataebase when movie edits were made. I applied some css styling to each of the pages as well. 

## Prerequisites

- Node
- React 
- Redux
- React-Router-Dom
- React-Redux
- Redux-Logger
- Express
- Body-Parser
- Postico
- Postgres


## Installation
1. If you don't have Node installed, install it globally within your terming using the command "npm install nodemon --global
2. Run "npm install" in terminal
3. Run "npm install react-router-dom to add react-router to your project, then set up your import within your application files
4. Run "npm install redux react-redux to connect react and redux together, then set up your import within your application files
3. Run "npm run server" in terminal
4. Open a second terminal window, since we are using nodemon, and run "npm run client" in the new terminal window

## How to Use Application
1. On page load, you will see all movies from the database displayed on the page. You can select any movie poster image on this page to get more details on the movie from the Details page.  
2. Once you are on the Details page, you have the option to click back to home or click to edit the title and descrition on the selected movie.  
3. If you are editing the movie details, you will be brought to the Edit page. Once new title and description inputs are made, select the button to save the updates. You will then be directed to your home page and the new title and description will store in the database. 

