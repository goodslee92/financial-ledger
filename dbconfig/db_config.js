const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const mysql = require('mysql');
const cors = require('cors');
const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const db = mysql.createPool({
    host : 'svc.sel5.cloudtype.app',
    port: 30416,
    user : 'root',
    password : '!Jaehwa3021',
    database : 'fl',
    // connectionLimit: 5,
    // connectTimeout: 30000,
    // acquireTimeout: 10000
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('연결 되었습니다.')
});

// 자산 사용 내역 조회.
app.post('/api/moneyTblInfo', (req, res) => {
    console.log('get moneyTablInfo Called..');
    const user_id = req.body.id;
    console.log('user_id : ' + user_id);
    const sqlQuery = "SELECT DATE_FORMAT(USE_DATE, '%Y-%m-%d') as USE_DATE, AMOUNT, IO_TYPE FROM money WHERE user_id = ? ORDER BY use_date";
    
    db.query(sqlQuery, [user_id] ,(err, data) => {
        if (err) {
            console.log('err');
            res.send(err);
        } else {
            console.log('success');
            res.send(data);
        }
    });
});

// 로그인 유저 정보 조회.
app.post('/api/loginMemberInfo', (req, res) => {
    console.log('get loginMemberInfo Called..');
    const user_id = req.body.id;
    console.log('user_id : ' + user_id);
    const sqlQuery = "SELECT user_id, user_pw, user_name FROM member WHERE user_id = ?"

    db.query(sqlQuery, [user_id], (err, data) => {
        if (err) {
            console.log('err');
            res.send(err);
        } else {
            console.log('success');
            res.send(data);
        }
    });
});

// 회원가입 정보 삽입.
app.post('/api/registerAccount', (req, res) => {
    console.log('post registerAccount Called..');
    const user_id = req.body.id;
    const user_pw = req.body.password;
    const user_name = req.body.name;
    console.log("user_id : " + user_id + ", user_pw : " + user_pw + ", user_name : " + user_name);

    const sqlQuery = "INSERT INTO member (user_id, user_pw, user_name) VALUES (?, ?, ?)";
    db.query(sqlQuery, [user_id, user_pw, user_name], (err, data) => {
        if(err) {
            console.log('err');
            res.send(err);
        } else {
            console.log('success');
            res.send(data);
        }
    });
});

// 내역 추가.
app.post('/api/addNewItem', (req, res) => {
    console.log('post addNewItem Called..');
    const user_id = req.body.user_id
    const amount = req.body.amount;
    const use_date = req.body.use_date;
    const title = req.body.title;
    const io_type = req.body.io_type;
    console.log("user_id : " + user_id + ", amount : " + amount + ", use_date : " + use_date
        + ", title : " + title + ", io_type : " + io_type);

    const sqlQuery = "INSERT INTO money (user_id, amount, use_date, title, io_type) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlQuery, [user_id, amount, use_date, title, io_type], (err, data) => {
        if(err) {
            console.log('err');
            res.send(err);
        } else {
            console.log('success');
            res.send(data);
        }
    });
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
});