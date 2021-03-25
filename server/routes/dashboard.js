const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../database/db");

// All campaigns and name
router.get("/", authorize, async (req, res) => {
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

// Create a campaign, using authorize middleware
router.post("/campaigns", authorize, async (req, res) => {
	try {
		const { campaignName } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO campaigns (dm_id, campaign_name) VALUES ($1, $2) RETURNING *",
			[req.user.id, campaignName]
		);

		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// Update a campaign
router.put("/campaigns/:id", authorize, async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updateCampaign = await pool.query(
			"UPDATE campaigns SET campaign_name = $1 WHERE campaign_id = $2 AND dm_id = $3 RETURNING *",
			[description, id, req.user.id]
		);

		if (updateCampaign.rows.length === 0) {
			return res.json("This campaign is not yours");
		}

		res.json("Campaign was updated");
	} catch (err) {
		console.error(err.message);
	}
});

// Delete a campaign
router.delete("/campaigns/:id", authorize, async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query(
			"DELETE FROM campaigns WHERE campaign_id = $1 AND dm_id = $2 RETURNING *",
			[id, req.user.id]
		);

		if (deleteTodo.rows.length === 0) {
			return res.json("This campaign is not yours");
		}

		res.json("Campaign was deleted");
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
