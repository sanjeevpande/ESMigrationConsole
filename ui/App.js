import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';

import TenantSelect from './TenantSelect';

function App() {
	
	let [tenants, setTenants] = useState([]);

	const makeReindexCall = (indexType) => {
		if(!tenants.length) {
			return;
		}
		fetch('reindex', {
			method: 'POST',
			headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify({tenants, indexType})
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log('Created Gist:', data.html_url);
		});
	}

  	return (
	    <div className="App">
	    	<PageHeader>
				ES Migration Console
			</PageHeader>
			<div style={{marginTop: '40px'}}>
				<div style={{width: '40%', marginBottom: '20px'}}>
		    		<TenantSelect setTenants={setTenants} />
		    	</div>
		    	<ButtonGroup appearance="primary">
			    	<Button onClick={() => {
			    		makeReindexCall('execution')
			    	}}>Reindex Executions</Button>
			    	<Button onClick={() => {
			    		makeReindexCall('project')
			    	}}>Reindex Projects</Button>
			    	<Button onClick={() => {
			    		makeReindexCall('version')
			    	}}>Reindex Versions</Button>
			    </ButtonGroup>
			</div>
	    </div>
  	);
}

export default App;
