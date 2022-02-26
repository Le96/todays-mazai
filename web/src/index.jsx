import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import About from './routes/About';
import App from './routes/App';
import Latest from './routes/Latest';
import Leaderboard from './routes/Leaderboard';
import MainPage from './routes/MainPage';

render(
  <Router basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="top" element={<MainPage />} />
        <Route path="about" element={<About />} />
        <Route path="latest" element={<Latest />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="" element={<MainPage />} />
        <Route path="*" element={<MainPage />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root'),
);
