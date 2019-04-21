import axios from 'axios';

const GITHUB_HOST = "https://api.github.com";

// Axios instance for GitHub
const ghAxios = axios.create({
	baseURL: GITHUB_HOST
});

export const getAllRepos = () => 
	ghAxios(`/user/repos?per_page=100`);

export const getMilestonesByRepo = params => 
	// Adds a timestamp to prevent browser cache
	ghAxios(`/repos/${params.owner.login}/${params.name}/milestones?state=all&timestamp=${new Date().getTime()}`)

export const updateMilestone = (newMilestone) =>
	ghAxios.patch(newMilestone.url, newMilestone);

export default ghAxios;