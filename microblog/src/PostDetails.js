import React from "react";

const PostDetails = ({
	title,
	description,
	body,
	handleEditClick,
	handleRemoveClick,
}) => {
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
				</div>
			</div>
			<p>{body}</p>
		</>
	);
};

export default PostDetails;
