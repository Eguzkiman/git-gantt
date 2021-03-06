import React from 'react';

import Gantt from 'components/gantt';
import Navbar from 'components/navbar';
import PublicNavbar from 'components/publicnavbar';

import Query from "containers/query";


// import { fetchAllRepos } from 'actions/repos';
import { fetchAllMilestones } from 'actions/milestones';

import { getAllMilestonesWithRepos } from 'selectors/milestones';

import { updateMilestone } from 'fetcher';

export default function Home (props) {

	async function onDateChange (milestone) {
		updateMilestone(milestone)
	}

	async function onHover (milestone) {
		console.log(milestone);
	}

	return (
		<Query query={fetchAllMilestones} selector={getAllMilestonesWithRepos}>
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
						<Navbar/>
						<Gantt
							onDateChange={onDateChange}
							onHover={onHover}
							data={data}
						/>						
					</div>
				);
			}}
		</Query>
	);
}

// function stateToProps (state, ownProps) {
// 	return {
// 		selectedData: getAllMilestones(state)
// 	}
// }

// function dispatchToProps (dispatch) {
// 	return {
// 		async fetchData () {
// 			await dispatch(fetchAllRepos());
// 			await dispatch(fetchMilestonesOfAllRepos());
// 		}
// 	};
// }

// export default connect(
// 	stateToProps,
// 	dispatchToProps
// )(Home);