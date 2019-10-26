import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import DynamicTable from '@atlaskit/dynamic-table';
import Lozenge from '@atlaskit/lozenge';
import RightPanel from './RightPanel';
import { caption, head } from './TableConstants';
import TenantSelect from './TenantSelect';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';

function App() {
	
	let [tenants, setTenants] = useState([]);
	let [source, setSource] = useState('http://localhost:9600');
	let [destination, setDestination] = useState('http://localhost:9200');
	let [rows, setRows] = useState([]);
	let [isPanelOpen, setIsPanelOpen] = useState(false);

	const handlePanelOpen = () => {
		setIsPanelOpen(true);
	}

	const closePanel = () => {
		setIsPanelOpen(false);
	}
	
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

		let appearance = (indexType === 'execution') ? 'success' : ( (indexType === 'project') ? 'moved' : 'new');

		let _rows = [];

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
						content: (<div onClick={handlePanelOpen}><Page24Icon /></div>)
					},
					{
						key: 'cancel',
						content: (<div style={{color: '#BF2600'}}><CrossCircleIcon /></div>)
					}
				]
			});
		});

		setRows(rows.concat(_rows));
	}

  	return (
	    <div className="App">
	    	<RightPanel isOpen={isPanelOpen} closePanel={closePanel} />
	    	<PageHeader>
				ES Migration Console
			</PageHeader>
			<div style={{width: '75%', marginTop: '40px'}}>
				<div style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between'}}>
					<div style={{flexBasis: '49%'}} className="source">
						<label htmlFor="source">Source</label>
			        	<Textfield onChange={(ev) => {
			        		setSource(ev.target.value);
			        	}} name="source" placeholder="Source" value={source} />
					</div>
					<div style={{flexBasis: '49%'}} className="dest">
						<label htmlFor="dest">Destination</label>
			        	<Textfield onChange={(ev) => {
			        		setDestination(ev.target.value);
			        	}} name="dest" placeholder="Destination" value={destination} />
					</div>
				</div>
				<div style={{marginBottom: '20px'}}>
		    		<TenantSelect source={source} setTenants={setTenants} />
		    	</div>
		    	<div style={{marginBottom: '20px', float: 'right'}}>
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
			    <div className="status-table" style={{marginBottom: '20px', marginTop: '60px'}}>
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
