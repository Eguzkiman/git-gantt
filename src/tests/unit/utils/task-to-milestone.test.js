import taskToMilestone from 'utils/task-to-milestone';
import moment from 'moment';

let task = {
	id: "scape\\-Dory2003\\=\\=",
	name: "This is a good name",
	progress: 80
}

describe('task to milestone util', () => {
	it('returns a valid milestone', () => {
		let actual = taskToMilestone(task);
		expect(actual).toHaveProperty('title');
		expect(actual).toHaveProperty('description');
		expect(actual).toHaveProperty('due_on');
		expect(actual).toHaveProperty('url');
	});
	it('contains gantt_starts date within description', () => {
		let start = moment('2019-01-01').toISOString();
		let end = moment('2019-02-01').toISOString();
		let actual = taskToMilestone(task, start, end).description;
		let expected = 'gantt_starts:2019-01-01';

		expect(actual).toMatch(expected);
	});
});