import { useState, useEffect } from 'react';

import fetcher from 'fetcher';

export default function Auth (props) {

	const initialToken = getTokenFromLocalStorage();

	let [loading, setLoading] = useState(true);
	let [error, setError] = useState(null);
	let [data, setData] = useState({});

	useEffect(() => {
		if (!initialToken) {
			setLoading(true);
			let code = getCodeFromUrl();
			let redirectUri = window.location.host;
			
			fetcher.getGithubAccessToken(code)
				.then(res => {
					let data = res.data;
					if (data.access_token)
						setData(data);
					else
						setError('Unable to fetch token');
				})
				.catch(err => {
					setError(String(err));
					throw err;
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, []);

	return props.children({ error, loading, data });
}

function getTokenFromLocalStorage () {
	return null;
}

function getCodeFromUrl () {
	let usp = new URLSearchParams(window.location.search)
	let code = usp.get('code');

	return code;
}