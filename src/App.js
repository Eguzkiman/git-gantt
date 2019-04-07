import React from 'react';
import './App.css';

import { Query } from "react-apollo";

import Gantt from './components/gantt'
import Navbar from './components/navbar'
import Auth from './containers/auth'

import {
	GET_MILESTONES
} from './queries';

function App (props) {

	return (
		<Auth>
			{(token) => {
				if (token) return <AuthenticatedView token={token}/>;
				return <UnauthenticatedView/>;
			}}
		</Auth>
	);
}

let UnauthenticatedView = () => (
	<div>
		<Navbar/>
		<p>Sign in to continue</p>
	</div>
);

let AuthenticatedView = (props) => {
	let context = {
		headers: {
			Authorization: `Bearer ${props.token}`
		}
	}
	return (
		<Query query={GET_MILESTONES} context={context}>
			{({ loading, error, data }) => {
				if (loading) return (
					<div>
						<Navbar/>
						<p>Loading...</p>
					</div>
				);

				if (error) return (
					<div>
						<Navbar/>
						<p>{String(error)}</p>
					</div>

				)
					
				return (
					<div>
						<Navbar currentUser={data.viewer}/>
						<Gantt
							repositories={data.viewer.repositories}
						/>
					</div>
				);
			}}
		</Query>
	);
}

export default App;