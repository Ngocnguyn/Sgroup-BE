const express = require('express');
const app = express();
const db = require("./database/connection");
const usersRouter = require('./router/usersRouter');
const userValidate = require('./middlewares/userValidate');

app.use(express.json());
app.use('/users', usersRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
