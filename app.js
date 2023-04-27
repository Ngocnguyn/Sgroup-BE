import 'dotenv/config';
import routers from './api/index.js';
import express from 'express';
const app = express();

app.use(express.json());
app.use('/',routers);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
