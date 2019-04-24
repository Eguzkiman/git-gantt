import milestoneToTask from 'utils/milestone-to-task';

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
	it('returns a valid frappe-gantt task', () => {
		let actual = milestoneToTask(sampleMilestone);
		expect(actual).toHaveProperty('id');
		expect(actual).toHaveProperty('name');
		expect(actual).toHaveProperty('start');
		expect(actual).toHaveProperty('end');
		expect(actual).toHaveProperty('progress');
	});

	describe('when passed a milestone with an embedded repo', () => {
		it('returns a task whose name key contains the repo name', () => {
			let actual = milestoneToTask(sampleMilestoneWithRepo).name;
			let expected = `${sampleMilestoneWithRepo.repo.name} | ${sampleMilestoneWithRepo.title}`;

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