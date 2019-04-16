import { useState, useEffect } from 'react';

export default function (props) {

	let [error, setError] = useState(null);
	let [loading, setLoading] = useState(false);
	let [data, setData] = useState([]);

	useEffect(() => {
		fetch();
	}, []);

	async function fetch () {
		setError(null);
		setLoading(true);
		try {
			let data = await props.query();
			setData(data);
			setLoading(false);
		} catch (e) {
			setError(e);
			setLoading(false);
			throw e;
		}
	}
	
	return props.children({error, loading, data});
}