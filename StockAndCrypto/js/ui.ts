import domElements from "./DomElement.js"
import { apiLimitCounts } from "./apiData.js";
import configFile from "./config.js";


const refreshUpdateDate = () =>{
	let date = new Date();
    if (domElements.lastUpdate)
		domElements.lastUpdate.innerHTML = `Son Güncelleme: ${date}`;
}

function displayFullData(data: any) {
    if (!data || !domElements.stockFulLData) {
        console.error("No data or container not found");
        return;
    }
	const stockData = domElements.stockFulLData;
    stockData.innerHTML = '';

    if (data.data && Array.isArray(data.data)) {
        const stockMap = new Map();
        data.data.forEach((item: any) => {
            if (!stockMap.has(item.symbol) || new Date(item.date) > new Date(stockMap.get(item.symbol).date)) {
                stockMap.set(item.symbol, item);
            }
        });

        Array.from(stockMap.values()).forEach((stock: any) => {
            const change = stock.close - stock.open;
            const changePercent = stock.open !== 0 ? ((change / stock.open) * 100).toFixed(2) : '0.00';
            const changeColor = change >= 0 ? 'text-green-400' : 'text-red-400';

            const stockCard = document.createElement('div');
            stockCard.className = 'bg-gray-700 rounded-lg p-4 border border-gray-600 mb-4 cursor-pointer hover:bg-gray-600 transition-colors';
            stockCard.innerHTML = `
                <div class="flex justify-between items-center mb-3">
                    <div>
                        <h3 class="text-lg font-bold text-white">${stock.symbol}</h3>
                        <p class="text-sm text-gray-300">${stock.exchange}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xl font-bold text-white">$${stock.close.toFixed(2)}</p>
                        <p class="text-sm ${changeColor}">${change >= 0 ? '+' : ''}${change.toFixed(2)} (${change >= 0 ? '+' : ''}${changePercent}%)</p>
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-3 text-sm">
                    <div><p class="text-gray-400">Açılış</p><p class="text-white">$${stock.open.toFixed(2)}</p></div>
                    <div><p class="text-gray-400">Yüksek</p><p class="text-green-400">$${stock.high.toFixed(2)}</p></div>
                    <div><p class="text-gray-400">Düşük</p><p class="text-red-400">$${stock.low.toFixed(2)}</p></div>
                    <div><p class="text-gray-400">Hacim</p><p class="text-white">${stock.volume.toLocaleString()}</p></div>
                </div>
            `;
            refreshUpdateDate();
            stockCard.addEventListener('click', () => {
                window.location.href = `./detailSeymbol.html?symbol=${stock.symbol}`;
            });
            stockData.appendChild(stockCard);
        });
    }
}

function displayData(oneData: any) {
    if (!oneData || !domElements.stockFulLData) {
        console.error("Veri bulunamadı veya konteyner bulunamadı");
        return;
    }
    
    const stockData = domElements.stockFulLData;
    stockData.innerHTML = '';
    
    if (oneData.data && oneData.data.length > 0) {
        const stock = oneData.data[0];
        const change = stock.close - stock.open;
        const changePercent = stock.open !== 0 ? ((change / stock.open) * 100).toFixed(2) : '0.00';
        const changeColor = change >= 0 ? 'text-green-400' : 'text-red-400';
        
        stockData.innerHTML = `
            <div class="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <div class="text-center mb-6">
                    <h1 class="text-3xl font-bold text-white">${stock.symbol}</h1>
                    <p class="text-lg text-gray-300">${stock.exchange}</p>
                    <p class="text-4xl font-bold text-white mt-2">$${stock.close.toFixed(2)}</p>
                    <p class="text-lg ${changeColor}">${change >= 0 ? '+' : ''}${change.toFixed(2)} (${change >= 0 ? '+' : ''}${changePercent}%)</p>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-gray-800 p-4 rounded-lg">
                        <p class="text-gray-400 text-sm">Açılış</p>
                        <p class="text-white text-xl font-bold">$${stock.open.toFixed(2)}</p>
                    </div>
                    <div class="bg-gray-800 p-4 rounded-lg">
                        <p class="text-gray-400 text-sm">Yüksek</p>
                        <p class="text-green-400 text-xl font-bold">$${stock.high.toFixed(2)}</p>
                    </div>
                    <div class="bg-gray-800 p-4 rounded-lg">
                        <p class="text-gray-400 text-sm">Düşük</p>
                        <p class="text-red-400 text-xl font-bold">$${stock.low.toFixed(2)}</p>
                    </div>
                    <div class="bg-gray-800 p-4 rounded-lg">
                        <p class="text-gray-400 text-sm">Hacim</p>
                        <p class="text-white text-xl font-bold">${stock.volume.toLocaleString()}</p>
                    </div>
                </div>
                
                <div class="mt-6 text-center">
                    <p class="text-gray-400 text-sm">Son Güncelleme: ${new Date(stock.date).toLocaleDateString('tr-TR')}</p>
                </div>
            </div>
        `;
		refreshUpdateDate();
    }
}

function updateApiLimitUI() {
    const apiCallsEl = document.getElementById('apiCalls');
    if (apiCallsEl) {
        const limit = configFile.config.API_LIMIT;
        apiCallsEl.textContent = `${apiLimitCounts}/${limit}`;
    }
}

export function displayCryptoData(cryptoData: any) {
    if (!cryptoData || !domElements.cryptoFullData) {
        console.error("Veri bulunamadı");
        return;
    }
    const container = domElements.cryptoFullData;
    container.innerHTML = '';

    if (cryptoData.coins && Array.isArray(cryptoData.coins)) {
        cryptoData.coins.forEach((coinObj: any) => {
            const coin = coinObj.item;
            const price = coin.data?.price ?? 0;
            const priceChange = coin.data?.price_change_percentage_24h?.usd ?? 0;
            const changeColor = priceChange >= 0 ? 'text-green-400' : 'text-red-400';
            const marketCap = coin.data?.market_cap ?? '--';

            const card = document.createElement('div');
            card.className = 'bg-gray-800 rounded-xl p-4 border border-gray-700 mb-4 cursor-pointer hover:scale-105 transition-all flex items-center shadow-lg';
            card.innerHTML = `
                <img src="${coin.large}" alt="${coin.name}" class="w-14 h-14 rounded-full mr-4 border-2 border-gray-600 shadow">
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold text-white">${coin.name}</span>
                        <span class="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">${coin.symbol}</span>
                    </div>
                    <div class="flex items-center mt-2">
                        <span class="text-xl font-bold text-white mr-3">$${price.toLocaleString(undefined, {maximumFractionDigits: 8})}</span>
                        <span class="${changeColor} text-sm font-semibold">${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%</span>
                    </div>
                    <div class="flex items-center mt-2 text-xs text-gray-400">
                        <span>Piyasa Sırası: #${coin.market_cap_rank ?? '--'}</span>
                        <span class="mx-2">|</span>
                        <span>Piyasa Değeri: ${marketCap}</span>
                    </div>
                </div>
            `;
			refreshUpdateDate();
            card.addEventListener('click', () => {
                window.location.href = `./detailSeymbol.html?symbol=${coin.symbol}`;
            });
            container.appendChild(card);
        });
    } else {
        container.innerHTML = `<div class="text-center text-gray-400 py-8">Kripto para verisi bulunamadı.</div>`;
    }
}

// Export the function for use in other modules
export { displayFullData, displayData, updateApiLimitUI };