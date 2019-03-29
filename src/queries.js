import gql from "graphql-tag";

export const GET_MILESTONES = gql`
	{
		viewer {
			name
			avatarUrl
			repositories (first: 100) {
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
									issues(first:100) {
										edges {
											node {
												id
												title
												closed
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
