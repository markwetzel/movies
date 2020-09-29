/* eslint-disable react/jsx-pascal-case */

import Config from '../types/Config';
import MovieResult from '../types/MovieResult';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import WatchLaterResult from './WatchLaterResult';
import { createMuiTheme } from '@material-ui/core';
import styled from '@emotion/styled/macro';

const theme = createMuiTheme();

export const $ResponsiveTableCell = styled(TableCell)`
  ${theme.breakpoints.down('xs')} {
    display: none !important;
  }
`;

export interface WatchLaterResultsProps {
  movies: MovieResult[];
  tmdbConfig?: Config;
  onRemoveClick(movieResultId: number): void;
}

const WatchLaterResults: React.FunctionComponent<WatchLaterResultsProps> = (
  props
) => {
  const { movies, tmdbConfig } = props;
  const movieTable = (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <$ResponsiveTableCell align='right'>Rating</$ResponsiveTableCell>
            <TableCell align='right'>Release Date</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <WatchLaterResult
              key={movie.id}
              onRemoveClick={props.onRemoveClick}
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

export default WatchLaterResults;
