import moment from 'moment';

export default function taskToMilestone (task, start, end) {
	let milestone = {
		title: task.title,
		description: addDateToDescription(task.description, start),
		due_on: moment(end).format('YYYY-MM-DD'),
		url: task.url
	};

	return milestone;
}

function addDateToDescription (description='', date) {
	// frappe-gantt returns dates with daylight savings.
	let d = moment(date).add(3, 'hours').startOf('day').format('YYYY-MM-DD');
	return `${description}\ngantt_starts:${d}`;
}