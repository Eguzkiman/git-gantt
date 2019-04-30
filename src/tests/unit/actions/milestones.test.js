import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

const GITHUB_HOST = "https://api.github.com";

import {
	ADD_MILESTONES,
	addMilestones,
	fetchAllMilestones,
	fetchAllRepos,
	fetchMilestonesOfAllRepos,
} from 'actions/milestones';

import {
	ADD_REPOS
} from 'actions/repos';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Redux mock store does not use reducers at all. Initial state has to be set manually.
const initialState = {
	repos: {
		allIds: [1,2,3],
		byId: {
			'1': {
				id: 1,
				owner: {
					login: 'Eguzkiman',
					name: 'awesomeness'
				}
			},
			'2': {
				id: 2,
				owner: {
					login: 'Eguzkiman',
					name: 'awesomeness'
				}
			},
			'3': {
				id: 3,
				owner: {
					login: 'Eguzkiman',
					name: 'awesomeness'
				}
			},
		}
	},
	milestones: {
		byId: {},
		allids: []
	}
}

jest.mock('axios');

axios.get.mockResolvedValue({
	data: [{"id": 1},{"id": 2},{"id": 3}]
});

describe('milestones actions', () => {
	describe('fetchMilestonesOfAllRepos thunk', () => {
		it('Adds repos and milestones', () => {
			const samplePayload = {
				allIds: [1,2,3],
				byId: {
					'1': { id: 1, repo: 3 },
					'2': { id: 2, repo: 3 },
					'3': { id: 3, repo: 3 },
				}
			};
			const expectedActions = [
				// { type: ADD_REPOS, payload: samplePayload },
				{ type: ADD_MILESTONES, payload: samplePayload }
			];

			const store = mockStore(initialState);

			return store.dispatch(fetchMilestonesOfAllRepos()).then(() => {
				expect(store.getActions()).toEqual(expectedActions)
			})
		});
	});
});