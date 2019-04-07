if (!process.env.REACT_APP_CLIENT_ID && !process.env.REACT_APP_GITHUB_TOKEN) {
	let errStr = `
A GitHub Personal Access Token is required to run GitGantt.

Add a Personal Access Token as an environment variable named REACT_APP_GITHUB_TOKEN.
Alternatively, add a REACT_APP_CLIENT_ID if you have access to GitGantt's client id.
`;

	console.log(errStr);
	process.exit(1);
}
