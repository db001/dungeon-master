import React, { Fragment, useState, useEffect } from "react";
import EditCampaign from "../campaigns/EditCampaign";

const ListCampaigns = ({ allCampaigns, setCampaignsChange }) => {
	const [campaigns, setCampaign] = useState([]); // useState to set campaigns

	// Delete campaign function
	async function deleteCampaign(id) {
		try {
			await fetch(`http://localhost:5000/dashboard/campaigns/${id}`, {
				method: "DELETE",
				headers: { jwt_token: localStorage.token },
			});

			setCampaign(
				campaigns.filter((campaign) => campaign.campaign_id !== id)
			);
		} catch (err) {
			console.error(err.message);
		}
	}

	useEffect(() => {
		setCampaign(allCampaigns);
	}, [allCampaigns]);

	return (
		<Fragment>
			{" "}
			<table className="table mt-5">
				<thead>
					<tr>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{campaigns.length !== 0 &&
						campaigns[0].campaign_id !== null &&
						campaigns.map((campaign) => (
							<tr key={campaign.campaign_id}>
								<td>{campaign.campaign_name}</td>
								<td>
									<EditCampaign
										campaign={campaign}
										setCampaignsChange={setCampaignsChange}
									/>
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() =>
											deleteCampaign(campaign.campaign_id)
										}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default ListCampaigns;
