const express = require("express");
const path = require("path");
var fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

/* ---------- Controllers START ---------- */
const userController = require("./controllers/user/user_controller");
const sentimentAnalyzercontroller = require("./controllers/sentimentAnalyzer/sentimentAnalyzer_controller");

/* ---------- Controllers END ---------- */

// middleware setup
app.use(morgan("dev"));
app.use(
	morgan("common", {
		// log all requests to .log files
		stream: fs.createWriteStream(
			path.join(__dirname, `logs/${process.env.NODE_ENV}.log`)
		),
	})
);
app.use(cors());

/* ----- Routes START ----- */
app.get("/", (req, res) => {
	return res.json({ message: "Welcome to Hackathon..." });
});

// Menu
app.use("/api/user", userController);
app.use("/api/s-analyzer", sentimentAnalyzercontroller);

/* ----- Routes END ----- */

module.exports = app;
