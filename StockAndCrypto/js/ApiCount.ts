interface ApiCountData {
    count: number;
    date: string;
}

function getApiCountData(): ApiCountData {
    const stored = localStorage.getItem('apiCountData');
    const today = new Date().toDateString();
    
    if (stored) {
        const data: ApiCountData = JSON.parse(stored);
        if (data.date !== today) {
            return { count: 0, date: today };
        }
        return data;
    }
    
    return { count: 0, date: today };
}

function saveApiCountData(data: ApiCountData) {
    localStorage.setItem('apiCountData', JSON.stringify(data));
}
let apiCountData = getApiCountData();
export let apiLimitCounts = apiCountData.count;

export function incrementApiCount() 
{
    apiLimitCounts++;
    apiCountData.count = apiLimitCounts;
    saveApiCountData(apiCountData);
}