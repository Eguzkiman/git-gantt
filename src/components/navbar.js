import React, { Component } from 'react';

const URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`;

export default function Navbar () {
	return (
		<div className="navbar flex-grid">
			<div className="col" class="title">
				<h1>GitGantt</h1>
			</div>
			<div className="col button-container">
				<div>
					<button onClick={() => window.location.href =URL}>
						Sign in with GitHub
					</button>
				</div>
			</div>
		</div>
	);
}