import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/button/Button";

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const { email, password } = inputs;

	const onChange = (e) =>
		setInputs({ ...inputs, [e.target.name]: e.target.value });

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password };
			const response = await fetch(
				"http://localhost:5000/authentication/login",
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
				toast.success("Logged in Successfully");
			} else {
				setAuth(false);
				toast.error(parseRes);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Fragment>
			<div className="form">
				<h1>Login</h1>
				<form onSubmit={onSubmitForm} autoComplete="off">
					<input
						placeholder="Email"
						type="text"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
					/>

					<input
						placeholder="Password"
						type="password"
						name="password"
						value={password}
						onChange={(e) => onChange(e)}
					/>
					<div className="button-container">
						<Button type="submit">Submit</Button>
					</div>
				</form>
				<p className="text-white">
					Not signed up?&nbsp;
					<Link to="/register">Click here to Register</Link>
				</p>
			</div>
		</Fragment>
	);
};

export default Login;
