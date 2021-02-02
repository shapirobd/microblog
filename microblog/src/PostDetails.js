import React from "react";
import { voteCount } from "./helpers/helpers";
import { downVote, upVote } from "./actionCreators/voteActionCreators";
import { useDispatch } from "react-redux";

const PostDetails = ({
	title,
	description,
	body,
	handleEditClick,
	handleRemoveClick,
	postId,
	posts,
}) => {
	const dispatch = useDispatch();

	return (
		<>
			<div className="row">
				<div className="col-9">
					<h2>{title}</h2>
					<i>{description}</i>
				</div>
				<div className="col-3 ">
					<div className="d-flex row justify-content-end pb-2">
						<button
							className="col-3 far fa-edit border-0 bg-white text-primary"
							onClick={handleEditClick}
						></button>
						<button
							className="col-3 fas fa-trash border-0 bg-white text-danger"
							onClick={handleRemoveClick}
						></button>
					</div>
					<div className="row">
						<p className="col-6 m-0">{voteCount(posts[postId])} votes</p>
						<button
							className="col-3 border-0 bg-white fas fa-thumbs-up text-success"
							onClick={() => dispatch(upVote(postId))}
						></button>
						<button
							className="col-3 border-0 bg-white fas fa-thumbs-down text-danger"
							onClick={() => dispatch(downVote(postId))}
						></button>
					</div>
				</div>
			</div>
			<p>{body}</p>
		</>
	);
};

export default PostDetails;
