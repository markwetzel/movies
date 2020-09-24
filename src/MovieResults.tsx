import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Config from './Config';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MovieMenu from './MovieMenu';
import MovieResult from './MovieResult';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props: { row: MovieResult; tmdbConfig?: Config }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  let url;

  if (props.tmdbConfig) {
    const { images } = props.tmdbConfig;

    const { base_url, backdrop_sizes } = images;
    const { poster_path } = row;

    console.log({ base_url, backdrop_sizes, poster_path });

    url = `${base_url}${backdrop_sizes[0]}${poster_path}`;

    console.log({ url });
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
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
}

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
          {props.movies.map((movie) => (
            <Row key={movie.id} row={movie} tmdbConfig={props.tmdbConfig} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return movies.length > 0 ? movieTable : null;
};

export default MovieResults;
