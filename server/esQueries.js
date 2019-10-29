'use strict';

var esQueries = {

	allTenantsRequest: (indexType, source, sourceIndex, destinationIndex) => {
		return {
			"source": {
				"remote": {
			 		"host": source
				},
				"index": sourceIndex,
				"query": {
					"bool": {
					  "must": [
					    {
					      "match": {
					        "_type": indexType
					      }
					    }
					  ]
					}
				}
			},
			"dest": {
				"index": destinationIndex
			},
			"script": {
				"source": "ctx._source.zfjIndexType = '" + indexType + "'"
			}
		}	
	},

	oneTenantRequest: (tenantId, indexType, source, sourceIndex, destinationIndex) => {
		return {
			"source": {
				"remote": {
			 		"host": source
				},
				"index": sourceIndex,
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
				"index": destinationIndex
			},
			"script": {
				"source": "ctx._source.zfjIndexType = '" + indexType + "'"
			}
		}	
	}
}

module.exports = esQueries;