// src/App.js
import React from 'react';
import './App.css';
import WordPressPosts from './WordPressPosts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My WordPress Blog</h1>
      </header>
      <WordPressPosts />
    </div>
  );
}

export default App;
