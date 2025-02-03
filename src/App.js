import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* PrivateRoute를 사용해 인증된 사용자만 profile 페이지 접근 가능 */}
          <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
