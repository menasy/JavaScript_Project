import configFile  from './config.js';
export let apiLimitCounts = 0;
export async function getData(query:string = "&symbols=AAPL")
{
	if (apiLimitCounts == configFile.config.API_LIMIT)
	{
		alert("API Kullanım liitiniz dolmuştur.");
		return;
	}

	let fulpath:string = configFile.config.BASE_URL + `access_key=${configFile.config.API_KEY}`+ query;
	console.log(fulpath);
	try{
		const response = await fetch(fulpath,configFile.options);
		if (response.ok)
		{
			const data = await response.json();
			apiLimitCounts++;
			return data;
		}
		else
			throw new Error("Failed to fetch data");

	}catch(error){
		console.log("Error: ", error);
	}
}

export async function getCryptoData(query:string = "search/trending")
{
	let fulpath:string = configFile.config.CRYPTO_BASE_URL + query + `?x_cg_demo_api_key=${configFile.config.CRYPTO_API_KEY}`;
	console.log("PATH->", fulpath);
	try{
		const response = await fetch(fulpath,configFile.options);
		if (response.ok)
		{
			const data = await response.json();
			return data;
		}
		else
			throw new Error("Failed to fetch data");

	}catch(error){
		console.log("Error: ", error);
	}
}
