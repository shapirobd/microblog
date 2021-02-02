import axios from "axios";
import {
	FETCH_TITLES,
	FETCH_POST,
	ADD_POST,
	REMOVE_POST,
	EDIT_POST,
} from "../actionTypes";

const API_URL = "http://localhost:5000";

export const fetchTitles = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${API_URL}/api/posts`);
			dispatch(gotTitles(data));
		} catch (e) {
			console.log(e);
		}
	};
};

const gotTitles = (titles) => {
	return {
		type: FETCH_TITLES,
		payload: {
			titles,
		},
	};
};

export const fetchPost = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${API_URL}/api/posts/${id}`);
			dispatch(gotPost(data));
		} catch (e) {
			console.log(e);
		}
	};
};

const gotPost = (post) => {
	return {
		type: FETCH_POST,
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
	type: ADD_POST,
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
		type: REMOVE_POST,
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
		type: EDIT_POST,
		payload: { post },
	};
};
