import React, { useEffect } from "react";
import BlogList from "./BlogList";
import { orderedPosts } from "./helpers/helpers";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { fetchPost, fetchTitles } from "./actionCreators/postActionCreators";

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (!localStorage.getItem("state")) {
			dispatch(fetchTitles());
		}
	}, [dispatch]);

	const titles = useSelector((state) => state.titles, shallowEqual);

	useEffect(() => {
		const localState = localStorage.getItem("state");
		if (localState && !localState.posts) {
			titles.map((title) => dispatch(fetchPost(title.id)));
		}
	}, [dispatch, titles]);

	const posts = useSelector((state) => state.posts, shallowEqual);
	const postsInOrder = orderedPosts(posts) || [];

	return (
		<div className="Home">
			<p>
				Welcome to <b>Microblog</b>, our innovative site for communicating on
				the information superhighway.
			</p>
			<BlogList orderedPosts={postsInOrder} />
		</div>
	);
};

export default Home;
