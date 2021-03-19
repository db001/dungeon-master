import React, { Fragment } from "react";

import { BrowserRouter as Switch, Route } from "react-router-dom";

import "./Dashboard.scss";

// Components
import Campaigns from "./campaigns/Campaigns";
import Players from "./players/Players";
import Npcs from "./npcs/Npcs";

const Dashboard = () => {
	return (
		<Fragment>
			<div className="content-width">
				<Switch>
					<Route path="/dashboard/campaigns" component={Campaigns} />
					<Route path="/dashboard/players" component={Players} />
					<Route path="/dashboard/npcs" component={Npcs} />
				</Switch>
			</div>
		</Fragment>
	);
};

export default Dashboard;
