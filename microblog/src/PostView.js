import React, { useState, useEffect } from "react";
import PostDetails from "./PostDetails";
import PostComments from "./PostComments";
import AddCommentForm from "./AddCommentForm";
import { removePost, addComment, removeComment } from "./actions";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	deletePost,
	createComment,
	deleteComment,
	downVote,
	upVote,
} from "./actionCreators";

const PostView = ({
	posts,
	postId,
	newComment,
	setNewComment,
	setBeingEditted,
}) => {
	console.log(posts);
	console.log(postId);
	const { title, description, body } = posts[postId];
	const [commentEntered, setCommentEntered] = useState(false);
	const [commentBeingDeleted, setCommentBeingDeleted] = useState(null);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleChange = (e) => {
		const { value } = e.target;
		setNewComment(value);
	};

	const handleAddComment = (e) => {
		e.preventDefault();
		setCommentEntered(true);
	};

	useEffect(() => {
		if (commentEntered) {
			dispatch(createComment(newComment, postId));
			setCommentEntered(false);
		} else {
			setNewComment("");
		}
	}, [commentEntered]);

	const handleRemoveComment = (comment) => {
		setCommentBeingDeleted(comment);
	};

	useEffect(() => {
		if (commentBeingDeleted) {
			dispatch(deleteComment(commentBeingDeleted, postId));
			setCommentBeingDeleted(null);
		}
	}, [commentBeingDeleted]);

	const handleEditClick = () => {
		setBeingEditted(true);
	};

	const handleRemoveClick = () => {
		dispatch(deletePost(postId));
		history.push("/");
	};

	const handleUpVote = (id) => {
		dispatch(upVote(id));
	};

	const handleDownVote = (id) => {
		dispatch(downVote(id));
	};

	return (
		<div className="PostView jumbotron bg-white pt-0 px-0">
			<PostDetails
				title={title}
				description={description}
				body={body}
				handleEditClick={handleEditClick}
				handleRemoveClick={handleRemoveClick}
				handleUpVote={handleUpVote}
				handleDownVote={handleDownVote}
				postId={postId}
				posts={posts}
			/>
			<hr className="my-4"></hr>
			<PostComments
				posts={posts}
				postId={postId}
				handleRemoveComment={handleRemoveComment}
			/>
			<AddCommentForm
				handleAddComment={handleAddComment}
				handleChange={handleChange}
				newComment={newComment}
			/>
		</div>
	);
};

export default PostView;
