import { combineReducers } from 'redux'

import repos from './repos';
import milestones from './milestones';

const rootReducer = combineReducers({
	repos,
	milestones
});

export default rootReducer;