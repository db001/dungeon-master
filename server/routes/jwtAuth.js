const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../database/db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorization
router.post("/register", validInfo, async (req, res) => {
	const { email, name, password } = req.body;
	try {
		const user = await pool.query(
			"SELECT * FROM dungeon_master WHERE dm_email = $1",
			[email]
		);

		if (user.rows.length > 0) {
			return res.status(401).json("User already exist!");
		} else {
			console.log("Creating new user");
		}

		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);

		let newUser = await pool.query(
			"INSERT INTO dungeon_master (dm_name, dm_email, dm_password) VALUES ($1, $2, $3) RETURNING *",
			[name, email, bcryptPassword]
		);

		const jwtToken = jwtGenerator(newUser.rows[0].dm_id);
		return res.json({ jwtToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/login", validInfo, async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await pool.query(
			"SELECT * FROM dungeon_master WHERE dm_email = $1",
			[email]
		);

		if (user.rows.length === 0) {
			return res.status(401).json("Invalid Credential");
		}

		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].dm_password
		);

		if (!validPassword) {
			return res.status(401).json("Invalid Credential");
		}
		const jwtToken = jwtGenerator(user.rows[0].dm_id);
		return res.json({ jwtToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/verify", authorize, (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
