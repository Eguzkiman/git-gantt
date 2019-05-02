import {
	ADD_ISSUES,
} from 'actions/issues';

const initialState = {
	byId: {},
	allIds: []
};

export default function IssuesReducer (state = initialState, action) {
	switch (action.type) {
		case ADD_ISSUES:
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