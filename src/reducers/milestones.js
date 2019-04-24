import {
	ADD_MILESTONES,
} from 'actions/milestones';

const initialState = {
	byId: {},
	allIds: []
};

export default function MilestonesReducer (state = initialState, action) {
	switch (action.type) {
		case ADD_MILESTONES:
			let byId = {
				...state.byId,
				...action.payload.byId
			}
			let allIds = [...new Set(state.allIds.concat(action.payload.allIds))];
			
			return { byId, allIds };
		default:
			return state;
	}
};