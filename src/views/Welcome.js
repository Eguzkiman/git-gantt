import React from 'react';
import Navbar from 'components/navbar';

const SIGN_IN_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo user`;

export default function Welcome () {
	return (
		<div>
			<Navbar/>
			<button onClick={() => window.location.href = SIGN_IN_URL }>
				Sign in with GitHub
			</button>
		</div>
	);
}
