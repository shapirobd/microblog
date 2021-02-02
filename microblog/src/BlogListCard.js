import React from "react";
import { Link } from "react-router-dom";

const BlogListCard = ({ post, postId }) => {
	const { title, description } = post;

	return (
		<div className="card" style={{ width: "18rem" }}>
			<div className="card-body">
				<Link to={`/${postId}`} className="card-link">
					{title}
				</Link>
				<p className="card-text">
					<i>{description}</i>
				</p>
			</div>
		</div>
	);
};

export default BlogListCard;
