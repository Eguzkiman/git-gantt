import { createSelector } from 'reselect';

export const getNormalizedMilestones = state => state.milestones;

export const getAllMilestones = createSelector(
	getNormalizedMilestones,
	({ allIds, byId }) => allIds.map(id => byId[id])
	// (x) => {console.log(x);return x.allIds.map(id => x.byId[id])}
);