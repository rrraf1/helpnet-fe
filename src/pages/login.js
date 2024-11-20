import React from 'react';
import AuthForm from '../components/AuthLayout';
import bgLogin from '../assets/login-left.svg';

export default function LoginPage () {
  return (
    <div className="login-page">
      <div className="login-bg-square"></div>
      <div className="login-bg-square2"></div>
      <div className="login-bg-circle"></div>
      
      <div className="login-container">
        <div className="login-content">
          <div className="login-left">
            <img src={bgLogin} alt="bgLogin" />
          </div>
          <div className="login-right">
            <AuthForm title="Login" isLogin 
              linkText="Create account" 
              linkHref="/register"  
            />
          </div>
        </div>
      </div>
    </div>
  );
};

