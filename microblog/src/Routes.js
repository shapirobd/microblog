import React, { useEffect } from "react";
import Home from "./Home";
import NewPostForm from "./NewPostForm";
import Post from "./Post";
import { Route, Switch } from "react-router-dom";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/new">
				<NewPostForm title="New Post" />
			</Route>
			<Route path="/:postId">
				<Post />
			</Route>
		</Switch>
	);
};

export default Routes;
