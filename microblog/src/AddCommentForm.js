import React from "react";

const AddCommentForm = ({ handleAddComment, handleChange, newComment }) => {
	return (
		<>
			<form onSubmit={handleAddComment}>
				<input
					type="text"
					className="form-control"
					id="newComment"
					name="newComment"
					onChange={handleChange}
					value={newComment}
					placeholder="New Comment"
				/>
				<button className="btn btn-primary my-2">Add</button>
			</form>
		</>
	);
};

export default AddCommentForm;
