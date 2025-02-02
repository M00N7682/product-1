import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>매일 日就月將 하세요</h1>
      <p><h3>일취월장(日就月將) : '날마다 나아가고 달마다 발전한다'</h3></p>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#000000' }}
        onClick={() => navigate('/quiz')}
      >
        퀴즈 풀기
      </Button>
    </div>
  );
};



export default Home;
