import React from 'react';
import Gantt from 'frappe-gantt';

import moment from 'moment';
import tippy from 'tippy.js';
import 'tippy.js/themes/light.css'

export default function MilestoneGantt (props) {
	let tasks = [];

	// props.repositories.forEach(repo => {
		props.data.forEach(milestone => {
			tasks.push({
				id: getId(milestone),
				name: /*repo.node.name + ' | ' +*/ milestone.title,
				start: getStart(milestone),
				end: milestone.due_on,
				url: milestone.url,
				progress: getProgress(milestone),
				custom_class: getClass(milestone),
				description: getDescription(milestone),
				assignees: getAssignees(milestone)
			})
		});
	// });
	if (!tasks.length) return (<p>You have no milestones available!</p>);

	let gantt;

	setTimeout(function () {
		const id = '#Gantt';
		gantt = new Gantt(id, tasks, {
			custom_popup_html: () => '',
			on_click: task => window.open(task.url),
			on_date_change: (task, start, end) => {
			},
			on_view_change: function() {
				setTooltips(tasks);
			// 	var bars = document.querySelectorAll(id + " .bar-group");
			// 	for (let i = 0; i < bars.length; i++) {
			// 		bars[i].addEventListener("mousedown", stopEvent, true);
			// 	}
			// 	var handles = document.querySelectorAll(id + " .handle-group");
			// 	for (let i = 0; i < handles.length; i++) {
			// 		handles[i].remove();
			// 	}
			},
		});

		setTooltips(tasks);
	});

	return (
		<div id="Gantt">
			{/*<button className="square" onClick={() => gantt.change_view_mode('Quarter Day')}>Quarter Day</button>
			<button className="square" onClick={() => gantt.change_view_mode('Half Day')}>Half Day</button>*/}
			<button className="square" onClick={() => gantt.change_view_mode('Day')}>Day</button>
			<button className="square" onClick={() => gantt.change_view_mode('Week')}>Week</button>
			<button className="square" onClick={() => gantt.change_view_mode('Month')}>Month</button>			
		</div>
	);
}

function getStart (milestone) {
	let validKeys = ['starts', 'start', 'begins'];
	let lines = milestone.description.split('\n');

	for (let i in lines) {
		let [key, val] = lines[i].split(':');

		if (validKeys.includes(key.trim()) && moment(val.trim()).isValid()) {
			return moment(val.trim()).toISOString();
		}
	};

	return milestone.created_at;
}

function makeCardTemplate (data) {
	return`
		<div class="milestone-tippy">
			<h3>${data.name}</h3>
			<p>${data.description || 'No description available'}</p>
			<p>
				from ${moment(data.start).format('MMMM Do')}
				to ${moment(data.end).format('MMMM Do')}
			</p>
			<h4>Assignees</h4>
			${data.assignees.length
				? data.assignees.map(assignee => (
					`<div class="v-center">
						<img class='small-avatar' src=${assignee.avatar_url}/>
						<span>${assignee.name || assignee.login}</span>
					</div>`
				)).join('')
				: `<p>No asignees available</p>`
			}
		</div>
	`;
}

function getProgress ({ open_issues, closed_issues }) {
	return (closed_issues / (open_issues + closed_issues)) * 100;
	// let total = milestone.node.issues.edges.length;
	// let closed = milestone.node.issues.edges.reduce((total, issue) => {
	// 	return issue.node.closed ? total += 1 : total
	// }, 0);
	// return (closed / total) * 100;
}

function getAssignees (milestone) {
	let assignees = [];
	// let ids = new Map();

	// milestone.node.issues.edges.forEach(issue => {
	// 	issue.node.assignees.edges.forEach(assignee => {
	// 		let id = assignee.node.id; 
	// 		if (!ids.has(id)) {
	// 			ids.set(id, true);
	// 			assignees.push(assignee.node);
	// 		}
	// 	});
	// });



	return assignees;
}

function getClass (milestone) {
	let today = moment();
	let colorClass;
	console.log(milestone.state)
	if (milestone.state === 'closed')
		colorClass = 'closed';
	else if (moment(milestone.due_on).isBefore(today))
		colorClass = 'stale';
	else
		colorClass = 'open';
	return `${colorClass} gh-id-${milestone.id}`
}

function getDescription (milestone) {
	return milestone.description.split('\n').filter(line => !line.includes('starts')).join(' ');
}

function getId (milestone) {
	return String(milestone.id).replace(/([ #;&,.+*~':"!^$[\]()=>|/@])/g,'\\$1')
}

function setTooltips (tasks) {
	tasks.forEach(task => {
		tippy(`.gh-id-${task.id}`, {
			content: makeCardTemplate(task),
			animateFill: false,
			theme: 'light',
			interactive: true
		});
	});
}

// function stopEvent(event) {
// 	event.preventDefault();
// 	event.stopPropagation();
// }