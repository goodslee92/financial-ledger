const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const mysql = require('mysql');
const cors = require('cors');
const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const db = mysql.createPool({
    host : 'svc.sel5.cloudtype.app',
    port: 30416,
    user : 'root',
    password : '!Jaehwa3021',
    database : 'fl'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('연결 되었습니다.')
});

app.get('/api/moneyTblInfo', (req, res) => {
    console.log('ㅅㅂ백엔드');
    db.query("SELECT * FROM money", (err, data) => {
        if (err) {
            console.log('err');
            res.send(err);
        } else{
            console.log('success');
            res.send(data);
        }
    });
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
});