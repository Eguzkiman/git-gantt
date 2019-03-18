import React, { Component } from 'react';
import './App.css';

import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_MILESTONES = gql`
	{
		viewer {
			name
			repositories (first: 100) {
				edges {
					node {
						id
						name
						milestones(first: 100) {
							edges {
								node {
									id
									title
									dueOn

								}
							}
						}
					}
				}
			}
		}
	}
`;

class App extends Component {
	render() {
		return (
			
				<div className="App">
					<Query query={GET_MILESTONES}>
						{({ loading, error, data }) => {
							if (loading) return "Loading...";
							if (error) return `Error! ${error.message}`;

							return (
								<div>
								<h1>Hello {data.viewer.name}</h1>
								<Frappe
									repositories={data.viewer.repositories}
								/>
								</div>
							);
						}}
					</Query>
				</div>
			
		);
	}
}

function Frappe (props) {
	return (
		props.repositories.edges.map(repo => (
			<div key={repo.node.id}>
				<h4>name: {repo.node.name}</h4>
				<ul>
					{repo.node.milestones.edges.map(milestone => (
						<li key={milestone.node.id}>
							{milestone.node.title} [{milestone.node.dueOn}]
						</li>	
					))}
				</ul>
			</div>
		))
	);
}

export default App;