import React from "react";
import BlogList from "./BlogList";

const Home = () => {
	return (
		<div className="Home">
			<p>
				Welcome to <b>Microblog</b>, our innovative site for communicating on
				the information superhighway.
			</p>
			<BlogList />
		</div>
	);
};

export default Home;
