import React, { useState, useEffect } from 'react';

import Gantt from 'components/gantt';
import Navbar from 'components/navbar';

import Query from "containers/query";
import flattenArray from 'utils/flatten-array';

import {
	getAllRepos,
	getMilestonesByRepo,
	updateMilestone
} from 'fetcher';

export default function Home (props) {

	async function getData () {
		let repos = await getAllRepos();
		let milestonesByRepo = await Promise.all(repos.data.map(repo => 
			getMilestonesByRepo(repo).then(milestones => 
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