import React from 'react';
import publicNavbar from 'components/publicnavbar';
import gitgantt from 'assets/gitgantt.png';
import img1 from 'assets/img1.png';
import img2 from 'assets/img2.png';
import img3 from 'assets/img3.png';
import github from 'assets/github.png';
import twitter from 'assets/twitter.png';

const SIGN_IN_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo user`;

export default function Welcome () {
	return (
		<div>			
			<button onClick={() => window.location.href = SIGN_IN_URL }>
				Sign in with GitHub
			</button>

			<publicNavbar/>

		<div className="containter">
			<div className="section1 v-center">
				<div className="boxTitle">
					<h1 className="title">Keep track of all your projects with no hassle.</h1>
					<p className="subtitle">GitGantt is the Free & Open Source tool to visualize all your GitHub work.</p>
					<a className="button-link" href="#">Contribute on GitHub</a>&nbsp;&nbsp;
					<a className="button-primary" href="#">Get started. It’s free!</a>
				</div>
				<div className="h-center">
					<img src={gitgantt} alt="GitGantt" width="550px"/>
				</div>
			</div>

			<div className="section2">
				<div className="box">
					<img src={img1} alt="GitGantt"/>
					<h2>Keep all your projects in sync with Github</h2>
					<p>GitGantt gets its data from your GitHub and keeps it updated as you go.</p>									
				</div>

				<div className="box">
					<img src={img2} alt="GitGantt"/>
					<h2>Deliver what matters, never miss a deadline again.</h2>
					<p>Keep track of every deadline of every project, and make adjustments immediately if needed.</p>									
				</div>

				<div className="box">
					<img src={img3} alt="GitGantt"/>
					<h2>Totally Free. Proudly Open Source.</h2>
					<p>GitGantt is a community effort. Feel free to clone it, fork it, or contribute to it in any way.  Check out our contributions guide here</p>									
				</div>
			</div>
		</div>
		</div>		
		
	);
}
