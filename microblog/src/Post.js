import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import NewPostForm from "./NewPostForm";

import { useSelector } from "react-redux";
import PostView from "./PostView";

const Post = () => {
	const posts = useSelector((state) => state.posts);
	const { postId } = useParams();

	const [newComment, setNewComment] = useState("");
	const [beingEditted, setBeingEditted] = useState(false);

	if (!posts[postId]) {
		return <Redirect to="/" />;
	}

	return (
		<>
			{beingEditted ? (
				<NewPostForm
					title="Edit Post"
					postId={postId}
					setBeingEditted={setBeingEditted}
				/>
			) : (
				<PostView
					posts={posts}
					postId={postId}
					newComment={newComment}
					setNewComment={setNewComment}
					setBeingEditted={setBeingEditted}
				/>
			)}
		</>
	);
};

export default Post;
