import React, { Fragment, useState } from "react";

const EditCampaign = ({ campaign, setCampaignsChange }) => {
	const editText = async (id) => {
		try {
			const body = { campaign };
			const myHeaders = new Headers();

			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("jwt_token", localStorage.token);

			await fetch(`http://localhost:5000/dashboard/campaigns/${id}`, {
				method: "PUT",
				headers: myHeaders,
				body: JSON.stringify(body),
			});

			setCampaignsChange(true);
		} catch (err) {
			console.error(err.message);
		}
	};

	const [campaignName, setCampaign] = useState(campaign.campaign_name);

	return (
		<Fragment>
			<button
				type="button"
				className="btn btn-warning"
				data-toggle="modal"
				data-target={`#id${campaign.campaign_id}`}
			>
				Edit
			</button>
			{/* id = "id21"*/}
			<div
				className="modal"
				id={`id${campaign.campaign_id}`}
				onClick={() => setCampaign(campaign.campaign_name)}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Edit Campaign</h4>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={() =>
									setCampaign(campaign.campaign_name)
								}
							>
								&times;
							</button>
						</div>

						<div className="modal-body">
							<input
								type="text"
								className="form-control"
								value={campaignName}
								onChange={(e) => setCampaign(e.target.value)}
							/>
						</div>

						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-warning"
								data-dismiss="modal"
								onClick={() => editText(campaign.campaign_id)}
							>
								Edit
							</button>
							<button
								type="button"
								className="btn btn-danger"
								data-dismiss="modal"
								onClick={() =>
									setCampaign(campaign.campaign_name)
								}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EditCampaign;
