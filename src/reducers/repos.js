import {
	ADD_REPOS,
} from 'actions/repos';

const initialState = {
	byId: {},
	allIds: []
};

export default function ReposReducer (state = initialState, action) {
	switch (action.type) {
		case ADD_REPOS:
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