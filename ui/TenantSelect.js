'use strict';

import React from 'react';
import { AsyncSelect } from '@atlaskit/select';

const tenants = [
  { label: '494da344-d098-3782-893b-04cea8a7265c', value: '494da344-d098-3782-893b-04cea8a7265c', extra: 'extra1' }
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
