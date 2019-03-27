import React, { Component } from 'react';

const URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`;

export default class Navbar extends Component {
	componentDidMount () {
		var TxtType = function(el, toRotate, period) {
		    this.toRotate = toRotate;
		    this.el = el;
		    this.loopNum = 0;
		    this.period = parseInt(period, 10) || 2000;
		    this.txt = '';
		    this.tick();
		    this.isDeleting = false;
		};

		TxtType.prototype.tick = function() {
		    var i = this.loopNum % this.toRotate.length;
		    var fullTxt = this.toRotate[i];

		    if (this.isDeleting) {
		    this.txt = fullTxt.substring(0, this.txt.length - 1);
		    } else {
		    this.txt = fullTxt.substring(0, this.txt.length + 1);
		    }

		    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

		    var that = this;
		    var delta = 200 - Math.random() * 100;

		    if (this.isDeleting) { delta /= 2; }

		    if (!this.isDeleting && this.txt === fullTxt) {
		    delta = this.period;
		    this.isDeleting = true;
		    } else if (this.isDeleting && this.txt === '') {
		    this.isDeleting = false;
		    this.loopNum++;
		    delta = 500;
		    }

		    setTimeout(function() {
		    that.tick();
		    }, delta);
		};


		var elements = document.getElementsByClassName('typewrite');
		for (var i=0; i<elements.length; i++) {
		    var toRotate = elements[i].getAttribute('data-type');
		    var period = elements[i].getAttribute('data-period');
		    if (toRotate) {
		      new TxtType(elements[i], JSON.parse(toRotate), period);
		    }
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
		document.body.appendChild(css);


	}
	render () {
		return (
			<div className="navbar flex-grid">
				<div className="col" class="title">
					<h1>Git<span class="typewrite" data-period="2000" data-type='[ "Gantt", "Hub Milestones Gantt", "Hub Gantt" ]'></span><span class="wrap"></span></h1>
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
	


}