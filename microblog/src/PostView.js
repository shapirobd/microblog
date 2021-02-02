import React from "react";
import PostDetails from "./PostDetails";
import PostComments from "./PostComments";
import AddCommentForm from "./AddCommentForm";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "./actionCreators/postActionCreators";
import {
	createComment,
	deleteComment,
} from "./actionCreators/commentActionCreators";

const PostView = ({
	posts,
	postId,
	newComment,
	setNewComment,
	setBeingEditted,
}) => {
	const { title, description, body } = posts[postId];
	const dispatch = useDispatch();
	const history = useHistory();

	const handleChange = (e) => {
		const { value } = e.target;
		setNewComment(value);
	};

	const handleAddComment = (e) => {
		e.preventDefault();
		dispatch(createComment(newComment, postId));
		setNewComment("");
	};

	const handleRemoveComment = (comment) => {
		dispatch(deleteComment(comment, postId));
	};

	const handleEditClick = () => {
		setBeingEditted(true);
	};

	const handleRemoveClick = () => {
		dispatch(deletePost(postId));
		history.push("/");
	};

	return (
		<div className="PostView jumbotron bg-white pt-0 px-0">
			<PostDetails
				title={title}
				description={description}
				body={body}
				handleEditClick={handleEditClick}
				handleRemoveClick={handleRemoveClick}
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
