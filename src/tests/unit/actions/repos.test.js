import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import {
	ADD_REPOS,
	fetchAllRepos
} from 'actions/repos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
	repos: {
		allIds: [],
		byId: {}
	}
}


describe('repos actions', () => {
	describe('fetchAllRepos thunk', () => {
		it('Gets all repos', () => {
			const store = mockStore(initialState);
			const samplePayload = {
				allIds: [1,2,3],
				byId: {
					'1': { id: 1, owner: {login: "Eguzkiman", name:"awesomeness"} },
					'2': { id: 2, owner: {login: "Eguzkiman", name:"awesomeness"} },
					'3': { id: 3, owner: {login: "Eguzkiman", name:"awesomeness"} },
				}
			};
			const expectedActions = [
				{ type: ADD_REPOS, payload: samplePayload },
			];

			return store.dispatch(fetchAllRepos()).then(() => {
				expect(store.getActions()).toEqual(expectedActions)
			})
		});
	});
});