import { normalize } from 'normalizr';
import { RepoSchema } from 'schemas';

import * as fetcher from 'fetcher';

export const ADD_REPOS = 'ADD_REPOS';

export function fetchAllRepos () {
	return async (dispatch, /*getState*/) => {
		return fetcher.fetchAllRepos()
			.then(
				result => {
					let normalized = normalize(result.data, [RepoSchema]);
					let byId = normalized.entities.repo;
					let allIds = normalized.result;
					dispatch(addRepos({ byId, allIds }));
				},
				error => {
					throw error;
				}
			);
	}
}


export const addRepos = repos => ({
	type: ADD_REPOS,
	payload: repos
});