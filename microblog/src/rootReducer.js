import { v4 as uuid } from "uuid";

const INITIAL_STATE = { posts: {}, titles: [] };

const rootReducer = (state = INITIAL_STATE, action) => {
	const { posts } = state;
	const { titles } = state;
	const { payload } = action;

	switch (action.type) {
		case "FETCH_TITLES": {
			const { titles } = payload;
			return { ...state, titles };
		}

		case "FETCH_POST": {
			const { post } = payload;
			return { ...state, posts: { ...state.posts, [post.id]: post } };
		}

		case "ADD_POST": {
			const { id, title, description, votes } = payload;
			return {
				titles: [...titles, { id, title, description, votes }],
				posts: { ...posts, [id]: { ...payload, comments: [] } },
			};
		}

		case "REMOVE_POST": {
			const { id } = payload;
			const stateCopy = {
				titles: [
					...titles.filter((t) => {
						return t.id !== +id;
					}),
				],
				posts: { ...posts },
			};
			delete stateCopy.posts[id];
			return { ...stateCopy };
		}

		case "EDIT_POST": {
			const { post } = payload;
			const { id, title, description } = post;
			return {
				titles: [
					...titles.map((t) => (t.id === +id ? { id, title, description } : t)),
				],
				posts: {
					...posts,
					[id]: { ...post, comments: posts[id].comments },
				},
			};
		}

		case "ADD_COMMENT": {
			const { comment, postId } = payload;
			const { id } = comment;
			return {
				...state,
				posts: {
					...posts,
					[postId]: {
						...posts[postId],
						comments: [...posts[postId].comments, comment],
					},
				},
			};
		}

		case "REMOVE_COMMENT": {
			const { comment, postId } = payload;
			return {
				...state,
				posts: {
					...posts,
					[postId]: {
						...posts[postId],
						comments: posts[postId].comments.filter((c) => c.id !== comment.id),
					},
				},
			};
		}

		default:
			return state;
	}
};

export default rootReducer;
