import { createSelector } from 'reselect';

export const getNormalizedMilestones = state => state.milestones;

export const getAllMilestones = createSelector(
	getNormalizedMilestones,
	({ allIds, byId }) => allIds.map(id => byId[id])
);