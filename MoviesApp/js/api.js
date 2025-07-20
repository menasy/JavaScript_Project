import config from "./config.js";
const options = {
	method: 'GET',
	headers:{
		accept:'application/json',
		Authorization:config.AUTHORIZATION
	}
};
export async function getData(query = 'include_adult=false&page=1&sort_by=popularity.desc', key)
{
	let path;
	key == 'load' ? path = `${config.BASE_URL}` : path = `${config.MOVIE_ONE_URL}`;
	console.log('Fetching data from:', path + query);
	try{
		const response = await fetch(`${path}${query}`, options);
		if(response.ok)
		{
			const data = await response.json()
			return data;	
		}
		else
			throw new Error('Failed to fetch data');
	}catch(error){
		console.log('Error:',error);
	}
}