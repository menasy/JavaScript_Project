import { getData } from './api.js';
import ui from "./uiCreator.js";
import { inputParameters, takeInput, indexElement } from './utils.js';

const defaultLanguage = 'en-US';
const defaultSort = 'popularity.desc';

async function loadMovies(input) {
	let queryText;
	input ? queryText = `search/movie?query=${input}` : queryText = 'discover/movie?';
	let query = `${queryText}&include_adult=${inputParameters.adultChecked}&page=${inputParameters.page}&sort_by=${inputParameters.sortValue}&language=${inputParameters.languageValue}`;
	try {
        const moviesData = await getData(query,"load");
        if (moviesData && moviesData.results) {
            console.log(moviesData);
            ui.displayMovies(moviesData.results, movieDetail);
        }
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}
function searchHandler(){
	takeInput();
    let input = inputParameters.searchValue;
	indexElement.searchInput.value = ``;
	loadMovies(input);
}
function loadMoreMovies() {
	inputParameters.page += 1;
	searchHandler();
}
searchHandler();

async function movieDetail(movieId)
{
	takeInput();
	let query = `${movieId}?language=${inputParameters.languageValue}`;
	try {
        const movieData = await getData(query,"detail");
        if (movieData) {
            console.log('Movie detail data:', movieData);
            ui.displayOneMovie(movieData);
                        const backBtn = document.getElementById('backBtn');
            if (backBtn) {
                backBtn.addEventListener('click', function() {
                    searchHandler(); 
                });
            }
        }
    } catch (error) {
        console.error('Error loading movie details:', error);
    }    
}

indexElement.searchBtn.addEventListener('click', searchHandler);
indexElement.adult.addEventListener('change',searchHandler)
indexElement.sortSelect.addEventListener('change', searchHandler);
indexElement.language.addEventListener('change', searchHandler);
indexElement.loadMore.addEventListener('click', loadMoreMovies);

indexElement.searchInput.addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		searchHandler();
	}
});
indexElement.clearFilter.addEventListener('click', () => { 
	indexElement.searchInput.value = '';
	inputParameters.searchValue = '';
	indexElement.sortSelect.value = defaultSort;
	inputParameters.sortValue = defaultSort;
	indexElement.language.value = defaultLanguage;
	indexElement.adult.checked = false;
	inputParameters.page = 1;
	searchHandler();
});
