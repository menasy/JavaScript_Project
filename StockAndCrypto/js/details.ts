import { showErrorMessage } from "./main.js";
import { getData, getCryptoData } from './apiData.js';
import domElements from './DomElement.js';
import { displayDetailsCrypto, displayDetailsStock } from './ui.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("query");
const symbol = urlParams.get("symbol");
if (query ) 
	loadCoinData(query)
else if (symbol)
	loadStockData(symbol)

export async function loadCoinData(query:any){
	console.log("Query:", query);
	if (!query) {
		showErrorMessage("Coin parametresi bulunamadı.");
		return;
	}
	try {
		const data = await getCryptoData(`coins/${query}`);
		displayDetailsCrypto(data);
	} catch (error) {
		console.error("Hata:", error);
	}
}

export async function loadStockData(query:any){
	console.log("Query_STOCK:", query);
	if (!query) {
		showErrorMessage("Hisse parametresi bulunamadı.");
		return;
	}
	try {
		const data = await getData(`stock/profile2?symbol=${query}&`);
		displayDetailsStock(data);
	} catch (error) {
		console.error("Hata:", error);
	}
}


