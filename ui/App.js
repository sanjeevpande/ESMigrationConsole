import React, { useState, useEffect } from 'react';
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
import RefreshIcon from '@atlaskit/icon/glyph/refresh';
import { Checkbox } from '@atlaskit/checkbox';

function App() {

	let tenantDefaultValue = [{
		label: '494da344-d098-3782-893b-04cea8a7265c',
		value: '494da344-d098-3782-893b-04cea8a7265c'
	}, {
		label: '249da344-d098-3782-893b-04cea8a7265c',
		value: '249da344-d098-3782-893b-04cea8a7265c'
	}];
	
	let [tenants, setTenants] = useState(tenantDefaultValue);
	let [source, setSource] = useState('http://localhost:9600');
	let [destination, setDestination] = useState('http://localhost:9200');
	let [sourceIndex, setSourceIndex] = useState('index4');
	let [destinationIndex, setDestinationIndex] = useState('index7');
	let [rows, setRows] = useState([]);
	let [isPanelOpen, setIsPanelOpen] = useState(false);
	let [selectAllTenants, setSelectAllTenants] = useState(false);
	let [rightPanelData, setRightPanelData] = useState({});

	useEffect(() => {
		refreshStatus();
	}, []);

	const handlePanelOpen = () => {
		setIsPanelOpen(true);
	}

	const closePanel = () => {
		setIsPanelOpen(false);
	}

	const getLozengesColor = (indexType) => {
		return (indexType === 'execution') ? 'success' : ( (indexType === 'project') ? 'moved' : 'new');
	}

	const onAllTenantSelect = (ev) => {
		setSelectAllTenants(ev.target.checked);
	}

	const reIndexAll = (indexType) => {
		fetch('reindexAll', {
			method: 'POST',
			headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify({indexType, source, destination, sourceIndex, destinationIndex})
		}).then(function(response) {
			return response.json();
		}).then(function(res) {
			handleTenantResponse(res);
		});
	}

	const reIndexPerTenant = (indexType) => {
		if(!tenants.length) {
			return;
		}
		fetch('reindex', {
			method: 'POST',
			headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify({tenants, indexType, source, destination, sourceIndex, destinationIndex})
		}).then(function(response) {
			return response.json();
		}).then(function(res) {
			handleTenantResponse(res);
		});
	}

	const GridCaption = () => {
		return (
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<div>
					<label style={{fontSize: '1.4em'}}>Ongoing status</label>
				</div>
				<div>
		    		<ButtonGroup appearance="warning">
				    	<Button onClick={refreshStatus}>Check Tenant Status</Button>
				    	<Button onClick={checkOngoingReindexStatus}>Check Ongoing Reindexes</Button>
				    </ButtonGroup>
				</div>
			</div>
		);
	}

	const handleTenantResponse = (res) => {
		let _rows = [];
		for(let record in res) {
			let obj = res[record];
			let appearance = getLozengesColor(obj.indexType);
			_rows.push({
				cells: [
					{
						key: obj.tenantId,
						content: obj.tenantId
					},
					{
						key: 'indexType',
						content: (<Lozenge appearance={appearance}>{obj.indexType}</Lozenge>)
					},
					{
						key: 'status',
						content: (<Lozenge appearance={obj.status}>{obj.status}</Lozenge>)
					}
				]
			});
		}
		setRows(_rows);
	}

	const checkOngoingReindexStatus = () => {
		fetch('ongoingReindexStatus', {
			method: 'POST',
			headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify({destination})
		}).then(function(response) {
			return response.json();
		}).then(function(res) {
			handleTenantResponse(res.allTenantsStatus);
			setRightPanelData(res.data.nodes);
			setIsPanelOpen(true);
		});
	}

	const refreshStatus = () => {
		fetch('tenantStatus', {
			method: 'GET'
		}).then(function(response) {
			return response.json();
		}).then(function(res) {
			handleTenantResponse(res);
		});
	}
	
	const makeReindexCall = (indexType) => {
		if(selectAllTenants) {
			reIndexAll(indexType);
		} else {
			reIndexPerTenant(indexType);
		}
	}

  	return (
	    <div className="App">
	    	<RightPanel data={rightPanelData} isOpen={isPanelOpen} closePanel={closePanel} />
	    	<PageHeader>
				ES Migration Console
				<img style={{marginLeft: '5px', marginTop: '-12px', position: 'absolute'}} width="40px" height="40px" src="./baba.svg" />
			</PageHeader>
			<div style={{width: '75%', marginTop: '40px'}}>
				<div style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between'}}>
					<div style={{flexBasis: '49%'}} className="source">
						<label htmlFor="source">Source URL</label>
			        	<Textfield onChange={(ev) => {
			        		setSource(ev.target.value);
			        	}} name="source" placeholder="Source" value={source} />
					</div>
					<div style={{flexBasis: '49%'}} className="dest">
						<label htmlFor="dest">Destination URL</label>
			        	<Textfield onChange={(ev) => {
			        		setDestination(ev.target.value);
			        	}} name="dest" placeholder="Destination" value={destination} />
					</div>
				</div>
				<div style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between'}}>
					<div style={{flexBasis: '49%'}} className="source">
						<label htmlFor="source">Source Index</label>
			        	<Textfield onChange={(ev) => {
			        		setSourceIndex(ev.target.value);
			        	}} name="sourceIndex" placeholder="Source Index" value={sourceIndex} />
					</div>
					<div style={{flexBasis: '49%'}} className="dest">
						<label htmlFor="dest">Destination Index</label>
			        	<Textfield onChange={(ev) => {
			        		setDestinationIndex(ev.target.value);
			        	}} name="destIndex" placeholder="Destination Index" value={destinationIndex} />
					</div>
				</div>
				<div style={{marginBottom: '20px'}} className={selectAllTenants ? 'disabled' : ''}>
		    		<TenantSelect tenantDefaultValue={tenantDefaultValue} source={source} sourceIndex={sourceIndex} setTenants={setTenants} />
		    	</div>
		    	<div style={{marginBottom: '20px', float: 'right', display: 'flex', alignItems: 'center'}}>
		    		<div style={{marginRight: '8px'}}>
		    			<Checkbox
				          value="selectAllTenants"
				          label="Select all Tenants"
				          onChange={onAllTenantSelect}
				          name="checkbox-basic"
				        />
		    		</div>
		    		<div>
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
					    	<Button onClick={() => {
					    		makeReindexCall('component')
					    	}}>Reindex Components</Button>
					    </ButtonGroup>
					</div>
		    	</div>
			    <div className="status-table" style={{marginBottom: '20px', marginTop: '60px'}}>
			    	<DynamicTable
			          caption={<GridCaption />}
			          head={head}
			          rows={rows}
			        />
			    </div>
			</div>
	    </div>
  	);
}

export default App;
