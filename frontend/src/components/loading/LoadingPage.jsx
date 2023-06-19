import React from 'react'
import { useAuth } from '../../providers/AuthProvider'
import './style.css'


const LoadingPage = () => {
    const { isLoading } = useAuth();
    if (!isLoading) return null;
    return (
      <div className="loading-page-wrapper">
        <div className="loading-container">
          <div className="loading-cube">
            <div className="loading-side loading-front"></div>
            <div className="loading-side loading-back"></div>
            <div className="loading-side loading-right"></div>
            <div className="loading-side loading-left"></div>
            <div className="loading-side loading-top"></div>
            <div className="loading-side loading-bottom"></div>
          </div>
          <div className="loading-sphere loading-sphere-1"></div>
          <div className="loading-sphere loading-sphere-2"></div>
          <div className="loading-sphere loading-sphere-3"></div>
          <div className="loading-sphere loading-sphere-4"></div>
        </div>
      </div>
    );
}

export default LoadingPage