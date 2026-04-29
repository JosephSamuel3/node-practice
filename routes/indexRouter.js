// routes/indexRouter.js
const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.send("You are at index.html"));
indexRouter.get("/about", (req, res) => res.send("You are at about.html"));
indexRouter.get("/contact", (req, res) => res.send("You are at contact.html"));
indexRouter.post("/contact", (req, res) => res.send("You have successfully post to contact.html"));

module.exports = indexRouter;