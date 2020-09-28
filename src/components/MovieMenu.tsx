import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StyledMenu from './StyledMenu';

export default function MovieMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const addToWatchLater = () => {
    console.log('Add to watch later');
  };

  const addToFavorites = () => {
    console.log('Add to favorites');
  };

  const handleWatchLaterClick = () => {
    addToWatchLater();
    closeMenu();
  };

  const handleFavoriteClick = () => {
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
}
