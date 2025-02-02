import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AuthForm = ({ isSignup, onSubmit, onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: '50px auto',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
        {isSignup ? '회원가입' : '로그인'}
      </Typography>

      <TextField
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        variant="outlined"
      />
      <TextField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        variant="outlined"
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#333333',
          },
        }}
      >
        {isSignup ? '회원가입' : '로그인'}
      </Button>

      <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
        {isSignup
          ? '이미 계정이 있으신가요? 로그인 화면으로 전환하세요.'
          : '계정이 없으신가요? 회원가입 화면으로 전환하세요.'}
      </Typography>

      <Button variant="text" onClick={onToggle}>
        {isSignup ? '로그인 화면으로 전환' : '3초 회원가입하고 얼른 공부하러 ㄱㄱㄱ'}
      </Button>
    </Box>
  );
};

export default AuthForm;
