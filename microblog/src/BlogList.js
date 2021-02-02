import React from "react";
import BlogListCard from "./BlogListCard";
import { useDispatch } from "react-redux";
import { downVote, upVote } from "./actionCreators/voteActionCreators";

const BlogList = ({ orderedPosts }) => {
	const dispatch = useDispatch();

	const handleUpVote = (id) => {
		dispatch(upVote(id));
	};

	const handleDownVote = (id) => {
		dispatch(downVote(id));
	};

	return (
		<div className="BlogList row">
			{orderedPosts.map((post) => (
				<BlogListCard
					postId={post.id}
					post={post}
					handleUpVote={handleUpVote}
					handleDownVote={handleDownVote}
					key={post.id}
				/>
			))}
		</div>
	);
};

export default BlogList;
