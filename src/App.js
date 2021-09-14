import React from "react"
import "./App.css"
import Timesheets from "./pages/timesheets"
import Signup from "./pages/signup"
import Login from "./pages/login"
import ForgotPassword from "./pages/forgot-password"
import UpdateProfile from "./pages/update-profile"
import Welcome from "./pages/welcome"
import Tables from "./pages/tables"
import PrivateRoute from "./hooks/private-route"
import { AuthProvider } from "./context/auth-context"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Switch>
						<PrivateRoute exact path='/' component={Timesheets} />
						<PrivateRoute path='/update-profile' component={UpdateProfile} />
						<PrivateRoute path='/tables' component={Tables} />
						<Route path='/signup' component={Signup} />
						<Route path='/login' component={Login} />
						<Route path='/forgot-password' component={ForgotPassword} />
						<Route path='/welcome-page' component={Welcome} />
						<PrivateRoute path='/tables' component={Tables} />
					</Switch>
				</AuthProvider>
			</Router>
		</>
	)
}

export default App
