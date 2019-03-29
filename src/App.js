import React, { useState, useEffect } from 'react';
import './App.css';

import { Query } from "react-apollo";

import Gantt from './components/gantt'
import Navbar from './components/navbar'
import Auth from './containers/auth'

import {
	GET_MILESTONES
} from './queries';

function App (props) {
	
	let [error, setError] = useState(null);
	let [token, setToken] = useState(null);

	useEffect(() => {
		let tox = getTokenFromUrl();
		if (!tox) tox = getTokenFromLocalStorage();

		setToken(tox);
	}, []);

	if (token) return <AuthenticatedView token={token}/>;
	if (error) return <ErrorView error={error}/>;
	return <UnauthenticatedView/>;

	// return (
	// 	<Auth>
	// 		{({loading, error, data}) => {
	// 			if (error) return <ErrorView error={error}/>;
	// 			if (loading) return <LoadingView/>;

	// 			return <p>{JSON.stringify(data)}</p>
	// 		}}
	// 	</Auth>
	// );
	
	// let unauthenticatedView = (
	// 	<div>
	// 		<AuthProvider>
	// 			{view}
	// 		</AuthProvider>
	// 		<Navbar/>
	// 		<p>authenticating...</p>
	// 	</div>
	// );

	// let view = isAuthenticating ? unauthenticatedView : authenticatedView;

	// return (
	// 	<div className="App">
	// 		{view}
	// 	</div>
	// );
}

let UnauthenticatedView = () => (
	<div>
		<Navbar/>
		<p>Sign in to continue</p>
	</div>
);

let ErrorView = (props) => (
	<div>
		<Navbar/>
		<p>Error! {props.error}</p>
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
				if (loading) return <p>Loading...</p>;

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

function getTokenFromLocalStorage () {
	return null;
}

function getTokenFromUrl () {
	let usp = new URLSearchParams(window.location.search)
	let access_token = usp.get('access_token');

	return access_token;
}

export default App;