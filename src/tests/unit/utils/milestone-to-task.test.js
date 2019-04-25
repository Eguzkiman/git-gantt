import milestoneToTask from 'utils/milestone-to-task';

import moment from 'moment';

let sampleMilestone = {
	url: 'https://api.github.com/repos/kioru/saeko-v2/milestones/1',
	html_url: 'https://github.com/kioru/saeko-v2/milestone/1',
	labels_url: 'https://api.github.com/repos/kioru/saeko-v2/milestones/1/labels',
	id: 4024220,
	node_id: 'MDk6TWlsZXN0b25lNDAyNDIyMA==',
	number: 1,
	title: 'Saeko v2.0.beta-1',
	description: 'El primer deploy de titulación. Contiene los módulos de candidatos, empresas y proyectos. No contiene el proceso de firma de títulos ni manejo de créditos.',
	creator: {
		login: 'Eguzkiman',
		id: 12789451,
		node_id: 'MDQ6VXNlcjEyNzg5NDUx',
		avatar_url: 'https://avatars0.githubusercontent.com/u/12789451?v=4',
		gravatar_id: '',
		url: 'https://api.github.com/users/Eguzkiman',
		html_url: 'https://github.com/Eguzkiman',
		followers_url: 'https://api.github.com/users/Eguzkiman/followers',
		following_url: 'https://api.github.com/users/Eguzkiman/following{/other_user}',
		gists_url: 'https://api.github.com/users/Eguzkiman/gists{/gist_id}',
		starred_url: 'https://api.github.com/users/Eguzkiman/starred{/owner}{/repo}',
		subscriptions_url: 'https://api.github.com/users/Eguzkiman/subscriptions',
		organizations_url: 'https://api.github.com/users/Eguzkiman/orgs',
		repos_url: 'https://api.github.com/users/Eguzkiman/repos',
		events_url: 'https://api.github.com/users/Eguzkiman/events{/privacy}',
		received_events_url: 'https://api.github.com/users/Eguzkiman/received_events',
		type: 'User',
		site_admin: false
	},
	open_issues: 0,
	closed_issues: 23,
	state: 'closed',
	created_at: '2019-02-03T00:39:12Z',
	updated_at: '2019-03-18T23:36:29Z',
	due_on: '2019-02-05T08:00:00Z',
	closed_at: '2019-02-20T05:56:21Z',
	repo: 168112761
};

let sampleMilestoneWithRepo = {
	title: "I'm a milestone, most of the time...",
	repo: {
		name: "Im usually a repo"
	}
};

describe('milestone to task util', () => {
	describe('when passed a milestone with an embedded repo', () => {
		let milestone = sampleMilestoneWithRepo;
		it('returns a valid frappe-gantt task', () => {
			let actual = milestoneToTask(milestone);
			expect(actual).toHaveProperty('id');
			expect(actual).toHaveProperty('name');
			expect(actual).toHaveProperty('start');
			expect(actual).toHaveProperty('end');
			expect(actual).toHaveProperty('progress');
		});
		it('returns a task whose name key contains the repo name', () => {
			let actual = milestoneToTask(milestone).name;
			let expected = `${milestone.repo.name} | ${milestone.title}`;

			expect(actual).toEqual(expected);
		});
		it('calculates progress correctly', () => {
			let actual = milestoneToTask({
				open_issues: 20,
				closed_issues: 20
			}).progress;

			let expected = 50;

			expect(actual).toEqual(expected);
		});
	});

	describe("resulting color_class value", () => {
		it('chooses the closed class when passed a closed milestone', () => {
			let actual = milestoneToTask({ state: 'closed' }).custom_class;
			let expected = 'closed';

			expect(actual).toMatch(expected);
		});
		it('chooses the stale class when passed a stale milestone', () => {
			let due_on = moment().subtract(1, 'day');
			let actual = milestoneToTask({ due_on }).custom_class;
			let expected = 'stale';

			expect(actual).toMatch(expected);
		});
		it('chooses the open class when passed a open milestone', () => {
			let due_on = moment().add(1, 'day');
			let actual = milestoneToTask({ due_on }).custom_class;
			let expected = 'open';

			expect(actual).toMatch(expected);
		});
		it('includes a gh-id class', () => {
			let actual = milestoneToTask({ id: 1337 }).custom_class;
			let expected = 'gh-id-1337';

			expect(actual).toMatch(expected);
		});
	});

	describe('resulting description value', () => {
		it('filters out lines with a gantt_starts token', () => {
			let description = 'oh yeah!\nSomething awesome starts now!\nit gantt_starts:2019-01-01';
			let actual = milestoneToTask({ description }).description;
			let expected = 'oh yeah!\nSomething awesome starts now!';

			expect(actual).toEqual(expected);

		});
	});

	describe('when passed a milestone without an embedded repo', () => {
		it('returns a task whose name key does not contain the repo name', () => {
			let actual = milestoneToTask(sampleMilestone).name;
			let expected = sampleMilestone.title;

			expect(actual).toEqual(expected);
		});
		
	})
});