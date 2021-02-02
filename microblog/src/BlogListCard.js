import React from "react";
import { Link } from "react-router-dom";

const BlogListCard = ({
	post,
	postId,
	posts,
	handleUpVote,
	handleDownVote,
}) => {
	const { title, description } = post;

	let votes;
	if (posts[postId]) {
		votes = posts[postId].votes;
	}

	return (
		<div className="card col-3 p-0 mx-2">
			<div className="card-body">
				<Link to={`/${postId}`} className="card-link">
					{title}
				</Link>
				<p className="card-text">
					<i>{description}</i>
				</p>
			</div>
			<div className="card-footer">
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
	);
};

export default BlogListCard;
