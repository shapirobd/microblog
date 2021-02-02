import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchTitles = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${API_URL}/api/posts`);
			console.log(data);
			dispatch(gotTitles(data));
		} catch (e) {
			console.log(e);
		}
	};
};

const gotTitles = (titles) => {
	return {
		type: "FETCH_TITLES",
		payload: {
			titles,
		},
	};
};

export const fetchPost = (id) => {
	console.log(id);
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${API_URL}/api/posts/${id}`);
			console.log(data);
			dispatch(gotPost(data));
		} catch (e) {
			console.log(e);
		}
	};
};

const gotPost = (post) => {
	return {
		type: "FETCH_POST",
		payload: {
			post,
		},
	};
};

export const createPost = (post) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(`${API_URL}/api/posts/`, {
				...post,
			});
			dispatch(createdPost(data));
		} catch (e) {
			console.log(e);
		}
	};
};

const createdPost = (post) => ({
	type: "ADD_POST",
	payload: { ...post },
});

export const deletePost = (id) => {
	return async (dispatch) => {
		try {
			await axios.delete(`${API_URL}/api/posts/${id}`);
			dispatch(deletedPost(id));
		} catch (e) {
			console.log(e);
		}
	};
};

const deletedPost = (id) => {
	return {
		type: "REMOVE_POST",
		payload: { id },
	};
};

export const updatePost = (post, id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`${API_URL}/api/posts/${id}`, {
				...post,
			});
			dispatch(updatedPost(data));
		} catch (e) {
			console.log(e);
		}
	};
};

const updatedPost = (post) => {
	return {
		type: "EDIT_POST",
		payload: { post },
	};
};

export const createComment = (text, postId) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				`${API_URL}/api/posts/${postId}/comments`,
				{
					text,
					postId,
				}
			);
			dispatch(createdComment(data, postId));
		} catch (e) {
			console.log(e);
		}
	};
};

const createdComment = (comment, postId) => {
	return {
		type: "ADD_COMMENT",
		payload: { comment, postId },
	};
};

export const deleteComment = (comment, postId) => {
	return async (dispatch) => {
		try {
			await axios.delete(
				`${API_URL}/api/posts/${postId}/comments/${comment.id}`
			);
			dispatch(deletedComment(comment, postId));
		} catch (e) {
			console.log(e);
		}
	};
};

const deletedComment = (comment, postId) => {
	return {
		type: "REMOVE_COMMENT",
		payload: { comment, postId },
	};
};

export const upVote = (postId) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				`${API_URL}/api/posts/${postId}/vote/up`
			);
			dispatch(voted(data, postId));
		} catch (e) {
			console.log(e);
		}
	};
};

export const downVote = (postId) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				`${API_URL}/api/posts/${postId}/vote/down`
			);
			dispatch(voted(data, postId));
		} catch (e) {
			console.log(e);
		}
	};
};

const voted = (data, postId) => {
	return {
		type: "CHANGEVOTE",
		payload: { ...data, postId },
	};
};

// const downVoted = (data) => {
// 	return {
// 		type: "CHANGEVOTE",
// 		payload: { ...data },
// 	};
// };
