import React, { useState } from 'react';
import { connect } from 'react-redux';

import Gantt from 'components/gantt';
import Navbar from 'components/navbar';

import Query from "containers/query";
import flattenArray from 'utils/flatten-array';

import {
	fetchAllRepos,
	fetchMilestonesByRepo,
	updateMilestone
} from 'fetcher';

function Home (props) {

	async function getData () {
		let repos = await fetchAllRepos();
		let milestonesByRepo = await Promise.all(repos.data.map(repo => 
			fetchMilestonesByRepo(repo).then(milestones => 
				milestones.data.map(milestone => ({ ...milestone, repo }))
			)
		));
		return flattenArray(milestonesByRepo);
	}

	async function onDateChange (milestone) {
		updateMilestone(milestone)
	}

	return (
		<Query query={getData}>
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
							data={data}
						/>
					</div>
				);
			}}
		</Query>
	);
}

function stateToProps (state) {
	return {};
}

function dispatchToProps (dispatch) {
	return {};
}

export default connect(
	stateToProps,
	dispatchToProps
)(Home);