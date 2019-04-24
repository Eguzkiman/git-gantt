import reducer from 'reducers/milestones'

import {
	ADD_MILESTONE
} from 'actions/milestones'

const initialState = {
	byId: {},
	allIds: []
};

const sampleState = {
	byId: {
		1: { id: 1, name: "Do something awesome" },
		2: { id: 2, name: "Do something great" },
		3: { id: 3, name: "Do something fun" }
	},
	allIds: [1,2,3],
};

const samplePayload = {
	byId: {
		4: { id: 4, name: "Something new!" } 
	}
}

// This one should have an item already existing in sampleState
const overwritingPayload = {
	byId: {
		3: { id: 3, name: "Overridden" }
	},
	allIds: [3]
}

describe('milestones reducer', () => {
	it('should return the initial state', () => {
		const actual = reducer(undefined, {});
		const expected = initialState;
		expect(actual).toEqual(expected)
	});
	describe('ADD_MILESTONE', () => {
		describe('when just adding items', () => {
			const action = {
				type: ADD_MILESTONE,
				payload: samplePayload
			};
			const result = reducer(sampleState, action);
			it('keeps the old items on byId', () => {
				expect(result.byId).toMatchObject(sampleState.byId);
			});
			it('adds the new items to byId', () => {
				expect(result.byId).toMatchObject(samplePayload.byId);
			});
			it('merges new allIds into old ones in the correct order', () => {
				expect(result.allIds).toEqual([...sampleState.allIds, ...samplePayload.allIds ])
			});
		});
		describe('when overwriting items', () => {
			const action = {
				type: ADD_MILESTONE,
				payload: overwritingPayload
			};
			const result = reducer(sampleState, action);
			it('overwrites items with same Id', () => {
				const overwrittenId = overwritingPayload.allIds[0];
				expect(result.byId[overwrittenId]).toEqual(overwritingPayload.byId[overwrittenId]);
			})
			it('does not allow duplicate ids on allIds', () => {
				expect(result.allIds).toEqual([...new Set(result.allIds)]);
			})
		});
	})
});
