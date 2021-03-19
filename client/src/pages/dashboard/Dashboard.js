import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
	Link,
} from "react-router-dom";

import Header from "../../components/header/Header";

import Campaigns from "./campaigns/Campaigns";

const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState("");

	const getProfile = async () => {
		try {
			const res = await fetch("http://localhost:5000/dashboard/", {
				method: "GET",
				headers: { jwt_token: localStorage.token },
			});

			const parseData = await res.json();

			setName(parseData[0].dm_name); // name is the first array item
		} catch (err) {
			console.error(err.message);
		}
	};

	const logout = async (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("token");
			setAuth(false);
			toast.success("Successfully logged out");
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<Fragment>
			<Header name={name} onLogoutClick={(e) => logout(e)} />

			<div className="content-container">
				<Link to="/dashboard/campaigns">Campaigns</Link>
			</div>

			<Router>
				<Switch>
					<Route path="/dashboard/campaigns" component={Campaigns} />
				</Switch>
			</Router>
		</Fragment>
	);
};

export default Dashboard;
