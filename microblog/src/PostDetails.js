import React from "react";

const PostDetails = ({
	title,
	description,
	body,
	handleEditClick,
	handleRemoveClick,
	handleUpVote,
	handleDownVote,
	postId,
	posts,
}) => {
	let votes;
	if (posts[postId]) {
		votes = posts[postId].votes;
	}

	return (
		<>
			<div className="row">
				<div className="col-10">
					<h2>{title}</h2>
					<i>{description}</i>
				</div>
				<div className="col-2">
					<button className="btn btn-primary" onClick={handleEditClick}>
						Edit
					</button>
					<button className="btn btn-danger" onClick={handleRemoveClick}>
						Remove
					</button>
					<div>
						<div className="row">
							<p className="col-6">{votes} votes</p>
							<button
								className="col-3 border-0 bg-light fas fa-thumbs-up text-success"
								onClick={() => handleUpVote(postId)}
							></button>
							<button
								className="col-3 border-0 bg-light fas fa-thumbs-down text-danger"
								onClick={() => handleDownVote(postId)}
							></button>
						</div>
					</div>
				</div>
			</div>
			<p>{body}</p>
		</>
	);
};

export default PostDetails;
