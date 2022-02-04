/**
 * Express
 * Needs to restart server after changes has been made
 */
// Install express (expressjs.com)
// install npm (npmjs.com)
// On mac write "sudo npm install -g nodemon" if "npm install -g nodemon" doesnt work. 

const express = require('express');
const path = require('path/posix');
const fs = require('fs');

// start server
const app = express();

/*
Code below generates files from '/public' if no other route matches

app.use(express.static('public'))
*/

// Respond to GET request for '/'
// app.get('/', (req, res) => {
//   // req = information about incoming request
//   // res = methods to send a response on the request
//   console.log('Someone request my root!');
//   console.log(req.method, req.url);
  
//   res.send('Hello Benjamin 👏');
// });


// Respond to GET-request for '/api/nom'
app.get('/api/nom', (req, res) => {
  res.send({ msg: 'Cakes are nom-nom-nom.'});
})

const options = {
  root: path.join(__dirname)
}



// Code below generates files from '/public' if no other route matches

app.use(express.static('public'));

// Open the index page
app.get('/', (req, res) => {

  const indexPage = './public/index.html';
  res.sendFile(indexPage, options);
  console.log(`Request was made for: ${indexPage}`);
});



// Open the about page
app.get('/about', (req, res) => {

  const aboutPage = './public/about.html';
  res.sendFile(aboutPage, options);
  console.log(`Request was made for: ${aboutPage}`);
});


// Open the nom page
app.get('/nom', (req, res) => {

  const nomPage = './public/nom.html';
  res.sendFile(nomPage, options);
  console.log(`Request was made for: ${nomPage}`);
});


//Start listening on port 3000 + callback
app.listen(3000, () => {
  console.log('👌 server started at http://localhost:3000');
});



// Read JSON-file, parse and save data in jokes variable
fs.readFile('./data/oneliners.json', (err, data) => {
  if (err) throw err;
  let jokes = JSON.parse(data);

  // Generate random number between 0 - 7
  let randomNumber = Math.floor(Math.random() * 8);

  // Assign a joke to randomJoke
  let randomJoke = jokes[randomNumber];

  // Send random joke to /jokes-file
  app.get('/jokes', (req, res )=> {
    res.send(randomJoke);
  })
});








