import React from 'react';
import { Provider } from 'react-redux'

import 'App.css';

import store from 'store';

import Auth from 'containers/auth'

import Home from 'views/Home';
import Welcome from 'views/Welcome';

function App (props) {
	return (
		<Provider store={store}>
			<Auth>
				{(token) => {
					if (token) return <Home token={token}/>;
					return <Welcome/>;
				}}
			</Auth>
		</Provider>
	);
}

export default App;