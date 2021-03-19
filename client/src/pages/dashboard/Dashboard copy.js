import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//components

import Header from "../../components/header/Header";
import Button from "../../components/button/Button";

import AddCampaign from "./campaigns/AddCampaign";
import ListCampaigns from "./campaigns/ListCampaigns";

const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState("");
	const [allCampaigns, setAllCampaigns] = useState([]);
	const [campaignChange, setCampaignChange] = useState(false);

	const getProfile = async () => {
		try {
			const res = await fetch("http://localhost:5000/dashboard/", {
				method: "GET",
				headers: { jwt_token: localStorage.token },
			});

			const parseData = await res.json();

			setAllCampaigns(parseData);

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
		setCampaignChange(false);
	}, [campaignChange]);

	return (
		<div>
			<Header name={name} onLogoutClick={(e) => logout(e)} />

			<AddCampaign setCampaignChange={setCampaignChange} />
			<ListCampaigns
				allCampaigns={allCampaigns}
				setCampaignChange={setCampaignChange}
			/>
		</div>
	);
};

export default Dashboard;
