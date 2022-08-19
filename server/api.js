const express = require('express');
const app = express();
const mysqlConfig = require('./mysql');
const mysql = require('mysql');
app.use(express.json());

const books = [
    { id: 1, name: 'book1' },
    { id: 2, name: 'book2' },
    { id: 3, name: 'book3' },
];

app.get('/', (req, res) => {
    res.end('Hello World!');
});
//获取所有书籍
app.get('/api/books', (req, res) => {
    connection.connect();
    let sql = 'SELECT * FROM country';
    let str = '';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]：', err.message);
            res.json(str).end();
        }
        console.log(result);
        res.json(result).end();
    })
});
//获取特定id的书籍
app.get('/api/books/:id', (req, res) => {
    let book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ msg: 'The book with the given ID not find.' });
    res.json(book).end();
});
const connection = mysql.createConnection(mysqlConfig);
//用参数与数据库进行连接
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
