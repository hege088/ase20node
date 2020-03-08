import express from 'express';
import { Pool } from 'pg';
import bodyParser from "body-parser";


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});
const app = express();
const port = 3000;
app.use(bodyParser.json())
app.get('/', async (req, res) => {
    try {
        const now = await pool.query('SELECT * from NOW()');
        res.send(now.rows[0].now);
    } catch (err) {
        console.log(err.stack)
    }
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
