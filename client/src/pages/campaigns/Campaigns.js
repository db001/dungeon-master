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

			// console.log(parseData);

			setCampaigns(parseData[0]);
			// setName(parseData[0].dm_name); // name is the first array item
		} catch (err) {
			console.error(`Campaigns Error: ${err.message}`);
		}
	};

	useEffect(() => {
		getCampaigns();
		console.log(campaigns);
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
