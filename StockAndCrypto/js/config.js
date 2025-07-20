const configFile = {
  options: {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  },

  config: {
    API_KEY: 'a88a40429c24470a71738053c559c78c',
    BASE_URL: 'http://api.marketstack.com/v2/eod?',
	API_LIMIT: 25,

	CRYPTO_BASE_URL: 'https://api.coingecko.com/api/v3/',
	CRYPTO_API_KEY: 'CG-3tfKWdhRny2HYiipsc1iRC9A',
  }
};


export default configFile;