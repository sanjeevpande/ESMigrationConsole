import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import DynamicTable from '@atlaskit/dynamic-table';
import Lozenge from '@atlaskit/lozenge';

import { caption, head } from './TableConstants';

import TenantSelect from './TenantSelect';

function App() {
	
	let [tenants, setTenants] = useState([]);
	let [source, setSource] = useState('http://localhost:9600');
	let [destination, setDestination] = useState('http://localhost:9200');
	let [rows, setRows] = useState([]);

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
			body: JSON.stringify({tenants, indexType, source, destination})
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log('Created Gist:', data.html_url);
		});

		let _rows = [];

		let appearance = (indexType === 'execution') ? 'success' : ( (indexType === 'project') ? 'moved' : 'new');

		tenants.forEach((tenant) => {
			_rows.push({
				cells: [
					{
						key: tenant.value,
						content: tenant.value
					},
					{
						key: 'indexType',
						content: (<Lozenge appearance={appearance}>{indexType}</Lozenge>)
					},
					{
						key: 'checkStatus',
						content: 'checkStatus'
					},
					{
						key: 'cancel',
						content: 'cancel'
					},
				]
			});
		});
		setRows(_rows);
	}

  	return (
	    <div className="App">
	    	<PageHeader>
				ES Migration Console
			</PageHeader>
			<div style={{marginTop: '40px'}}>
				<div style={{width: '40%', marginBottom: '20px', display: 'flex', justifyContent: 'space-between'}}>
					<div style={{flexBasis: '49%'}} className="source">
						<label htmlFor="source">Source</label>
			        	<Textfield onChange={setSource} name="source" placeholder="Source" value={source} />
					</div>
					<div style={{flexBasis: '49%'}} className="dest">
						<label htmlFor="dest">Destination</label>
			        	<Textfield onChange={setDestination} name="dest" placeholder="Destination" value={destination} />
					</div>
				</div>
				<div style={{width: '40%', marginBottom: '20px'}}>
		    		<TenantSelect source={source} setTenants={setTenants} />
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
			    <div style={{width: '80%', marginTop: '40px'}}>
			    	<DynamicTable
			          caption={caption}
			          head={head}
			          rows={rows}
			        />
			    </div>
			</div>
	    </div>
  	);
}

export default App;
