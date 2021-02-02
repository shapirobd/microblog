import {
	ADD_POST,
	REMOVE_POST,
	EDIT_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from "./actionTypes";

export const addPost = (post) => ({
	type: ADD_POST,
	payload: { ...post },
});

export const removePost = (postId) => {
	return {
		type: REMOVE_POST,
		payload: { postId },
	};
};

export const editPost = (post, postId) => ({
	type: EDIT_POST,
	payload: { post, postId },
});

export const addComment = (comment, postId) => ({
	type: ADD_COMMENT,
	payload: { comment, postId },
});

export const removeComment = (comment, postId) => ({
	type: REMOVE_COMMENT,
	payload: { comment, postId },
});
