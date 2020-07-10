import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Route component={Dashboard} path="/" exact />
      <Route component={Register} path="/register" /> 
    </BrowserRouter>
  );
}

export default App;
