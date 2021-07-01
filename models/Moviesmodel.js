import 'bootstrap/dist/css/bootstrap.min.css';

class Movie {
    constructor(moviesData) {
      this.title = moviesData.original_title
      this.votes = moviesData.vote_count
      this.img ='http://image.tmdb.org/t/p/w342'+moviesData.poster_path;
    }
  }

module.exports=Movie
