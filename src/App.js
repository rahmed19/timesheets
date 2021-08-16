import logo from './logo.svg';
import React, { useState } from 'react'
import './App.css';
import Timesheets from './pages/timesheets';
import Signup from './pages/signup';
import Login from './pages/login';
import { AuthProvider } from './context/auth-context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch >
            <Route exact path="/" component={Timesheets} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />

          </Switch>


        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
