import React, { Fragment, useEffect, useState } from "react";
// import { toast } from "react-toastify";

import "./Dashboard.scss";

const Dashboard = ({ setAuth }) => {
	// const [name, setName] = useState("");

	// const getProfile = async () => {
	// 	try {
	// 		const res = await fetch("http://localhost:5000/dashboard/", {
	// 			method: "GET",
	// 			headers: { jwt_token: localStorage.token },
	// 		});

	// 		const parseData = await res.json();

	// 		setName(parseData[0].dm_name); // name is the first array item
	// 	} catch (err) {
	// 		console.error(err.message);
	// 	}
	// };

	// useEffect(() => {
	// 	getProfile();
	// }, []);

	return (
		<Fragment>
			<h2>
				Welcome to your DM dashboard, use the links in the header to
				navigate
			</h2>
		</Fragment>
	);
};

export default Dashboard;
