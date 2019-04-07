import React from 'react';
import 'App.css';

import Auth from 'containers/auth'

import Home from 'views/Home';
import Welcome from 'views/Welcome';

function App (props) {
	return (
		<Auth>
			{(token) => {
				if (token) return <Home token={token}/>;
				return <Welcome/>;
			}}
		</Auth>
	);
}

export default App;