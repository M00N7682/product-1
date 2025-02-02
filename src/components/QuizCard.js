import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

const QuizCard = ({ question, options = [], onSelect }) => {
  if (!question) {
    return <Typography variant="h6" color="error">⚠️ 문제가 제공되지 않았습니다.</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {question}
        </Typography>
        {options.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            ⚠️ 선택지가 없습니다. 관리자에게 문의하세요.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {options.map((option, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => onSelect(option)}
              >
                {option}
              </Button>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;
