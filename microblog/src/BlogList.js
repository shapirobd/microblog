import React, { useEffect } from "react";
import BlogListCard from "./BlogListCard";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchPost, fetchTitles } from "./actionCreators";

const BlogList = () => {
	const dispatch = useDispatch();
	const titles = useSelector((state) => state.titles, shallowEqual);

	useEffect(() => {
		dispatch(fetchTitles());
	}, [dispatch]);

	useEffect(() => {
		titles.map((title) => dispatch(fetchPost(title.id)));
	}, [dispatch, titles]);

	return (
		<div className="BlogList">
			{titles.map((title) => (
				<BlogListCard postId={title.id} post={title} key={title.id} />
			))}
		</div>
	);
};

export default BlogList;
