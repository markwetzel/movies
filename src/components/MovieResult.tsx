import * as React from 'react';

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';

import Config from '../types/Config';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MR from '../types/MovieResult';
import MovieMenu from './MovieMenu';

export interface MovieResult {
  row: MR;
  tmdbConfig?: Config;
}

const MovieResultJsx: React.FunctionComponent<MovieResult> = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  let url;

  if (props.tmdbConfig) {
    const { images } = props.tmdbConfig;

    const { base_url, backdrop_sizes } = images;
    const { poster_path } = row;

    url = `${base_url}${backdrop_sizes[0]}${poster_path}`;
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.title}
        </TableCell>
        <TableCell align='right'>{row.vote_average}</TableCell>
        <TableCell align='right'>{row.release_date}</TableCell>
        <TableCell align='right'>
          <MovieMenu />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Overview
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <img src={url} alt={row.title} height={500} />
                    </TableCell>
                    <Typography>{row.overview}</Typography>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default MovieResultJsx;
