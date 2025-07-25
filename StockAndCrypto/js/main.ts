import { getData, getCryptoData} from './apiData.js';
import domElements from './DomElement.js';
import { displayFullData, updateApiLimitUI, displayCryptoData }  from './ui.js'

updateApiLimitUI();
async function loadFullData() {
    try {
        let data = await getData();
        if (data)
        {
            const firstTen = Array.isArray(data) ? data.slice(0, 15) : data;
            displayFullData(firstTen);
            updateApiLimitUI();
        }
        else 
            showErrorMessage("Hisse senedi verileri yüklenemedi. Lütfen daha sonra tekrar deneyin.");
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function loadCryptData() {
  try {
    const data = await getCryptoData();
    displayCryptoData(data);

  } catch (error) {
    console.log("Error: ", error);
  }
}


export function showErrorMessage(message: string) {
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
                window.location.href = `./detailStock.html?symbol=${input}`;
			else if (btn.id === "searchCryptoBtn")
                window.location.href = `./detailCrypto.html?query=${input}`;
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
loadFullData();

