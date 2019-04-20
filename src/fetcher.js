import axios from 'axios';

const GITHUB_HOST = "https://api.github.com";

// Axios instance for GitHub
const ghAxios = axios.create({
	baseURL: GITHUB_HOST
});

export const getAllRepos = () => 
	ghAxios(`/user/repos`);


export const getMilestonesByRepo = (params) => 
	ghAxios(`/repos/${params.owner.login}/${params.name}/milestones`)

export default ghAxios;