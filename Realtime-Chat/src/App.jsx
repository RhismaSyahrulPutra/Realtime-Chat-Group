import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import JoinPage from './pages/JoinPage';
import ChatRoomPage from './pages/ChatRoomPage';
// Toaster
import { Toaster, toast } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/chat/:roomId" element={<ChatRoomPage />} />
      </Routes>
    </Router>
  );
}
export default App;
