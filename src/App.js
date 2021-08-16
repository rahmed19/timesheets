import logo from './logo.svg';
import React, { useState } from 'react'
import './App.css';
import Timesheets from './pages/timesheets';
import Signup from './pages/signup';
import { AuthProvider } from './context/auth-context'

function App() {
  return (
    <>
      <AuthProvider>
        {/* <Timesheets /> */}
        <Signup />
      </AuthProvider>
    </>
  );
}

export default App;
