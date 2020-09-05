let axios = require("axios");
let express = require("express");
let app = express();
const pg = require("pg");
const bodyParser = require('body-parser')
app.use(bodyParser.json())



const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

let port = 3000;
let hostname = "localhost"
app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});


app.use(express.static("public_html"));

// get the cat data with IDs and image URLs
app.get("/cats", function (req, res) {
	// Get cats from db
	pool.query(
			`SELECT * FROM catApp`,
			).then(function (response) {
				console.log(response.rows);
				res.status(200).json(JSON.stringify({"cats":response.rows}));
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).json(JSON.stringify({"error":"something database failed"}));
		});
	console.log("Sending request...")
});

app.post("/winner", function (req, res) {
	console.log(req.body);
    let winID  = req.body["winnerID"];	
	let loseID = req.body["loserID"];
	console.log(winID);
	console.log(loseID);
	// Increment count of winner over loser
	// Yes this is bad, but aparantly you can have variable identifiers such as column name 
	// which i use to identify the losing cat
	if(loseID == 1){
		pool.query(
			`UPDATE catdata SET cat1 = cat1 + 1 WHERE id = ($1)`,
			[winID]
		)
		.then(function (response) {
			// account successfully created
			res.status(200).send();
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).send(); // server error
		});	
	}

	if(loseID == 2){
		pool.query(
			`UPDATE catdata SET cat2 = cat2 + 1 WHERE id = ($1)`,
			[winID]
		)
		.then(function (response) {
			// account successfully created
			res.status(200).send();
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).send(); // server error
		});	
	}
	
	if(loseID == 3){
		pool.query(
			`UPDATE catdata SET cat3 = cat3 + 1 WHERE id = ($1)`,
			[winID]
		)
		.then(function (response) {
			// account successfully created
			res.status(200).send();
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).send(); // server error
		});	
	}
	
	if(loseID == 4){
		pool.query(
			`UPDATE catdata SET cat4 = cat4 + 1 WHERE id = ($1)`,
			[winID]
		)
		.then(function (response) {
			// account successfully created
			res.status(200).send();
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).send(); // server error
		});	
	}
	
});

// get the matrix of winning cats and their matchups
app.get("/winner", function (req, res) {
	// Get cats from db
	pool.query(
			`SELECT * FROM catData`,
			).then(function (response) {
				console.log(response.rows);
				res.status(200).json(JSON.stringify({"cats":response.rows}));
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).json(JSON.stringify({"error":"something database failed"}));
		});
	console.log("Sending request...")
});










