import React, { Fragment, useEffect } from "react";

// import AddCampaign from "./AddCampaign";
// import ListCampaigns from "./ListCampaigns";

const Campaigns = () => {
	const getCampaigns = async () => {
		try {
			const res = await fetch("http://localhost:5000/campaigns/", {
				method: "GET",
				headers: { jwt_token: localStorage.token },
			});

			const parseData = await res.json();

			console.log(parseData);

			// setName(parseData[0].dm_name); // name is the first array item
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getCampaigns();
	}, []);

	return (
		<Fragment>
			<div>Campaigns</div>

			{/* <AddCampaign />
			<ListCampaigns /> */}
		</Fragment>
	);
};

export default Campaigns;
