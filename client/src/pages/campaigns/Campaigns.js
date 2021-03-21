import React, { Fragment, useState, useEffect } from "react";

import AddCampaign from "./AddCampaign";
// import ListCampaigns from "./ListCampaigns";

const Campaigns = () => {
	const [campaigns, setCampaigns] = useState([]);

	const getCampaigns = async () => {
		try {
			const res = await fetch(
				"http://localhost:5000/dashboard/campaigns/",
				{
					method: "GET",
					headers: { jwt_token: localStorage.token },
				}
			);

			const parseData = await res.json();

			setCampaigns(parseData[0]);
		} catch (err) {
			console.error(`Campaigns Error: ${err.message}`);
		}
	};

	useEffect(() => {
		getCampaigns();
	}, []);

	return (
		<Fragment>
			<div>Campaigns</div>

			<AddCampaign />
			{/* <ListCampaigns /> */}
		</Fragment>
	);
};

export default Campaigns;
