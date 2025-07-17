let moviesBar = document.getElementById("moviesGrid");

function displayMovies(movies, onMovieClick) {
    moviesBar.innerHTML = '';
    movies.forEach(movie => {
        const posterUrl = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
        
        const overview = movie.overview.length > 150 
            ? movie.overview.substring(0, 150) + '...' 
            : movie.overview;
        
        const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Bilinmiyor';
        
        moviesBar.innerHTML += `
            <div class="movie-card" data-movie-id="${movie.id}">
                <div class="movie-poster">
                    <img src="${posterUrl}" alt="${movie.title}" loading="lazy">
                    <div class="movie-rating">
                        <i class="fas fa-star"></i>
                        ${movie.vote_average.toFixed(1)}
                    </div>
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-year">${releaseYear}</div>
                    <p class="movie-overview">${overview}</p>
                </div>
            </div>
        `;
    });
    if (onMovieClick) {
        const movieCards = moviesBar.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            card.addEventListener('click', function() {
                const movieId = this.getAttribute('data-movie-id');
                onMovieClick(movieId);
            });
        });
    }
}

function displayOneMovie(movieData) {
    const posterUrl = movieData.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` 
        : 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
    
    const backdropUrl = movieData.backdrop_path 
        ? `https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}` 
        : '';
    
    const genres = movieData.genres.map(genre => 
        `<span class="genre-tag">${genre.name}</span>`
    ).join('');
    
    const companies = movieData.production_companies.map(company => company.name).join(', ');
    
    const languages = movieData.spoken_languages.map(lang => lang.english_name).join(', ');
    
    const releaseDate = new Date(movieData.release_date).toLocaleDateString('tr-TR');
    
    const runtime = `${Math.floor(movieData.runtime / 60)}sa ${movieData.runtime % 60}dk`;
    
    moviesBar.innerHTML = `
        <div class="movie-detail">
            ${backdropUrl ? `<div class="movie-backdrop" style="background-image: url('${backdropUrl}')"></div>` : ''}
            
            <div class="movie-detail-content">
                <button class="back-btn" id="backBtn">
                    <i class="fas fa-arrow-left"></i>
                    Geri Dön
                </button>
                
                <div class="movie-detail-main">
                    <div class="movie-detail-poster">
                        <img src="${posterUrl}" alt="${movieData.title}">
                        <div class="movie-detail-rating">
                            <i class="fas fa-star"></i>
                            <span>${movieData.vote_average.toFixed(1)}</span>
                            <small>(${movieData.vote_count} oy)</small>
                        </div>
                    </div>
                    
                    <div class="movie-detail-info">
                        <h1 class="movie-detail-title">${movieData.title}</h1>
                        ${movieData.tagline ? `<p class="movie-tagline">"${movieData.tagline}"</p>` : ''}
                        
                        <div class="movie-genres">
                            ${genres}
                        </div>
                        
                        <div class="movie-meta">
                            <div class="meta-item">
                                <i class="fas fa-calendar"></i>
                                <span>Çıkış Tarihi: ${releaseDate}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-clock"></i>
                                <span>Süre: ${runtime}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-language"></i>
                                <span>Dil: ${languages}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-dollar-sign"></i>
                                <span>Bütçe: $${movieData.budget.toLocaleString()}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-chart-line"></i>
                                <span>Hasılat: $${movieData.revenue.toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <div class="movie-overview">
                            <h3>Özet</h3>
                            <p>${movieData.overview}</p>
                        </div>
                        
                        <div class="movie-companies">
                            <h4>Yapım Şirketleri</h4>
                            <p>${companies}</p>
                        </div>
                        
                        <div class="movie-actions">
                            <a href="https://www.imdb.com/title/${movieData.imdb_id}" target="_blank" class="action-btn imdb-btn">
                                <i class="fab fa-imdb"></i>
                                IMDb'de Görüntüle
                            </a>
                            ${movieData.homepage ? `
                                <a href="${movieData.homepage}" target="_blank" class="action-btn homepage-btn">
                                    <i class="fas fa-home"></i>
                                    Resmi Website
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

const ui = {
    displayMovies: displayMovies,
    displayOneMovie: displayOneMovie,
    moviesBar: moviesBar
}

export default ui;