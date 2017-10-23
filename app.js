// IMPORT MODULES
const express = require('express')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// CONFIG MODULES
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));									// set static files 
app.use(bodyParser.urlencoded({extended: true}));


// SET UP ROUTING

//GET homepage 
app.get('/', function (req, res) {
	res.render('index');
})

// GET all users 
app.get('/users', function (req, res) {
	fs.readFile('./users.json', function(err, data) {
		if(err) {
			throw err;
		} 
		const parsed = JSON.parse(data);
		res.render('./users', {users: parsed}); 
	}); 
});

// GET specific user
app.get('/searched', function (req, res) {
	let input = req.query.q;
	fs.readFile('./users.json', function(err, data) {
		if(err) {
			throw err;
		} 
		const parsed = JSON.parse(data);
		const output = parsed.find(element => element.firstname === input || element.lastname === input); 

		res.render('./searched', {users: output, q: input});
	});
});

//GET create new user
app.get('/add-new', function (req, res) {
	res.render('./add-new');
});

//POST create new user
app.post('/add-new', function(req, res) {

	const newUser = {											// we put the new user data into an object 'newUser'
		firstname: req.body.fn,
		lastname: req.body.ln,
		email: req.body.e
	}; 

	fs.readFile('./users.json', function(err, data) {			//Then we read the existing file
		if(err) {
			throw err;
		} 
		let parsed = JSON.parse(data);							// then we parse it into an array that we can edit
		parsed.push(newUser);									// we push the object'newUser' into the array 'parsed' 
		let newData = JSON.stringify(parsed); 					// we translate the new array back into JSON

		fs.writeFile('./users.json', newData, function(err) {
			if(err) {
				throw err;
			}
			let message = true;									// pass on the variable 
			res.render('./users', {users: parsed, message: message});
		});
	});
});


// SET UP PORT
app.listen(3000, function () {
  console.log('User Information App listening on port 3000.')
})