import React from 'react';
import { AsyncSelect } from '@atlaskit/select';

function TenantSelect(props) {
	const onTenantSelect = (item) => {
		props.setTenants(item);
	}

	let tenants = [];

	const filterTenants = (data) =>
	  tenants = data;

	const promiseOptions = inputValue =>
		new Promise(resolve => {
			if(!inputValue) {
				resolve(filterTenants([]));
				return;
			}
			fetch('tenantSearch', {
				method: 'POST',
				headers: {
				    'Accept': 'application/json, text/plain, */*',
				    'Content-Type': 'application/json'
				},
				body: JSON.stringify({input: inputValue, source: props.source, sourceIndex: props.sourceIndex})
			}).then(function(response) {
				return response.json();
			}).then(function(data) {
				resolve(filterTenants(data));
			});
		});

	return (
		<AsyncSelect
			defaultValue={props.tenantDefaultValue}
			options={tenants}
			onChange={(item) => onTenantSelect(item)}
			isMulti
			cacheOptions
			defaultOptions
			loadOptions={promiseOptions}
			placeholder='Select a Tenant'
		/>
	);
};

export default TenantSelect;
