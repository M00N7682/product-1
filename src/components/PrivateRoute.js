// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const PrivateRoute = ({ component: Component }) => {
  const { currentUser } = useAuth();

  // 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // 로그인되어 있으면 원하는 컴포넌트 렌더링
  return <Component />;
};

export default PrivateRoute;
