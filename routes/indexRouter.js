// routes/indexRouter.js
const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", {
    message: "EJS rocks!",
    links: [
      { href: "/", text: "Home" },
      { href: "about", text: "About" },
    ],
  });
});
indexRouter.get("/about", (req, res) => res.send("You are at about.html"));
indexRouter.get("/contact", (req, res) => res.send("You are at contact.html"));
indexRouter.post("/contact", (req, res) => res.send("You have successfully post to contact.html"));

module.exports = indexRouter;