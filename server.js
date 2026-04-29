//server.js
const express = require('express');
const bookRouter = require('./routes/bookRouter');
const authorRouter = require('./routes/authorRouter');
const indexRouter = require("./routes/indexRouter")

const app = express();
const port = 3000;

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
