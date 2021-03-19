import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

import { toast } from "react-toastify";

//components
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
// import Landing from "./pages/landing/Landing";

import "./App.scss";
import Header from "./components/header/Header";

toast.configure();

function App() {
	const checkAuthenticated = async () => {
		try {
			const res = await fetch(
				"http://localhost:5000/authentication/verify",
				{
					method: "POST",
					headers: { jwt_token: localStorage.token },
				}
			);

			const parseRes = await res.json();

			parseRes === true
				? setIsAuthenticated(true)
				: setIsAuthenticated(false);
		} catch (err) {
			console.error("checkAuthenticated error: ", err.message);
		}
	};

	useEffect(() => {
		checkAuthenticated();
	}, []);

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	return (
		<Fragment>
			<Router>
				{isAuthenticated ? <Header setAuth={setAuth} /> : <div></div>}
				<Switch>
					<Route
						exact
						path="/"
						render={(props) =>
							!isAuthenticated ? (
								<Login {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/dashboard" />
							)
						}
					/>
					<Route
						exact
						path="/login"
						render={(props) =>
							!isAuthenticated ? (
								<Login {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/dashboard" />
							)
						}
					/>
					<Route
						exact
						path="/register"
						render={(props) =>
							!isAuthenticated ? (
								<Register {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/dashboard" />
							)
						}
					/>
					<Route
						exact
						path="/dashboard"
						render={(props) =>
							isAuthenticated ? (
								<Dashboard {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
