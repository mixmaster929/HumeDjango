import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Analysis from './components/analysis/Analysis';
import AudioAnalysisComponent from './components/audio/AudioAnalysis';
import SignIn from './components/auth/signin';
import LandingPage from './components/base/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import ImageAnalysis from './components/image/ImageAnalysis';
import Profile from './components/profile/Profile';
import VideoAnalysisComponent from './components/video/VideoAnalysis';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/image/analysis" element={<ImageAnalysis />} />
        <Route path="/video/analysis" element={<VideoAnalysisComponent />} />
        <Route path="/audio/analysis" element={<AudioAnalysisComponent />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
