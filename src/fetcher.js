import axios from 'axios';

const API_HOST ='https://git-gantt-api.herokuapp.com';

const Fetcher = {
	getGithubAccessToken (code, redirect_uri) {
		let url = API_HOST + '/exchange_github_code';
		
		return axios.post(url, { code, redirect_uri });
	}

}
export default Fetcher;