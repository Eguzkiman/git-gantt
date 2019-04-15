import React from 'react';
import { Query } from "react-apollo";

import Gantt from 'components/gantt';
import Navbar from 'components/navbar';

import {
	GET_MILESTONES
} from 'queries';

export default function Home (props) {
	let context = {
		headers: {
			Authorization: `Bearer ${props.token}`
		}
	}
	return (
		<Query query={GET_MILESTONES} context={context}>
			{({ loading, error, data }) => {
				if (loading) return (
					<div>
						<Navbar/>
						<p>Loading...</p>
					</div>
				);

				if (error) return (
					<div>
						<Navbar/>
						<p>{String(error)}</p>
					</div>
				)
					
				return (
					<div>
						<Navbar currentUser={data.viewer}/>
						<Gantt
							repositories={data.viewer.repositories}
						/>
					</div>
				);
			}}
		</Query>
	);
}