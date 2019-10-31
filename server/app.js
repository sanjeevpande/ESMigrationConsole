const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const path = require('path')
const bodyParser = require('body-parser')
const reIndex = require('./reIndex');
const tenantSearch = require('./tenantSearch');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => res.sendFile('index.html'));

app.post('/tenantSearch', (req, res) => {
	tenantSearch(req, res);
});

app.post('/reindexAll', (req, res) => {
	reIndex.allTenants(req, res);
});

app.post('/reindex', (req, res) => {
	reIndex.perTenant(req, res);
});

app.get('/tenantStatus', (req, res) => {
	reIndex.getTenantStatus(req, res);
});

app.post('/ongoingReindexStatus', (req, res) => {
	reIndex.getOngoingReindexStatus(req, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))