import {
	ADD_REPOS,
} from 'actions/repos';

const initialState = {
	byId: {}
};

export default function ReposReducer (state = initialState, action) {
	switch (action.type) {
		case ADD_REPOS:
			return {
				...state
			}
		default:
			return state;
	}
};