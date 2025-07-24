import { showErrorMessage } from "./main.js";
import { getData, getCryptoData } from './apiData.js';
import domElements from './DomElement.js';
import { displayDetailsCrypto } from './ui.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("query");
loadCoinData(query)
export async function loadCoinData(query:any){
	console.log("Query:", query);
	if (!query) {
		showErrorMessage("ID parametresi bulunamadı.");
		return;
	}
	try {
		const data = await getCryptoData(`search?query=${query}&`);
		displayDetailsCrypto(data);
	} catch (error) {
		console.error("Hata:", error);
	}
}
