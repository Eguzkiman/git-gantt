import React, { Component } from 'react';
import Gantt from 'frappe-gantt';

export default class MilestoneGant extends Component {
	componentDidMount () {
		let tasks = [];

		this.props.repositories.edges.map(repo => {
			repo.node.milestones.edges.map(milestone => {
				tasks.push({
					id: milestone.node.id,
					name: repo.node.name + ' | ' + milestone.node.title,
					start: milestone.node.createdAt,
					end: milestone.node.dueOn,
					url: milestone.node.url,
					progress: calculateMilestoneProgress(milestone),
					custom_class: milestone.node.closed ? 'closed' : 'open'
				})
			});
		});

		const id = '#Gantt';
		var gantt = new Gantt(id, tasks, {
			custom_popup_html: () => '',
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
			<div id="Gantt"></div>
		);
	}
}

function stopEvent(event) {
	event.preventDefault();
	event.stopPropagation();
}

function calculateMilestoneProgress (milestone) {
	let total = milestone.node.issues.edges.length;
	let closed = milestone.node.issues.edges.reduce((total, issue) => {
		return issue.node.closed ? total += 1 : total
	}, 0);
	return (closed / total) * 100;
}