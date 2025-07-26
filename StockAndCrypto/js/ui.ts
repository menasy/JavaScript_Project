import domElements from "./DomElement.js"
import { apiLimitCounts } from "./ApiCount.js";
import configFile from "./config.js";

const refreshUpdateDate = () =>{
    const date = new Date();
    if (domElements.lastUpdate)
        domElements.lastUpdate.innerHTML = `Son Güncelleme: ${date.toLocaleString('tr-TR')}`;
}

function displayFullData(data: any) {
    if (!data || !domElements.stockFullData) {
        console.error("No data or container not found");
        return;
    }
    const stockData = domElements.stockFullData;
    stockData.innerHTML = '';

    if (Array.isArray(data) && data.length > 0 && data[0].symbol && data[0].description) {
        data.forEach((stock: any) => {
            const card = document.createElement('div');
            card.className = 'bg-gray-800 rounded-xl p-4 border border-gray-700 mb-4 cursor-pointer hover:scale-105 transition-all flex items-center shadow-lg';
            card.innerHTML = `
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold text-white">${stock.symbol}</span>
                        <span class="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">${stock.type ?? '--'}</span>
                    </div>
                    <div class="mt-2">
                        <span class="text-sm text-gray-300">${stock.description ?? '--'}</span>
                    </div>
                    <div class="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                        <span>Borsa: ${stock.mic ?? '--'}</span>
                        <span>Döviz: ${stock.currency ?? '--'}</span>
                        <span>FIGI: ${stock.figi ?? '--'}</span>
                        ${stock.displaySymbol ? `<span>Görüntüleme Sembolü: ${stock.displaySymbol}</span>` : ''}
                    </div>
                </div>
                <div class="ml-4 flex flex-col items-end">
                    <button class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm mt-2">Detay</button>
                </div>
            `;
            card.addEventListener('click', () => {
                window.location.href = `./detailStock.html?symbol=${stock.symbol}`;
            });
            stockData.appendChild(card);
        });
        refreshUpdateDate();
        return;
    }

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
                window.location.href = `./detailStock.html?symbol=${stock.symbol}`;
            });
            stockData.appendChild(stockCard);
        });
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
                window.location.href = `./detailCrypto.html?query=${coin.id}`;
            });
            container.appendChild(card);
        });
    } else {
        container.innerHTML = `<div class="text-center text-gray-400 py-8">Kripto para verisi bulunamadı.</div>`;
    }
}

function displayDetailsCrypto(detailDataCrypto: any) 
{
    domElements.marketCapEl && (domElements.marketCapEl.textContent = detailDataCrypto.market_data?.market_cap?.usd?.toLocaleString() ?? '--');
    domElements.priceUsdEl && (domElements.priceUsdEl.textContent = detailDataCrypto.market_data?.current_price?.usd?.toLocaleString() ?? '--');
    const change = detailDataCrypto.market_data?.price_change_percentage_24h ?? null;
    if (domElements.change24hEl) {
        domElements.change24hEl.textContent = change !== null ? `${change.toFixed(2)}%` : '--';
        domElements.change24hEl.className = `text-lg font-bold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`;
    }
    domElements.volumeEl && (domElements.volumeEl.textContent = detailDataCrypto.market_data?.total_volume?.usd?.toLocaleString() ?? '--');
    domElements.rankEl && (domElements.rankEl.textContent = detailDataCrypto.market_cap_rank?.toString() ?? '--');
    let desc = detailDataCrypto.description?.tr || detailDataCrypto.description?.en || '';
    domElements.descriptionEl && (domElements.descriptionEl.textContent = desc ? desc.replace(/<[^>]+>/g, '').slice(0, 300) : '--');
    domElements.lastUpdateEl && detailDataCrypto.last_updated &&
        (domElements.lastUpdateEl.textContent = `Son Güncelleme: ${new Date(detailDataCrypto.last_updated).toLocaleString('tr-TR')}`);

    if (domElements.symbolImageEl && detailDataCrypto.image?.large) {
        const imgEl = domElements.symbolImageEl as HTMLImageElement;
        imgEl.src = detailDataCrypto.image.large;
        imgEl.alt = detailDataCrypto.name;
    }
    if (domElements.symbolNameEl) {
        domElements.symbolNameEl.textContent = `${detailDataCrypto.name} (${detailDataCrypto.symbol?.toUpperCase()})`;
    }
    domElements.priceUsdTopEl && (domElements.priceUsdTopEl.textContent = detailDataCrypto.market_data?.current_price?.usd?.toLocaleString() ?? '--');
    if (domElements.homepageTopEl) {
        const homepage = detailDataCrypto.links?.homepage?.[0] ?? '';
        if (homepage) {
            domElements.homepageTopEl.innerHTML = `<a href="${homepage}" target="_blank" class="underline text-white hover:text-blue-200">Web Sitesi</a>`;
        } else {
            domElements.homepageTopEl.textContent = 'Web Sitesi';
        }
    }

    const supply = detailDataCrypto.market_data?.circulating_supply ?? '--';
    domElements.circulatingSupplyEl && (domElements.circulatingSupplyEl.textContent = supply.toLocaleString());

    const homepage = detailDataCrypto.links?.homepage?.[0] ?? '';
    if (domElements.homepageLinkEl) {
        domElements.homepageLinkEl.innerHTML = homepage
            ? `<a href="${homepage}" target="_blank" class="underline hover:text-blue-600">${homepage}</a>`
            : '--';
    }
    const stockFullDataEl = document.getElementById('stockFullData');
    if (stockFullDataEl) {
        stockFullDataEl.innerHTML = `
            <div class="flex flex-col md:flex-row items-center gap-6">
                <img src="${detailDataCrypto.image?.large}" alt="${detailDataCrypto.name}" class="w-24 h-24 rounded-full border-2 border-blue-400 shadow-lg mb-4 md:mb-0">
                <div>
                    <h2 class="text-3xl font-bold text-blue-400 mb-2">${detailDataCrypto.name} <span class="text-gray-400 text-xl">(${detailDataCrypto.symbol?.toUpperCase()})</span></h2>
                    <p class="text-gray-300 mb-2">${desc ? desc.replace(/<[^>]+>/g, '').slice(0, 120) : ''}</p>
                    <div class="flex flex-wrap gap-4 mt-2">
                        <span class="bg-gray-700 px-3 py-1 rounded text-sm">Fiyat: $${detailDataCrypto.market_data?.current_price?.usd?.toLocaleString() ?? '--'}</span>
                        <span class="bg-gray-700 px-3 py-1 rounded text-sm">Piyasa Değeri: $${detailDataCrypto.market_data?.market_cap?.usd?.toLocaleString() ?? '--'}</span>
                        <span class="bg-gray-700 px-3 py-1 rounded text-sm">Sıralama: #${detailDataCrypto.market_cap_rank ?? '--'}</span>
                        <span class="bg-gray-700 px-3 py-1 rounded text-sm">24s Değişim: ${change !== null ? `${change.toFixed(2)}%` : '--'}</span>
                        <span class="bg-gray-700 px-3 py-1 rounded text-sm">Dolaşımdaki Arz: ${supply}</span>
                        ${homepage ? `<a href="${homepage}" target="_blank" class="bg-blue-700 px-3 py-1 rounded text-sm text-white hover:bg-blue-800">Web Sitesi</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}

function displayDetailsStock(detailDataStock: any) {
    if (!detailDataStock) return;

    if (domElements.symbolImageEl) {
        (domElements.symbolImageEl as HTMLImageElement).src = detailDataStock.logo ?? "";
        (domElements.symbolImageEl as HTMLImageElement).alt = detailDataStock.ticker ?? "";
    }
    if (domElements.companyNameEl) {
        domElements.companyNameEl.textContent = detailDataStock.name ?? "--";
    }
    domElements.companyExchangeEl && (domElements.companyExchangeEl.textContent = detailDataStock.exchange ?? "--");
    domElements.companyIndustryEl && (domElements.companyIndustryEl.textContent = detailDataStock.finnhubIndustry ?? "--");
    if (domElements.companyWebUrlEl) {
        domElements.companyWebUrlEl.textContent = "Web Sitesi";
        domElements.companyWebUrlEl.setAttribute("href", detailDataStock.weburl ?? "#");
    }

    domElements.companyTickerEl && (domElements.companyTickerEl.textContent = detailDataStock.ticker ?? "--");
    domElements.companyCountryEl && (domElements.companyCountryEl.textContent = detailDataStock.country ?? "--");
    domElements.companyCurrencyEl && (domElements.companyCurrencyEl.textContent = detailDataStock.currency ?? "--");
    domElements.companyMarketCapEl && (domElements.companyMarketCapEl.textContent =
        detailDataStock.marketCapitalization !== undefined
            ? detailDataStock.marketCapitalization.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' M'
            : '--'
    );
    domElements.companyOutstandingEl && (domElements.companyOutstandingEl.textContent =
        detailDataStock.shareOutstanding !== undefined
            ? detailDataStock.shareOutstanding.toLocaleString('en-US', { maximumFractionDigits: 2 })
            : '--'
    );
    domElements.companyIpoEl && (domElements.companyIpoEl.textContent = detailDataStock.ipo ?? "--");
    domElements.companyPhoneEl && (domElements.companyPhoneEl.textContent = detailDataStock.phone ?? "--");

    domElements.lastUpdateEl && (domElements.lastUpdateEl.textContent = `Son Güncelleme: ${new Date().toLocaleString('tr-TR')}`);
	
}
function showErrorMessageInStockDetails(message: string) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-[60vh]">
                <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
                <h2 class="text-2xl font-bold text-red-400 mb-2">Hisse Bulunamadı</h2>
                <p class="text-gray-300 mb-4">${message || 'Aradığınız hisse senedi bulunamadı.'}</p>
                <a href="index.html" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Ana Sayfaya Dön
                </a>
            </div>
        `;
    }
}

function showErrorMessageInCoinDetails(message: string) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-[60vh]">
                <i class="fas fa-exclamation-triangle text-6xl text-orange-500 mb-4"></i>
                <h2 class="text-2xl font-bold text-orange-400 mb-2">Kripto Para Bulunamadı</h2>
                <p class="text-gray-300 mb-4">${message || 'Aradığınız kripto para bulunamadı.'}</p>
                <a href="index.html" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Ana Sayfaya Dön
                </a>
            </div>
        `;
    }
}
// Export the function for use in other modules
export { displayFullData , updateApiLimitUI, displayDetailsCrypto, displayDetailsStock, showErrorMessageInCoinDetails , showErrorMessageInStockDetails };