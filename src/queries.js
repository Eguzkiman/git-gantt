import gql from "graphql-tag";

export const GET_MILESTONES = gql`
	{
		rateLimit {
			limit
			cost
			remaining
			resetAt
		}
		viewer {
			name
			login
			avatarUrl
			repositories(first: 50) {
				edges {
					node {
						id
						name
						milestones(first: 10) {
							edges {
								node {
									id
									title
									dueOn
									createdAt
									description
									url
									closed
									issues(first: 20) {
										edges {
											node {
												id
												title
												closed
												assignees(first:5) {
													edges {
														node {
															id
															name
															login
															avatarUrl
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

`;
