'use strict';

var restler = require('restler');
var esQueries = require('./esQueries');

var reIndex = {
	allTenants: (req, res) => {
		var indexType = req.body.indexType;
		var source = req.body.source;
		var dest = req.body.destination;
		var sourceIndex = req.body.sourceIndex;
		var destinationIndex = req.body.destinationIndex;

		var reindexData = esQueries.allTenantsRequest(indexType, source, sourceIndex, destinationIndex);

		var headers = {
	        'Content-Type': 'application/json'
	    };

	    var _data = JSON.stringify(reindexData);

		restler.post(dest + '/_reindex', {
			'headers': headers,
			'data': _data
		}).on('complete', function(data, response) {
			res.send(JSON.stringify({data}));
		});
	},
	perTenant: (req, res) => {
		var tenants = req.body.tenants;
		var indexType = req.body.indexType;
		var source = req.body.source;
		var dest = req.body.destination;
		var sourceIndex = req.body.sourceIndex;
		var destinationIndex = req.body.destinationIndex;

		if(!tenants.length) {
			res.send('Tenant id not found');
		}
		tenants.forEach((tenant) => {
			
			var tenantId = tenant.value;

			var reindexData = esQueries.oneTenantRequest(tenantId, indexType, source, sourceIndex, destinationIndex);

			var headers = {
		        'Content-Type': 'application/json'
		    };

		    var _data = JSON.stringify(reindexData);

			restler.post(dest + '/_reindex', {
				'headers': headers,
				'data': _data
			}).on('complete', function(data, response) {
				res.send(JSON.stringify({data}));
			});
		});
	}
};

module.exports = reIndex;