import React, { Fragment, useState } from "react";

import Button from "../../components/button/Button";

const AddCampaign = ({ setCampaignChange }) => {
	const [description, setDescription] = useState("");

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const myHeaders = new Headers();

			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("jwt_token", localStorage.token);

			const body = { description };
			const response = await fetch(
				"http://localhost:5000/dashboard/campaigns",
				{
					method: "POST",
					headers: myHeaders,
					body: JSON.stringify(body),
				}
			);

			const parseResponse = await response.json();

			console.log("ParseResponse");
			console.log(parseResponse);

			// setCampaignChange(true);
			setDescription("");
			// window.location = "/";
		} catch (err) {
			console.error(err.message);
		}
	};
	return (
		<Fragment>
			<div className="form">
				<h1>Add Campaign</h1>
				<form onSubmit={onSubmitForm}>
					<input
						type="text"
						placeholder="Campaign Name"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Button type="add">Add</Button>
				</form>
			</div>
		</Fragment>
	);
};

export default AddCampaign;
