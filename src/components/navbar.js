import React from 'react';

import Avatar from './avatar';

export default function Navbar (props) {

	return (
		<div className="navbar flex-grid">
			<div className="col">
				<h1>GitGantt</h1>
			</div>
			{props.currentUser && (
				<div className="flex-grid ">
					<div className="v-center">
						<div className="username">{props.currentUser.name}</div>
						<Avatar src={props.currentUser.avatarUrl}/>
					</div>
				</div>
			)}
		</div>
	);
}