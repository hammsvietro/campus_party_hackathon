import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route component={Dashboard} path="/" exact />
        <Route component={Register} path="/register" /> 
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
