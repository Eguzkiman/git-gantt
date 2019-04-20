import React, { useEffect } from 'react';

import Gantt from 'components/gantt';
import Navbar from 'components/navbar';

import Query from "containers/query";
import flattenArray from 'utils/flatten-array';

import {
	getAllRepos,
	getMilestonesByRepo
} from 'fetcher';

export default function Home (props) {

	async function getData () {
		let repos = await getAllRepos();
		let milestonesByRepo = await Promise.all(repos.data.map(repo => getMilestonesByRepo(repo)));
		let milestones = flattenArray(milestonesByRepo.map(i => i.data));
		return milestones;
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
							data={data}
						/>
					</div>
				);
			}}
		</Query>
	);
}
						// {data.map(repo => (
						// 	<p key={repo.id}>{repo.title}</p>
						// ))}