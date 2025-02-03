import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // 로그아웃 후 홈 화면으로 이동
    } catch (error) {
      console.error('🔥 로그아웃 오류:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

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
        {currentUser ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2, display: 'inline' }}>
              {currentUser.email}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            로그인
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
