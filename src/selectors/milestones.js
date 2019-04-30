import { createSelector } from 'reselect';

import {
	getNormalizedRepos
} from 'selectors/repos';

export const getNormalizedMilestones = state => state.milestones;

export const getAllMilestones = createSelector(
	getNormalizedMilestones,
	({ allIds, byId }) => allIds.map(id => byId[id])
);

export const getAllMilestonesWithRepos = createSelector(
	getAllMilestones,
	getNormalizedRepos,
	(milestones, repos) => milestones.map(milestone => ({...milestone, repo: repos.byId[milestone.repo]}))
);