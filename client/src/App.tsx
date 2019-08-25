import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import ChatBox from './components/ChatBox';

const App: React.FC = () => (
   <Router>
      <ChatBox path="/" />
   </Router>
)

export default App;
