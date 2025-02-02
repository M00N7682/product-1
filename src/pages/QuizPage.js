import React, { useState, useEffect } from 'react';
import QuizCard from '../components/QuizCard';
import QuizResult from '../components/QuizResult';
import { db, auth } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Typography, Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState(null);

  // 사용자 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore에서 퀴즈 데이터 가져오기
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        console.log('📡 Firestore에서 퀴즈 데이터 가져오는 중...');
        const querySnapshot = await getDocs(collection(db, 'quizzes'));
        const quizData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('✅ Firestore에서 가져온 퀴즈 데이터:', quizData);

        setQuizzes(quizData);
      } catch (error) {
        console.error('🔥 Firestore 데이터 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // 퀴즈 세션 결과 Firestore에 저장
  const saveQuizResult = async () => {
    if (user) {
      try {
        await addDoc(collection(db, 'quizzes'), {
          userId: user.uid,
          score,
          sessionName: 'quizzes', // 필요에 따라 수정
          completedAt: new Date(),
        });
        console.log('✅ 퀴즈 결과가 저장되었습니다.');
      } catch (error) {
        console.error('🔥 퀴즈 결과 저장 실패:', error);
      }
    } else {
      console.error('❌ 사용자 정보가 없습니다. 로그인하세요.');
    }
  };

  // PASS 버튼 클릭 시 처리
  const handlePass = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      alert(`🎉 모든 퀴즈를 완료했습니다! 총 점수: ${score}점`);
      saveQuizResult();
      resetQuiz();
    }
  };

  // 퀴즈 리셋
  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  };

  // 정답 선택 시 처리
  const handleSelect = (option) => {
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === quizzes[currentQuizIndex].answer) {
      setScore((prevScore) => prevScore + 10); // 정답일 경우 +10점
    } else {
      setScore((prevScore) => prevScore - 10); // 오답일 경우 -10점
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (quizzes.length === 0) {
    return <div>❌ 퀴즈 데이터가 Firestore에서 불러와지지 않았습니다.</div>;
  }

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        퀴즈 진행 중
      </Typography>

      {!isAnswered ? (
        <div>
          <QuizCard question={currentQuiz.question} options={currentQuiz.options} onSelect={handleSelect} />
          <Button onClick={handlePass} variant="outlined" sx={{ marginTop: 2 }}>
            PASS
          </Button>
        </div>
      ) : (
        <QuizResult
          correctAnswer={currentQuiz.answer}
          explanation={currentQuiz.explanation}
          onRetry={handlePass}
        />
      )}

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        현재 점수: {score}점
      </Typography>
    </div>
  );
};

export default QuizPage;
