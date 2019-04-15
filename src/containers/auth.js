import { useState, useEffect } from 'react';

export default function Auth (props) {

	let [token, setToken] = useState(null);

	useEffect(() => {
		let tox = getTokenFromEnv();
		if (!tox) tox = getTokenFromUrl();
		if (!tox) tox = getTokenFromLocalStorage();

		setToken(tox);
	}, []);

	return props.children(token);
}

function getTokenFromEnv() {
	return process.env.REACT_APP_GITHUB_TOKEN
}

function getTokenFromUrl () {
	let usp = new URLSearchParams(window.location.search)
	let access_token = usp.get('access_token');

	return access_token;
}
function getTokenFromLocalStorage () {
	return null;
}
