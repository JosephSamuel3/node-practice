//server.js
const express = require('express');
const path = require("node:path");
const bookRouter = require('./routes/bookRouter');
const authorRouter = require('./routes/authorRouter');
const indexRouter = require("./routes/indexRouter")

const app = express();
const port = 3000;

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/', indexRouter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use((req, res, next) => {
  throw new Error("OH NO!");
  // or next(new Error("OH NO!"));
});

app.use((err, req, res, next) => {
  console.error(err);
  // You will see an OH NO! in the page, with a status code of 500 that can be seen in the network tab of the dev tools
  res.status(err.statsCode ||500).send(err.message);
});
