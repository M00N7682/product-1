import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <h2>일취월장</h2>
        </Typography>
        <Button color="inherit" component={Link} to="/">
          홈
        </Button>
        <Button color="inherit" component={Link} to="/quiz">
          문제
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          진행상황
        </Button>
        <Button color="inherit" component={Link} to="/login">
          로그인
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
