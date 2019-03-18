import React, { Component } from 'react';
import './App.css';

import { Query } from "react-apollo";

import Gantt from './components/gantt'

import {
	GET_MILESTONES
} from './queries';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Query query={GET_MILESTONES}>
					{({ loading, error, data }) => {
						if (loading) return "Loading...";
						if (error) return `Error! ${error.message}`;

						return (
							<div>
							<h1>Hello {data.viewer.name}</h1>
							<Gantt
								repositories={data.viewer.repositories}
							/>
							</div>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default App;