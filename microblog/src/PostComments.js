import React from "react";

const PostComments = ({ posts, postId, handleRemoveComment }) => {
	return (
		<div className="col p-0">
			<h3>Comments</h3>
			{posts[postId].comments.map((comment) => (
				<div className="row mb-2 px-3" key={comment.id}>
					<p className="m-0">{comment.text}</p>
					<button
						onClick={() => handleRemoveComment(comment)}
						className="border-0 bg-white fas fa-trash text-danger"
					></button>
				</div>
			))}
		</div>
	);
};

export default PostComments;
