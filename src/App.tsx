import * as React from 'react';

import MovieResult from './MovieResult';
import axiosConfig from './axios';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [movies, setMovies] = React.useState<MovieResult[]>([]);
  const [movieSearch, setMovieSearch] = React.useState('');

  React.useEffect(() => {
    axiosConfig
      .get(
        `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=boondock&page=1&include_adult=false`
      )
      .then((res) => {
        const { results: movieResults } = res.data;
        console.log(movieResults);
        setMovies(movieResults);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Submit');
  };

  return (
    <div>
      Movies
      <form onSubmit={handleSubmit}>
        <input
          id='movie-name'
          name='movie-name'
          onChange={(e) => setMovieSearch(e.target.value)}
          placeholder='Search movies...'
          type='search'
          value={movieSearch}
        />
        <button>Search</button>
      </form>
      {movies.map((movie) => (
        <article key={movie.id}>
          <header>{movie.title}</header>
        </article>
      ))}
    </div>
  );
};

export default App;
