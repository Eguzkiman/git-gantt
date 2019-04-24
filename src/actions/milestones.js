import { normalize } from 'normalizr';
import { MilestoneSchema } from 'schemas';

import * as fetcher from 'fetcher';

import { fetchAllRepos } from 'actions/repos';
import { getAllRepos } from 'selectors/repos';

export const ADD_MILESTONES = 'ADD_MILESTONES';

export function fetchAllMilestones () {
	return async (dispatch, getState) => {
		await dispatch(fetchAllRepos());
		return dispatch(fetchMilestonesOfAllRepos());
	}
}

export function fetchMilestonesOfAllRepos () {
	return async (dispatch, getState) => {
		
		let repos = getAllRepos(getState());

		let promises = repos.map(repo => {
			return fetcher.fetchMilestonesByRepo(repo).then(milestones => {
				return milestones.data.map(milestone => ({...milestone, repo: repo.id}));
			});
		});

		return Promise.all(promises)
			.then(
				result => {
					let milestones = result.flat();
					let normalized = normalize(milestones, [MilestoneSchema]);
					let byId = normalized.entities.milestone;
					let allIds = normalized.result;
					dispatch(addMilestones({ byId, allIds }));
				},
				error => {
					throw error;
				}
			);
	}
}


export const addMilestones = milestones => ({
	type: ADD_MILESTONES,
	payload: milestones
});