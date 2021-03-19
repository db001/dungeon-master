import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<div id="landing-page">
			<div className="container-fluid">
				<div className="row">
					<div className="jumbotron mt-5">
						<h1>DM Helper</h1>
						<p>Sign In or Register to start</p>
						<Link to="/login" className="btn btn-primary">
							Login
						</Link>
						<Link to="/register" className="btn btn-primary ml-3">
							Register
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
