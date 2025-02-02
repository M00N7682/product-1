import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const QuizResult = ({ answer, explanation, onRetry }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', textAlign: 'center' }}>
      <CardContent>
        <Typography variant="h5" color="success.main">
          정답: {answer}
        </Typography>
        <Typography variant="body1" gutterBottom>
          해설: {explanation}
        </Typography>
        <Button variant="contained" color="primary" onClick={onRetry}>
          다음 퀴즈 풀기
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizResult;
