import React, { Component } from 'react';
import Gantt from 'frappe-gantt';

import moment from 'moment';

export default class MilestoneGant extends Component {
	constructor(props) {
		super(props);
		this.gantt = {};
	}	
	componentDidMount () {
		let tasks = [];

		this.props.repositories.edges.map(repo => {
			repo.node.milestones.edges.map(milestone => {
				tasks.push({
					id: milestone.node.id,
					name: repo.node.name + ' | ' + milestone.node.title,
					start: getStart(milestone),
					end: milestone.node.dueOn,
					url: milestone.node.url,
					progress: getProgress(milestone),
					custom_class: calculateMilestoneClass(milestone),
				})
			});
		});

		const id = '#Gantt';
		this.gantt = new Gantt(id, tasks, {
			custom_popup_html: function(){},
			on_click: task => window.open(task.url),
			on_view_change: function() {
				var bars = document.querySelectorAll(id + " .bar-group");
				for (let i = 0; i < bars.length; i++) {
					bars[i].addEventListener("mousedown", stopEvent, true);
				}
				var handles = document.querySelectorAll(id + " .handle-group");
				for (let i = 0; i < handles.length; i++) {
					handles[i].remove();
				}
			},
		});
	}
	render () {
		return (
			<div id="Gantt">		
				{/*<button className="square" onClick={() => this.gantt.change_view_mode('Quarter Day')}>Quarter Day</button>
				<button className="square" onClick={() => this.gantt.change_view_mode('Half Day')}>Half Day</button>*/}
				<button className="square" onClick={() => this.gantt.change_view_mode('Day')}>Day</button>
				<button className="square" onClick={() => this.gantt.change_view_mode('Week')}>Week</button>
				<button className="square" onClick={() => this.gantt.change_view_mode('Month')}>Month</button>			
			</div>
		);
	}
}

function getStart (milestone) {
	let validKeys = ['starts', 'start', 'begins'];
	let lines = milestone.node.description.split('\n');

	for (let i in lines) {
		let [key, val] = lines[i].split(':');

		if (validKeys.includes(key.trim()) && moment(val.trim()).isValid()) {
			return moment(val.trim()).toISOString();
		}
	};

	return milestone.node.createdAt;
}

function stopEvent(event) {
	event.preventDefault();
	event.stopPropagation();
}

function getProgress (milestone) {
	let total = milestone.node.issues.edges.length;
	let closed = milestone.node.issues.edges.reduce((total, issue) => {
		return issue.node.closed ? total += 1 : total
	}, 0);
	return (closed / total) * 100;
}

function calculateMilestoneClass (milestone) {
	let today = moment();
	if (milestone.node.closed)
		return 'closed';
	if (moment(milestone.node.dueOn).isBefore(today))
		return 'stale';
	else
		return 'open'
}