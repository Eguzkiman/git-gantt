import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

const GITHUB_HOST = "https://api.github.com";
const ghAxios = axios.create({
	baseURL: GITHUB_HOST
});

import {
	ADD_MILESTONES,
	addMilestones,
	fetchAllMilestones,
	fetchAllRepos,
	fetchMilestonesOfAllRepos,
} from 'actions/milestones'

import {
	ADD_REPOS
} from 'actions/repos';

import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('milestones actions', () => {
	describe('fetchAllMilestones thunk', () => {
		it('Adds repos and milestones', () => {
			/*fetchMock.getOnce('https://api.github.com/user/repos', {
				headers: { 'content-type': 'application/json' },
				body: [{ id: 1, id: 2, id: 3}],
			});
			fetchMock.getOnce(`https://api.github.com/repos/:owner/:repo_name/milestones`, {
				headers: { 'content-type': 'application/json' },
				body: [{ id: 1, id: 2, id: 3}],
			});*/

			var mock = new MockAdapter(ghAxios);
			mock.onGet(`/user/repos?per_page=100`).reply(200,
			  [{"id": 1},{"id": 2},{"id": 3}]
			);

			ghAxios.get(`/user/repos?per_page=100`)
				.then(function(response) {
					console.log(response.data);
			});

			mock.onGet(`https://api.github.com/repos/:owner/:repo_name/milestones`).reply(200,
			  [{"id": 1},{"id": 2},{"id": 3}]
			);

			ghAxios.get(`https://api.github.com/repos/:owner/:repo_name/milestones`)
				.then(function(response) {
					console.log(response.data);
			});

			const samplePayload = {
				allIds: [1,2,3],
				byId: {
					'1': { id: 1 },
					'2': { id: 2 },
					'3': { id: 3 },
				}
			};
			const expectedActions = [
				{ type: ADD_REPOS, payload: samplePayload },
				{ type: ADD_MILESTONES, payload: samplePayload },
				{ type: ADD_MILESTONES, payload: samplePayload },
				{ type: ADD_MILESTONES, payload: samplePayload },
			];

			const store = mockStore({ todos: [] });

			return store.dispatch(fetchAllMilestones()).then(() => {
				expect(store.getActions()).toEqual(expectedActions)
			})
		});
	});
});