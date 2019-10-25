'use strict';

import React from 'react';
import { AsyncSelect } from '@atlaskit/select';

const tenants = [
  { label: 'a024a968-3f4a-3647-a09b-961d15c42233', value: 'a024a968-3f4a-3647-a09b-961d15c42233', extra: 'extra1' }
];

const filterTenants = (inputValue) =>
  tenants.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));

const promiseOptions = inputValue =>
	new Promise(resolve => {
		setTimeout(() => {
		  resolve(filterTenants(inputValue));
		}, 1000);
	});

function TenantSelect(props) {
	const onTenantSelect = (item) => {
		props.setTenants(item);
	}
	return (
		<AsyncSelect
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
