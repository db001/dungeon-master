const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../database/db");

// All campaigns and name
router.get("/campaigns", authorize, async (req, res) => {
	try {
		// get campaign name and for a specified user id
		const user = await pool.query(
			"SELECT u.dm_name, u.dm_id, t.campaign_name, t.campaign_id FROM dungeon_master AS u LEFT JOIN campaigns AS t ON u.dm_id = t.dm_id WHERE u.dm_id = $1",
			[req.user.id]
		);

		res.json(user.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
