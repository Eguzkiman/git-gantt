import {
	getNormalizedMilestones,
	getAllMilestones
} from 'selectors/milestones';

let state = {
	milestones: {
		byId: {
			"1": {id: 1},
			"2": {id: 2},
			"3": {id: 3}
		},
		allIds: [1, 2, 3]
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
			let expected = [{id: 1}, {id:2}, {id: 3}];
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