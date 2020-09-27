import Config from '../types/Config';
import MovieResult from '../types/MovieResult';
import MovieResultJsx from './MovieResult';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export interface MovieResultsProps {
  movies: MovieResult[];
  tmdbConfig?: Config;
}

const MovieResults: React.FunctionComponent<MovieResultsProps> = (props) => {
  const { movies, tmdbConfig } = props;
  const movieTable = (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align='right'>Rating</TableCell>
            <TableCell align='right'>Release Date</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <MovieResultJsx
              key={movie.id}
              row={movie}
              tmdbConfig={tmdbConfig}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return movies.length > 0 ? movieTable : null;
};

export default MovieResults;
