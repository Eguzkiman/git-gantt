import { combineReducers } from 'redux'

import repos from './repos';
import milestones from './milestones';
import issues from './issues';

const rootReducer = combineReducers({
	repos,
	milestones,
	issues
});

export default rootReducer;