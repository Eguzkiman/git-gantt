import {
	getNormalizedMilestones,
	getAllMilestonesWithRepos,
	getAllMilestones
} from 'selectors/milestones';

let state = {
	milestones: {
		byId: {
			"1": {id: 1, repo: 4},
			"2": {id: 2, repo: 4},
			"3": {id: 3, repo: 4}
		},
		allIds: [1, 2, 3]
	},
	repos: {
		byId: {
			"4": {id: 4}
		},
		allIds: [4]
	}
};

describe("milestones selector's", () => {
	describe('getNormalizedMilestones', () => {
		it('returns an object with keys byId & allIds', () => {
			let actual = getNormalizedMilestones(state);
			expect(actual.allIds).toEqual(state.milestones.allIds);
			expect(actual.byId).toEqual(state.milestones.byId);
		});
	});
	describe('getAllMilestones', () => {
		it('returns an array of objects', () => {
			let actual = getAllMilestones(state);
			let expected = [{id: 1, repo: 4}, {id: 2, repo: 4}, {id: 3, repo: 4}];
			expect(actual).toEqual(expected);
		});
	});
	describe('getAllMilestonesWithRepos', () => {
		it('returns an array of milestones with a related repo', () => {
			let actual = getAllMilestonesWithRepos(state);
			let expected = [{
				id: 1,
				repo: { id: 4 }
			},{
				id: 2,
				repo: { id: 4 }
			},{
				id: 3,
				repo: { id: 4 }
			}];

			expect(actual).toEqual(expected);
		});
	});
});

/*
describe('entries selectors', () => {

	describe('getEntries', () => {

		it('returns empty array when the state is empty', () => {

		it('Returns the right ammount of items', () => {

	describe('getEntriesGroupedByDay', () => {

		it('returns empty array when the state is empty', () => {

		describe('when the state is full', () => {

			it('returns an array of objects', () => {

			it('returns an array where each object has a date and a entries field', () => {

			it('groups the entries of the same day', () => {

*/