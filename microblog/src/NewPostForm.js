import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { editPost } from "./actions";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createPost, updatePost } from "./actionCreators";

const NewPostForm = ({ title, postId, setBeingEditted }) => {
	const posts = useSelector((state) => state.posts, shallowEqual);
	const dispatch = useDispatch();
	const history = useHistory();

	const INITIAL_STATE =
		title === "New Post"
			? {
					title: "",
					description: "",
					body: "",
			  }
			: {
					title: posts[postId].title,
					description: posts[postId].description,
					body: posts[postId].body,
			  };

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [createFormSubmitted, setCreateFormSubmitted] = useState(false);
	const [updateFormSubmitted, setUpdateFormSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title === "New Post") {
			setCreateFormSubmitted(true);
		} else {
			setUpdateFormSubmitted(true);
		}
	};

	useEffect(() => {
		if (createFormSubmitted) {
			dispatch(createPost(formData));
			setCreateFormSubmitted(false);
			history.push("/");
		}
	}, [createFormSubmitted]);

	useEffect(() => {
		if (updateFormSubmitted) {
			dispatch(updatePost(formData, postId));
			setUpdateFormSubmitted(false);
			history.push("/");
		}
	}, [updateFormSubmitted]);

	return (
		<>
			<h1>{title}</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						className="form-control"
						id="title"
						name="title"
						onChange={handleChange}
						value={formData.title}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<input
						type="text"
						className="form-control"
						id="description"
						name="description"
						onChange={handleChange}
						value={formData.description}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="body">Body</label>
					<textarea
						className="form-control"
						id="body"
						name="body"
						rows="3"
						onChange={handleChange}
						value={formData.body}
					></textarea>
				</div>
				<button type="submit" className="btn btn-primary mr-3">
					Submit
				</button>
				<Link to="/" className="btn btn-danger">
					Cancel
				</Link>
			</form>
		</>
	);
};

export default NewPostForm;
