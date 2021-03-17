import React from "react";
import "./Header.scss";

import Button from "../button/Button";

const Header = (props) => {
	return (
		<div className="header">
			<h2>{props.name}'s DM Dashboard</h2>
			<span onClick={props.onLogoutClick}>
				<Button type="logout">Logout</Button>
			</span>
		</div>
	);
};

export default Header;
