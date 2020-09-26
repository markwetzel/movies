/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { Typography } from '@material-ui/core';
import logo from './logo.png';
import styled from '@emotion/styled/macro';

const $Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export interface HeaderProps {
  title: string;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { title } = props;

  return (
    <$Header>
      <img alt='Logo' height='100px' src={logo} />
      <Typography component='h1' variant='h2'>
        {title}
      </Typography>
    </$Header>
  );
};

export default Header;
