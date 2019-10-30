'use strict';

var restler = require('restler');
var esQueries = require('./esQueries');

var allTenantsStatus = {};
var recordNo = 0;

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

			var record = 'record' + recordNo++;

			allTenantsStatus[record] = {
				status: 'inprogress',
				tenantId,
				indexType
			};

			var reindexData = esQueries.oneTenantRequest(tenantId, indexType, source, sourceIndex, destinationIndex);

			var headers = {
		        'Content-Type': 'application/json'
		    };

		    var _data = JSON.stringify(reindexData);

			restler.post(dest + '/_reindex', {
				'headers': headers,
				'data': _data
			}).on('complete', function(data, response) {
				//
				if(response.statusCode == 200 || response.statusCode == 201) {
					allTenantsStatus[record].status = 'success';
				} else {
					allTenantsStatus[record].status = 'moved';
				}
			});
		});
		res.send(JSON.stringify(allTenantsStatus));
	},
	getTenantStatus: (req, res) => {
		res.send(JSON.stringify(allTenantsStatus));
	},
	getTaskStatus: (req, res) => {
		//
		var dest = req.body.destination;
		restler.get(dest + '/_tasks?detailed=true&actions=*reindex').on('complete', function(data, response) {
			res.send(JSON.stringify({data, wipTenants, completedTenants, failedTenants}));
		});
	}
};

module.exports = reIndex;