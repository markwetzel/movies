import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StyledMenu from './StyledMenu';

export interface MovieMenuProps {
  movieResultId: number;
  onWatchLaterClick(movieResultId: number): void;
  onFavoriteClick(movieResultId: number): void;
}

const MovieMenu: React.FC<MovieMenuProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const addToWatchLater = () => {
    props.onWatchLaterClick(props.movieResultId);
  };

  const addToFavorites = () => {
    props.onFavoriteClick(props.movieResultId);
  };

  const handleWatchLaterClick = () => {
    addToWatchLater();
    closeMenu();
  };

  const handleFavoriteClick = (event: React.MouseEvent<HTMLElement>) => {
    addToFavorites();
    closeMenu();
  };

  return (
    <>
      <IconButton
        aria-controls='customized-menu'
        aria-haspopup='true'
        color='primary'
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleWatchLaterClick}>
          <ListItemIcon>
            <ScheduleIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Save to Watch Later' />
        </MenuItem>
        <MenuItem onClick={handleFavoriteClick}>
          <ListItemIcon>
            <FavoriteIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Add to Favorites' />
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default MovieMenu;
