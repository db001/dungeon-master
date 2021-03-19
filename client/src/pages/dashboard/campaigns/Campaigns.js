import React, { Fragment } from "react";

import AddCampaign from "./AddCampaign";
import ListCampaigns from "./ListCampaigns";

const Campaigns = () => {
	return (
		<Fragment>
			<div>Campaigns</div>

			<AddCampaign />
			<ListCampaigns />
		</Fragment>
	);
};

export default Campaigns;
