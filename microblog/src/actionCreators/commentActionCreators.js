import axios from "axios";
import { ADD_COMMENT, REMOVE_COMMENT } from "../actionTypes";

const API_URL = "http://localhost:5000";

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
		type: ADD_COMMENT,
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
		type: REMOVE_COMMENT,
		payload: { comment, postId },
	};
};
