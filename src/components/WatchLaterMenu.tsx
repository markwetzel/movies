import { IconButton } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StyledMenu from './StyledMenu';

export interface WatchLaterMenuProps {
  movieResultId: number;
  onRemoveClick(movieResultId: number): void;
}

const WatchLaterMenu: React.FC<WatchLaterMenuProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const remove = () => {
    const { movieResultId, onRemoveClick } = props;
    onRemoveClick(movieResultId);
  };

  const handleRemoveClick = () => {
    remove();
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
        <MenuItem onClick={handleRemoveClick}>
          <ListItemIcon>
            <ScheduleIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Remove from Watch Later' />
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default WatchLaterMenu;
