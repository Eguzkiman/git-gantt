import React, { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';

import moment from 'moment';
import tippy from 'tippy.js';

import 'tippy.js/themes/light.css'

import milestoneToTask from 'utils/milestone-to-task';
import taskToMilestone from 'utils/task-to-milestone';

export default function MilestoneGantt (props) {
	if (!props.data.length) return (<p>You have no milestones available!</p>);
	let tasks = props.data.map(milestoneToTask);

	let gantt = useRef();

	useEffect((newTasks) => {
		if (gantt.current) {
			setTooltips(newTasks);
		}
	}, ['tasks']);

	useEffect(() => {
		gantt.current = new Gantt('#Gantt', tasks, {
			custom_popup_html: () => '',
			on_click: task => window.open(task.html_url),
			on_date_change: (task, start, end) => props.onDateChange(taskToMilestone(task, start, end)),
			on_view_change: () => setTooltips(tasks),
		});
		setTooltips(tasks);
	}, []);
	

	return (
		<div id="Gantt">
			<button className="square" onClick={() => gantt.current.change_view_mode('Day')}>Day</button>
			<button className="square" onClick={() => gantt.current.change_view_mode('Week')}>Week</button>
			<button className="square" onClick={() => gantt.current.change_view_mode('Month')}>Month</button>
		</div>
	);
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
