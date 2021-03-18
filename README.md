# Dungeon Master Helper

A PERN fullstack web app to help dungeon masters organise their D&D campaign

## Requirements

### Backend

-   [Node.js v14](https://nodejs.org/es/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Express.js middleware v4](https://expressjs.com/)

### Frontend

-   [Node.js v14](https://nodejs.org/es/)

## :page_facing_up: Table of contents

-   [General info](#general-info)
-   [Screenshots](#screenshots)
-   [Technologies](#technologies)
-   [Setup](#setup)
-   [Features](#features)
-   [Status](#status)
-   [Inspiration](#inspiration)
-   [Contact](#contact)

## Setup

-   Clone the repository

#### Backend

-   Download and install [Node](https://nodejs.org/es/)
-   Install [PostgreSQL](https://www.postgresql.org/). See [this youtube video](https://www.youtube.com/watch?v=fZQI7nBu32M) for instructions
-   Using the terminal, navigate to the repository directory
-   Install Nodemon globally `npm i -g nodemon`
-   Navigate to server folder `cd server`
-   Install dependecies `npm install`
-   Rename `sample.dotenv` to `.env` and enter your own details. **NOTE: Do not change the `database` variable**
-   Rename `config.sample.sh` to `config.sh` and change "myPostgresqlPassword" to your own password

Optional

-   Download and install [Postman](https://www.postman.com/downloads/) for testing

#### To run the backend

-   On the first install use `npm run con-dev`. The will create a fresh database and start the server. **WARNING If using this command after the first install, any data in the `dungeon` database will be deleted. _USE WITH CARE_**
-   To start the server use `npm run server`
-   The backend server will be running on `http://localhost:5000`

#### Frontend

-   From the root directory `cd client`
-   `npm install`

## Technologies - Backend

-   [PostgreSQL v12](https://www.postgresql.org/)
-   [PostgreSQL Installer for Windows](https://www.postgresqltutorial.com/install-postgresql/)
-   [Express.js middleware v4](https://expressjs.com/)
-   [Node.js v12](https://nodejs.org/es/)
-   [Nodemon](https://www.npmjs.com/package/nodemon) npm module so backend server will automatically restart after code changes
-   [Postman API](https://www.postman.com/downloads/) to simulate a frontend

## Technologies - Frontend

-   [React framework v16](https://reactjs.org/)
-   [Bootstrap v4](https://getbootstrap.com/) component library

## Setup - Backend

-   Change to `/server` directory
-   Install dependencies using `npm i`
-   Install [nodemon v2.0.2](https://www.npmjs.com/package/nodemon) globally if you don't already have it
-   Install [PostgreSQL](https://www.postgresql.org/) & run it (requires the password you created during installation)
-   Add database access credentials to `db.js` - recommend installing [npm dotenv](https://www.npmjs.com/package/dotenv) & using .env to hide credentials if commiting to Github
-   Postgresql shell commands: `\l` list all databases. `\c` database1 connect to database1. `\dt` inspect tables. `\d+` inspect table & show relation information. `\q` to quit.
-   Run `nodemon server` for a dev server
-   `http://localhost:5000/` can be accessed for CRUD operations such as POST, GET, PUT, DELETE etc. using Postman

## :floppy_disk: Setup - Frontend

-   Change to `/client` directory
-   Install dependencies using `npm i`.
-   run `npm start`. Frontend will open at `http://localhost:3000/`

## :computer: Code Examples - Backend

-   backend `index.js`: express post method used to add new todo [description] to postgreSQL database using SQL INSERT INTO statement

```javascript
// create a todo
app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *",
			[description]
		);

		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});
```

## :computer: Code Examples - Frontend

-   function that runs when user presses 'Add' button: the input body (description) is converted from a JavaScript object to a JSON string & POSTed to the todo database

```javascript
const onSubmitForm = async (e) => {
	e.preventDefault();
	try {
		const body = { description };
		const response = await fetch("http://localhost:5000/todos", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		console.log("Successfully added todo: ", response);
		window.location = "/";
	} catch (err) {
		console.error(err.message);
	}
};
```

## :cool: Features - Backend

-   All data stored in PostgreSQL database that can also be viewed and changed from the PostgreSQL shell (psql)

## :cool: Features - Frontend

-   React app created from the command prompt using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
-   Uses the [Bootstrap basic table](https://www.w3schools.com/bootstrap/bootstrap_tables.asp) to list todos
-   [Bootstrap 4 Modal](https://www.w3schools.com/bootstrap4/bootstrap_modal.asp) dialog box

## :clipboard: Status & To-Do List

-   Status: error in registration
-   To-Do: Fix errors and complete testing

## :clap: :wrench: Inspiration/General Tools

-   [PERN Stack Course - PostgreSQL, Express, React and Node](https://www.youtube.com/watch?v=ldYcgPKEZC8&t=116s)
-   [Youtube video: Learn Database Design by combining our JWT and PERN stack Todo List app together Part 1](https://www.youtube.com/watch?v=l3njf_tU8us)
-   [Youtube video: Learn Database Design by combining our JWT and PERN stack Todo List app together, part 2](https://www.youtube.com/watch?v=25kouonvUbg)
-   [Youtube video: How to Deploy a PERN application on Heroku](https://www.youtube.com/watch?v=ZJxUOOND5_A)
-   [React documentation](https://reactjs.org/docs/getting-started.html)
-   [Enable Emmet support for JSX in Visual Studio Code | React](https://medium.com/@eshwaren/enable-emmet-support-for-jsx-in-visual-studio-code-react-f1f5dfe8809c)
-   [js-beautify for VS Code](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

## :envelope: Contact

-   Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
