'use strict';

var restler = require('restler');

var tenantSearchRequest = (input) => {
	return {
		"query": {
			"bool": {
			  "must": [
			    {
			      "prefix": {
			        "tId": input
			      }
			    }
			  ]
			}
		},
		"aggregations": {
		    "tenantId": {
		      "terms": {
		        "field": "tId"
		      }
		    }
		}
	}	
}

var tenantSearch = function(req, res) {
	
	var tenantId = req.body.input;
	var source = req.body.source;

	if(!tenantId) {
		res.send('Tenant id not found');
	}
	var searchRequest = tenantSearchRequest(tenantId);

	restler.post(source + '/zfj-tenants/_search', {
		headers: {
		    'Accept': 'application/json, text/plain, */*',
		    'Content-Type': 'application/json'
		},
		data: JSON.stringify(searchRequest)
	}).on('complete', function(data, response) {
		var tenants = data.aggregations && data.aggregations.tenantId && data.aggregations.tenantId.buckets || [];
		tenants = tenants.map((tenant) => {
			return {
				label: tenant.key,
				value: tenant.key
			};
		});
		res.send(tenants);
	});
}

module.exports = tenantSearch;