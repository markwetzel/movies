import * as React from 'react';

import MovieResult from './MovieResult';
import axiosConfig from './axios';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [movies, setMovies] = React.useState<MovieResult[]>([]);
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosConfig
      .get(
        `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      )
      .then((res) => {
        const { results: movieResults } = res.data;
        setMovies(movieResults);
      });
  };

  return (
    <div>
      Movies
      <form onSubmit={handleSubmit}>
        <input
          id='movie-name'
          name='movie-name'
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search movies...'
          type='search'
          value={query}
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
