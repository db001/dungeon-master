import React, { useState, useEffect } from "react";
import "./Header.scss";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../button/Button";

const Header = ({ setAuth }) => {
	const [name, setName] = useState("");

	const getProfile = async () => {
		try {
			const res = await fetch("http://localhost:5000/dashboard/", {
				method: "GET",
				headers: { jwt_token: localStorage.token },
			});

			const parseData = await res.json();
			console.log(parseData);
			if (parseData) {
				console.log(parseData);
				setName(parseData[0].dm_name);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const logout = async (e) => {
		console.log("click");
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
		<div className="header">
			<Link to="/dashboard">
				<h2>{name}'s DM Dashboard</h2>
			</Link>
			<Link to="/dashboard/campaigns">My Campaigns</Link>
			<Link to="/dashboard/players">My Players</Link>
			<Link to="/dashboard/npcs">My NPCs</Link>
			<Button onClick={(e) => logout(e)} type="logout">
				Logout
			</Button>
		</div>
	);
};

export default Header;
