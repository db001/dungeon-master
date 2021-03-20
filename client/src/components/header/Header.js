import React from "react";
import { toast } from "react-toastify";

import "./Header.scss";

import Button from "../button/Button";
import { Link, Redirect } from "react-router-dom";

const Header = ({ setAuth, isAuth, name }) => {
	const logout = async (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("token");
			setAuth(false);
			toast.success("Successfully logged out");
			return <Redirect to="/" />;
		} catch (err) {
			console.error(err.message);
		}
	};

	if (isAuth) {
		return (
			<div className="header">
				<Link to="/dashboard">
					<h2>{name}'s DM Dashboard</h2>
				</Link>
				<div className="links-wrapper">
					<Link to="/campaigns">Campaigns</Link>
					<Link to="/players">Players</Link>
					<Link to="/npcs">NPCs</Link>
				</div>
				<Button onClickHandler={(e) => logout(e)} type="logout">
					Logout
				</Button>
			</div>
		);
	} else {
		return (
			<div className="header">
				<h2>DM Dashboard</h2>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</div>
		);
	}
};

export default Header;
