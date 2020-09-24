import * as React from 'react';

import Config from './Config';
import MovieResult from './MovieResult';
import MovieResults from './MovieResults';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axiosConfig from './axios';
import { makeStyles } from '@material-ui/core/styles';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [movies, setMovies] = React.useState<MovieResult[]>([]);
  const [query, setQuery] = React.useState('');
  const [tmdbConfig, setTmdbConfig] = React.useState<Config>();

  // Get the TMDB configuration
  React.useEffect(() => {
    axiosConfig
      .get(`configuration?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
      .then((res) => {
        const config = res.data as Config;
        setTmdbConfig(config);
      })
      .catch((err) => {
        console.log('Error retrieving config');
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosConfig
      .get(
        `search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
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
      <MovieResults tmdbConfig={tmdbConfig} movies={movies} />
    </div>
  );
};

export default App;
