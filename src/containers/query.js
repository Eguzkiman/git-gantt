import { useState, useEffect } from 'react';
import { StoreContext, useMappedState, useDispatch } from 'redux-react-hook';

export default function Query (props) {

	const dispatch = useDispatch();
	const data = useMappedState(props.selector);

	let [error, setError] = useState(null);
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch();
	}, []);

	async function fetch () {
		setError(null);
		setLoading(true);
		try {
			await dispatch(props.query());
			setLoading(false);
		} catch (e) {
			setError(e);
			setLoading(false);
			throw e;
		}
	}
	
	return props.children({ error, loading, data });
}