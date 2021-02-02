import React from "react";
import Home from "./Home";
import NewPostForm from "./NewPostForm";
import Post from "./Post";
import { Route, Switch, Redirect } from "react-router-dom";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/new">
				<NewPostForm header="New Post" />
			</Route>
			<Route path="/:postId">
				<Post />
			</Route>
			<Route>
				<Redirect to="/" />
			</Route>
		</Switch>
	);
};

export default Routes;
