import { getData, getCryptoData } from './apiData.js';
import { displayDetailsCrypto, displayDetailsStock, showErrorMessageInCoinDetails, showErrorMessageInStockDetails} from './ui.js';
import domElements from "./DomElement.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("query");
const symbol = urlParams.get("symbol");
if (query) 
	loadCoinData(query)
else if (symbol)
	loadStockData(symbol.toUpperCase());

export async function loadCoinData(query:any){
	if (!query) {
		showErrorMessageInCoinDetails("Coin verileri yüklenemedi.");
		return;
	}
	try {
		const data = await getCryptoData(`coins/${query}`);
		if (!data || Object.keys(data).length === 0) {
			showErrorMessageInCoinDetails("Coin verileri bulunamadı.");
		} else
			displayDetailsCrypto(data);
	} catch (error) {
		showErrorMessageInCoinDetails("Coin verileri yüklenemedi.");
		console.error("Hata:", error);
	}
}

export async function loadStockData(query:any){
	if (!query) {
		showErrorMessageInStockDetails("Hisse verileri yüklenemedi.");
		return;
	}
	try {
		const data = await getData(`stock/profile2?symbol=${query}&`);
		console.log("data->", data);
		if (!data || Object.keys(data).length === 0) {
			showErrorMessageInStockDetails("Hisse verileri bulunamadı.");
		} else 
			displayDetailsStock(data);
	} catch (error) {
		showErrorMessageInStockDetails("Hisse verileri yüklenemedi.");
		console.error("Hata:", error);
	}
}
domElements

