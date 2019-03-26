import React, { useState } from 'react';
import './App.css';

import { Query } from "react-apollo";

import Gantt from './components/gantt'
import Navbar from './components/navbar'

import {
	GET_MILESTONES
} from './queries';

function App (props) {
	const [userToken,  setUserToken] = useState(null);

	return (
		<div className="App">
			<Navbar/>
			<Query query={GET_MILESTONES}>
				{({ loading, error, data }) => {
					if (loading) return "Loading...";
					if (error) return `Error! ${error.message}`;

					return (
						<Gantt
							repositories={data.viewer.repositories}
						/>
					);
				}}
			</Query>
		</div>
	);
}

export default App;