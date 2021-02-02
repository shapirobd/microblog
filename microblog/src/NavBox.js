import React from "react";
import { Link } from "react-router-dom";

function NavBox() {
	return (
		<div className="jumbotron">
			<h1 className="display-4">Microblog</h1>
			<p className="lead">Get in the Rithm of blogging!</p>
			<Link className="mr-4" to="/">
				Blog
			</Link>
			<Link to="/new">Add a new post</Link>
		</div>
	);
}

export default NavBox;
