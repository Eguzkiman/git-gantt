import axios from 'axios';

// const GITHUB_HOST = "https://api.github.com";
const GITHUB_HOST = (process.env.NODE_ENV === 'test') ? 'http://localhost:9001' : 'https://api.github.com';
// const GITHUB_HOST = "http://localhost:9001";

axios.defaults.baseURL = GITHUB_HOST;

export const fetchAllRepos = () => {
	return axios.get(`/user/repos?per_page=100`);
}

export const fetchMilestonesByRepo = params => 
	// Adds a timestamp to prevent browser cache
	axios.get(`/repos/${params.owner.login}/${params.name}/milestones?state=all&timestamp=${new Date().getTime()}`)

export const updateMilestone = (newMilestone) =>
	axios.patch(newMilestone.url, newMilestone);

export const fetchIssuesByRepo = params => 
	axios.get(`/repos/${params.owner.login}/${params.name}/issues`)

export default axios;