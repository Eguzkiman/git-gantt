import axios from 'axios';

const GITHUB_HOST = "https://api.github.com";

export const context = {
	headers: {}
};

export const getAllRepos = () => {
	console.log('getting all repos')
	return axios({
		...context,
		url: `${GITHUB_HOST}/user/repos`
	});

}

export const getMilestonesByRepo = (params) => axios({
	...context,
	url: `${GITHUB_HOST}/repos/${params.owner.login}/${params.name}/milestones`
})