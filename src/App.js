import logo from './logo.svg';
import React, { useState } from 'react'
import './App.css';
import Timesheets from './pages/timesheets';
import Signup from './pages/signup';
import Login from './pages/login';
import ForgotPassword from './components/forgot-password';
import PrivateRoute from './hooks/private-route';
import { AuthProvider } from './context/auth-context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch >
            <PrivateRoute exact path="/" component={Timesheets} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />

          </Switch>


        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
