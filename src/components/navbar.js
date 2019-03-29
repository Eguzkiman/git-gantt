import React from 'react';

import Avatar from './avatar';

const SIGN_IN_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo user`;

export default function Navbar (props) {

	let actionSection;
	if (props.currentUser) {
		actionSection = (
			<div className="v-center">
				<div className="username">{props.currentUser.name}</div>
				<Avatar src={props.currentUser.avatarUrl}/>
			</div>
		);
	} else {
		actionSection = (
			<div className="v-center">
				<button onClick={() => window.location.href = SIGN_IN_URL }>
					Sign in with GitHub
				</button>
			</div>
		);
	}

	return (
		<div className="navbar flex-grid">
			<div className="col">
				<h1>GitGantt</h1>
			</div>
			<div className="flex-grid ">
				{actionSection}
			</div>
		</div>
	);
}