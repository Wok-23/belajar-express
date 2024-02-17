const express = require('express');
const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

//syntax ejs
app.set('view engine', 'ejs');

//Syntak untuk menginisiai method POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//syntak untuk menginisiasi folder routers
app.use('/', router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app };
