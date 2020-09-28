import Menu, { MenuProps } from '@material-ui/core/Menu';

import React from 'react';

const StyledMenu: React.FC<MenuProps> = (props) => {
  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  );
};

export default StyledMenu;
