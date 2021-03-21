import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

import { toast } from "react-toastify";

// Components
import Header from "./components/header/Header";

// Pages
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Campaigns from "./pages/campaigns/Campaigns";
import Players from "./pages/players/Players";
import Npcs from "./pages/npcs/Npcs";

import "./App.scss";
import Landing from "./pages/landing/Landing";

toast.configure();

function App() {
	const [name, setName] = useState("");

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

	const getProfile = async () => {
		try {
			const res = await fetch("http://localhost:5000/dashboard/", {
				method: "GET",
				headers: { jwt_token: localStorage.token },
			});

			const parseData = await res.json();

			// console.log(parseData);

			setName(parseData[0].dm_name); // name is the first array item
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		checkAuthenticated();
		getProfile();
	}, []);

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	return (
		<Fragment>
			<Router>
				<Header
					setAuth={setAuth}
					isAuth={isAuthenticated}
					name={name}
				/>
				<div className="content-container">
					<Switch>
						<Route
							exact
							path="/"
							render={(props) =>
								!isAuthenticated ? (
									<Landing {...props} setAuth={setAuth} />
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
						<Route
							exact
							path="/campaigns"
							render={() =>
								isAuthenticated ? (
									<Campaigns />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/players"
							render={() =>
								isAuthenticated ? (
									<Players />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/npcs"
							render={() =>
								isAuthenticated ? (
									<Npcs />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
					</Switch>
				</div>
			</Router>
		</Fragment>
	);
}

export default App;
