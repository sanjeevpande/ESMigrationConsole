'use strict';

var restler = require('restler');

var reindexRequest = (tenantId, indexType) => {
	return {
		"source": {
			"remote": {
		 		"host": "http://localhost:9600"
			},
			"index": "index4",
			"query": {
				"bool": {
				  "must": [
				    {
				      "match": {
				        "_type": indexType
				      }
				    },
				    {
				      "match": {
				        "tId": tenantId
				      }
				    }
				  ]
				}
			}
		},
		"dest": {
			"index": "index7"
		},
		"script": {
			"source": "ctx._source.zfjIndexType = '" + indexType + "'"
		}
	}	
}

var reIndex = function(req, res) {
	
	var tenants = req.body.tenants;
	var indexType = req.body.indexType;

	if(!tenants.length) {
		res.send('Tenant id not found');
	}
	tenants.forEach((tenant) => {
		
		var tenantId = tenant.value;

		var reindexData = reindexRequest(tenantId, indexType);

		res.send(JSON.stringify(reindexData));
		return;

		restler.post('http://localhost:9200/_reindex', {
			headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			},
			data: JSON.stringify(reindexData)
		}).on('complete', function(data, response) {
			res.send('Reindex completed');
		});
	});
}

module.exports = reIndex;