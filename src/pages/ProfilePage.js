import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../components/AuthContext';
import { Typography, Card, CardContent, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [quizSessions, setQuizSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchQuizSessions(currentUser.uid);
    } else {
      setIsLoading(false); // 사용자 미로그인 상태에서는 로딩 종료
    }
  }, [currentUser]);

  const fetchQuizSessions = async (userId) => {
    try {
      const sessionsQuery = query(
        collection(db, 'quizzes'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(sessionsQuery);
      const sessions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizSessions(sessions);
    } catch (error) {
      console.error('🔥 퀴즈 기록 조회 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Typography>로딩 중입니다...</Typography>;
  }

  if (!currentUser) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6">로그인이 필요합니다.</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          로그인 화면으로 이동
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        {currentUser.displayName || '사용자'}님의 퀴즈 기록
      </Typography>

      {quizSessions.length === 0 ? (
        <Typography variant="body1">아직 푼 퀴즈가 없습니다.</Typography>
      ) : (
        quizSessions.map((session) => (
          <Card key={session.id} sx={{ margin: '10px auto', maxWidth: 600 }}>
            <CardContent>
              <Typography variant="h6">세션: {session.sessionName}</Typography>
              <Typography variant="body2">점수: {session.score}점</Typography>
              <Button
                variant="contained"
                sx={{ marginTop: 1 }}
                onClick={() => navigate(`/quiz/${session.id}`)}
              >
                복습하기
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ProfilePage;
