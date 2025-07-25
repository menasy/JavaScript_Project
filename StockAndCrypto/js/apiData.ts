import configFile from "./config.js";
export let apiLimitCounts = 0;


export async function getData(query:string = "stock/symbol?exchange=US&")
{
	if (apiLimitCounts == configFile.config.API_LIMIT)
	{
		alert("API Kullanım liitiniz dolmuştur.");
		return;
	}

	let fulpath:string = configFile.config.BASE_URL + query + `token=${configFile.config.API_KEY}`;
	console.log(fulpath);
	try{
		const response = await fetch(fulpath,configFile.optionsStock);
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

export async function getCryptoData(query:string = "search/trending?")
{	

	let fulpath:string = configFile.config.CRYPTO_BASE_URL + query;
	console.log("PATH->", fulpath);
	try{
		const response = await fetch(fulpath,configFile.optionsCrypto);
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
