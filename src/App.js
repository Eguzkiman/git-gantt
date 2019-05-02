import React from 'react';
import {StoreContext} from 'redux-react-hook';

import 'App.css';

import store from 'store';

import Auth from 'containers/auth'

import Home from 'views/Home';
import Welcome from 'views/Welcome';

function App (props) {
	return (
		<StoreContext.Provider value={store}>
			<Auth>
				{(token) => {
					if (token) return <Home token={token}/>;
					return <Welcome/>;
				}}
			</Auth>
		</StoreContext.Provider>
	);
}

export default App;