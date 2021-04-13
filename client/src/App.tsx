import React from 'react';
import Router from './infrastructure/routing/Router';
import Index from "./pages";

function App() {
  return (
  <Router>
      <Index/>
  </Router>
  );
}

export default App;
