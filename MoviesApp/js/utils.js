const indexElement = {
	searchBtn: document.getElementById("searchBtn"),
	searchInput: document.getElementById("searchInput"),
	sortSelect: document.getElementById("sortSelect"),
	language: document.getElementById("languageSelect"),
	adult : document.getElementById("adultFilter"),
	clearFilter: document.getElementById("resetFilters"),
	loadMore: document.getElementById("loadMoreBtn"),
	movieList: document.querySelectorAll("moviesGrid")
}
const inputParameters = {
	sortValue: indexElement.sortSelect.value, 
	languageValue: indexElement.language.value,
	searchValue: indexElement.searchInput.value.trim(),
	adultChecked: indexElement.adult.checked,
	page : 1
}

function takeInput() {
	inputParameters.sortValue = indexElement.sortSelect.value;
	inputParameters.languageValue = indexElement.language.value;
	inputParameters.searchValue = indexElement.searchInput.value.trim();
	inputParameters.adultChecked = indexElement.adult.checked;
}

export { inputParameters, takeInput, indexElement };
export default indexElement;
