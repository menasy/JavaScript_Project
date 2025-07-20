import { getData, getCryptoData} from './apiData.js';
import domElements from './DomElement.js';
import { displayFullData, displayData, updateApiLimitUI, displayCryptoData }  from './ui.js'

const stockTickers: string[] = [
    "AAPL",      // Apple
    "MSFT",      // Microsoft
    "GOOGL",     // Alphabet
    "AMZN",      // Amazon
    "TSLA",      // Tesla
];

const defaulQuery:string = "&symbols=";

async function loadData(search: string) {
  try {
    const symbolQuery = defaulQuery + search;
    const data = await getData(symbolQuery);
    displayData(data);

	updateApiLimitUI();
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function loadFullData() {
    try {
        console.log("Hisse senedi verileri yükleniyor...");
        const queryPromises = stockTickers.map(symbol => {
            const symbolQuery = defaulQuery + symbol;
            return getData(symbolQuery);
        });
        const dataArray = await Promise.all(queryPromises);
        console.log("Tüm veriler:", dataArray);       
       if (dataArray && dataArray.length > 0)
	   {
		   displayFullData(dataArray);
		
      		updateApiLimitUI();
	   }
        else 
            showErrorMessage("Hisse senedi verileri yüklenemedi. Lütfen daha sonra tekrar deneyin.");
        
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function loadCryptData(search: string ="search/trending") {
  try {
    const data = await getCryptoData(search);
    displayCryptoData(data);

  } catch (error) {
    console.log("Error: ", error);
  }
}


function showErrorMessage(message: string) {
    const container = document.getElementById("stockFulLData");
    if (container) {
        container.innerHTML = `
            <div class="bg-red-700 rounded-lg p-4 border border-red-600">
                <div class="text-center">
                    <h4 class="text-lg font-bold text-white mb-2">Hata</h4>
                    <p class="text-red-200">${message}</p>
                </div>
            </div>
        `;
    }
}
function butHandler(event: Event)
{
	if (!domElements.symbolInput)
	{
		showErrorMessage("Input elementi bulunamadı.");
        return;
	}
	const input:string = (domElements.symbolInput as HTMLInputElement).value.trim();
	(domElements.symbolInput as HTMLInputElement).value = '';
	if (!input)
		showErrorMessage("Lütfen bir değer girin.");
	else
	{
		try{
			const btn = event.currentTarget as HTMLElement;
			if (btn.id === "searchStockBtn")
				loadData(input);
			else if (btn.id === "searchCryptoBtn")
				loadCryptData(input);
		}catch(error){
			showErrorMessage("Error: " + error);
		}
	}

}
domElements.searchStock?.addEventListener('click',butHandler);
domElements.searchCrypto?.addEventListener('click',butHandler);
domElements.refreshBtn?.addEventListener('click', () =>{
	loadFullData();
	loadCryptData();
})
loadCryptData();
// loadFullData();
export default loadData;
