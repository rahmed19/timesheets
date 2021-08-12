import logo from './logo.svg';
import React, { useState } from 'react'
import './App.css';
import Timesheets from './pages/timesheets';
import Signup from './pages/signup';
import useAuthListener from './hooks/use-auth-listener'

function App() {
  const { user } = useAuthListener()
  console.log(user)
  return (
    <>
      {/* <Timesheets /> */}
      <Signup />
    </>
  );
}

export default App;
