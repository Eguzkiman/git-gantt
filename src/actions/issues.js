import { normalize } from 'normalizr';
import { IssueSchema } from 'schemas';

import * as fetcher from 'fetcher';

import { fetchAllRepos } from 'actions/repos';
import { getNormalizedRepos } from 'selectors/repos';
import { getNormalizedMilestones } from 'selectors/milestones';

import axios from 'axios';

export const ADD_ISSUES = 'ADD_ISSUES';	

export function fetchIssuesByMilestone (milestoneId) {
	return async (dispatch, getState) => {
		
		let state = getState();
		let milestone = getNormalizedMilestones(state)[milestoneId];
		let repo = getNormalizedRepos(state)[milestone.repo];

		axios.get(`/${repo.owner.login}/${repo.name}/issues?milestone=${milestone.number}&state=all`)
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.log(err);
				throw err;
			});

		// let promises = repos.map(repo => {
		// 	return fetcher.fetchIssuesByRepo(repo).then(issues => {
		// 		return issues.data.map(milestone => ({...milestone, repo: repo.id}));
		// 	});s
		// });

		/*return Promise.all(promises)
			.then(
				result => {
					let milestones = result.flat();
					let normalized = normalize(milestones, [MilestoneSchema]);
					let byId = normalized.entities.milestone;
					let allIds = [...new Set(normalized.result)];
					dispatch(addMilestones({ byId, allIds }));
				},
				error => {
					throw error;
				}
			);*/
	}
}