const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const cors = require("cors");

require("./services/passport");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookie.key],
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

// app.use("/authentication", require("./routes/jwtAuth"));

// app.use("/dashboard", require("./routes/dashboard"));
// app.use("/campaigns", require("./routes/campaigns"));

app.listen(5000, () => {
	console.log(`Server is starting on port 5000`);
});
