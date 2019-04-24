import flattenArray from 'utils/flatten-array';

describe('flatten array util', () => {
	it('flattens arrays', () => {
		let actual = flattenArray([[1,2,3],[1,2,3],[1,2,3]]);
		let expected = [1,2,3,1,2,3,1,2,3];

		expect(actual).toEqual(expected);
	});
	it('returns the original array if its not nested', () => {
		let actual = flattenArray([1,2,3]);
		let expected = [1,2,3];

		expect(actual).toEqual(expected);
	});
	it('flattens deeply nested arrays', () => {
		let actual = flattenArray([[1], [1, [2]], 1, 3, [7]]);
		let expected = [1, 1, 2, 1, 3, 7];

		expect(actual).toEqual(expected);
	});
});