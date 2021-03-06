import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'

// If no window object is available, ie. not running on a browser, default to an empty compose.
let devtools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (!devtools) devtools = compose()

let store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		devtools
	)
);

export default store;