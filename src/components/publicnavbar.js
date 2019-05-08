import React from 'react';

import logo from 'assets/logo_gg.png';

export default function Navbar (props) {

	return (
		<div className="containter">
			<div className="row public-navbar">
				<div className="col v-center">
					<img className="logo" src={logo} alt="GitGantt Logo" />
				</div>
				<div className="col">
					<ul className="website-menu">
						<li><a href="#">Contributing</a></li>
						<li><a href="#">How it works</a></li>
						<li><a href="#">Login</a></li>
						<li><a href="#" className="button-primary signup">Get started</a></li>
					</ul>					
				</div>
			</div>
		</div>
	);
}