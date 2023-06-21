import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Board from './pages/board/Board';
import Home from './pages/home/Home';

function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  );
}

export default App;
