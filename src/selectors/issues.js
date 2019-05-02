import { createSelector } from 'reselect';

export const getNormalizedIssues = state => state.issues;

export const getAllIssuesWithRepo = createSelector(
	getNormalizedIssues,
	(issues, repos) => issues.map(issues => ({...issues, repo: repos.byId[issues.repo]}))
);