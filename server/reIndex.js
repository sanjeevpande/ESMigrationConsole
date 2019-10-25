'use strict';

var restler = require('restler');

var reindexRequest = (tenantId, indexType, source) => {
	return {
		"source": {
			"remote": {
		 		"host": source
			},
			"index": "zfj-tenants",
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
			"index": "zfj-tenants"
		},
		"script": {
			"source": "ctx._source.zfjIndexType = '" + indexType + "'"
		}
	}	
}

var reIndex = function(req, res) {
	
	var tenants = req.body.tenants;
	var indexType = req.body.indexType;
	var source = req.body.source;
	var dest = req.body.destination;

	if(!tenants.length) {
		res.send('Tenant id not found');
	}
	tenants.forEach((tenant) => {
		
		var tenantId = tenant.value;

		var reindexData = reindexRequest(tenantId, indexType, source);

		restler.post(dest + '/_reindex', {
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