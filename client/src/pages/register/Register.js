import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/button/Button";

const Register = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		name: "",
	});

	const { email, password, name } = inputs;

	const onChange = (e) =>
		setInputs({ ...inputs, [e.target.name]: e.target.value });

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password, name };
			const response = await fetch(
				"http://localhost:5000/authentication/register",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(body),
				}
			);
			const parseRes = await response.json();

			if (parseRes.jwtToken) {
				localStorage.setItem("token", parseRes.jwtToken);
				setAuth(true);
				toast.success("Registered Successfully");
			} else {
				setAuth(false);
				toast.error("parseRes error: ", parseRes);
			}
		} catch (err) {
			console.error("onSubmit form error: ", err.message);
		}
	};

	return (
		<Fragment>
			<div className="form">
				<h1>Register</h1>
				<form onSubmit={onSubmitForm}>
					<input
						type="text"
						name="email"
						value={email}
						placeholder="Email"
						onChange={(e) => onChange(e)}
						className="form-control my-3"
					/>
					<input
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						onChange={(e) => onChange(e)}
						className="form-control my-3"
					/>
					<input
						type="text"
						name="name"
						value={name}
						placeholder="Name"
						onChange={(e) => onChange(e)}
						className="form-control my-3"
					/>
					<Button type="submit">Submit</Button>
				</form>

				<p className="text-white">
					Already registered?&nbsp;
					<Link to="/login">Login here</Link> instead
				</p>
			</div>
		</Fragment>
	);
};

export default Register;
