const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const bodyParser = require('body-parser')
const reIndex = require('./reIndex');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => res.sendFile('index.html'));

app.post('/reindex', (req, res) => {
	reIndex(req, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))