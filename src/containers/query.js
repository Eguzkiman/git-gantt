import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Query (props) {

	let data = props.data;
	let [error, setError] = useState(null);
	let [loading, setLoading] = useState(false);

	useEffect(() => {
		fetch();
	}, []);

	async function fetch () {
		setError(null);
		setLoading(true);
		try {
			await props.doQuery();
			setLoading(false);
		} catch (e) {
			setError(e);
			setLoading(false);
			throw e;
		}
	}
	
	return props.children({ error, loading, data });
}

const stateToProps = (state, ownProps) => ({
	data: ownProps.selector(state),
});

const dispatchToProps = (dispatch, ownProps) => ({
	doQuery: () => dispatch(ownProps.query())
});

export default connect(
	stateToProps,
	dispatchToProps
)(Query);