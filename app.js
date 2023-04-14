const express = require('express');
const app = express();
app.use(express.json());

const usersRouter = require('./router/usersRouter')
app.use('/users', usersRouter);

const port = 3000;

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})