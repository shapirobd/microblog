import axios from "axios";
import { CHANGE_VOTE } from "../actionTypes";

const API_URL = "http://localhost:5000";

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
		type: CHANGE_VOTE,
		payload: { ...data, postId },
	};
};
