import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'

let store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		// If no window object is available, ie. not running on a browser, default to an empty compose.
		typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose()
	)
);

export default store;