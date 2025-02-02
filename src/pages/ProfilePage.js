import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Typography, Card, CardContent, Button, Box } from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [quizSessions, setQuizSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 사용자 인증 상태 감시
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchQuizSessions(currentUser.uid);
      } else {
        setUser(null);
        setQuizSessions([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Firestore에서 해당 사용자의 퀴즈 세션 가져오기
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
      console.error('🔥 Firestore에서 퀴즈 세션 가져오기 오류:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        {user.displayName || '사용자'}님의 퀴즈 기록
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
                onClick={() => window.location.href = `/quiz/${session.id}`}
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
