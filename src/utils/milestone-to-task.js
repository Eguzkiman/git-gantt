import moment from 'moment';

export default function milestoneToTask (milestone) {
	let task = {
		id: getId(milestone),
		title: milestone.title,
		name: getName(milestone),
		start: getStart(milestone),
		end: milestone.due_on,
		url: milestone.url,
		html_url: milestone.html_url,
		progress: getProgress(milestone),
		custom_class: getClass(milestone),
		description: getDescription(milestone),
		assignees: getAssignees(milestone)
	};

	return task;
}


function getProgress ({ open_issues, closed_issues }) {
	return (closed_issues / (open_issues + closed_issues)) * 100;
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

function getName (milestone) {
	let repoName = milestone.repo.name;
	let title = milestone.title;
	return repoName ? (repoName + ' | ' + title) : title;
}

function getClass (milestone) {
	let today = moment();
	let colorClass;
	if (milestone.state === 'closed')
		colorClass = 'closed';
	else if (moment(milestone.due_on).isBefore(today))
		colorClass = 'stale';
	else
		colorClass = 'open';
	return `${colorClass} gh-id-${milestone.id}`
}

function getDescription ({description=''}) {
	return description.split('\n').filter(line => !line.includes('starts')).join(' ');
}

function getId (milestone) {
	return String(milestone.id).replace(/([ #;&,.+*~':"!^$[\]()=>|/@])/g,'\\$1')
}

function getStart ({description='', created_at}) {
	let validKeys = ['starts', 'start', 'begins'];
	let lines = description.split('\n');

	for (let i in lines) {
		let [key, val] = lines[i].split(':');

		if (validKeys.includes(key.trim()) && moment(val.trim()).isValid()) {
			return moment(val.trim()).toISOString();
		}
	};

	return created_at;
}