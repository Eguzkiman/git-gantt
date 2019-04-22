import { normalize } from 'normalizr';

import * as fetcher from 'fetcher';

export const ADD_REPOS = 'ADD_REPOS';

export function fetchAllRepos () {
	return async (dispatch, /*getState*/) => {
		return fetcher.fetchAllRepos()
			.then(
				result => {
					console.log(result);
				},
				error => {
					// ...
					throw({ error, message: 'Failed to fetch all repos' });
				}
			);
	}
}


export const addRepos = repos => ({
	type: ADD_REPOS,
	payload: repos
});