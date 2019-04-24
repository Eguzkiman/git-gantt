import { createSelector } from 'reselect';

export const getNormalizedRepos = state => state.repos;

export const getAllRepos = createSelector(
	getNormalizedRepos,
	({ allIds, byId }) => allIds.map(id => byId[id])
);