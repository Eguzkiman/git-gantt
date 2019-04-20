import axios from 'axios';

const GITHUB_HOST = "https://api.github.com";

export default axios.create();

export const getAllRepos = () => 
	axios(`${GITHUB_HOST}/user/repos`);


export const getMilestonesByRepo = (params) => 
	axios(`${GITHUB_HOST}/repos/${params.owner.login}/${params.name}/milestones`)