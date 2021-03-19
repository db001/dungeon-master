import React from "react";
import "./Button.scss";

const Button = (props) => {
	return (
		<button onClick={props.onClickHandler} className={"btn btn-" + props.type}>{props.children}</button>
	);
};

export default Button;
