import React from 'react';

import Avatar from './avatar';
import logo from 'assets/logo_gg.png';

export default function Navbar (props) {

	return (

		<div className="row ggmenu">
			<div className="col v-center">
				<img className="logo" src={logo} alt="GitGantt Logo" />
			</div>
			<div className="col v-center h-center">
				
					<ul className="option-menu ">
						<li><a className="active" href="#">Milestone</a></li>
						<li><a href="#">Proyects</a></li>
					</ul>
				
			</div>
			<div className="col">

					<ul className="app-menu">
						<li><a href="#">Docs</a></li>
						<li><a href="#">Tutorials</a></li>
					</ul>

				{props.currentUser && (
					<div className="flex-grid ">
						<div className="v-center">
							<div className="username">{props.currentUser.name}</div>
							<Avatar src={props.currentUser.avatarUrl}/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}