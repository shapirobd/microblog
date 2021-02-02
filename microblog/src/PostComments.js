import React from "react";

const PostComments = ({ posts, postId, handleRemoveComment }) => {
	return (
		<>
			<h3>Comments</h3>
			{posts[postId].comments.map((comment) => (
				<div className="row" key={comment.id}>
					<p>{comment.text}</p>
					<button
						onClick={() => handleRemoveComment(comment)}
						className="btn btn-danger"
					>
						X
					</button>
				</div>
			))}
		</>
	);
};

export default PostComments;
