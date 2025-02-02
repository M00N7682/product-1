import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserProfile = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5">Welcome, {user.name}!</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>총 퀴즈 점수: {user.totalScore}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
