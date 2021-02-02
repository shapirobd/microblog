const INITIAL_STATE = localStorage.getItem("state")
	? JSON.parse(localStorage.getItem("state"))
	: { posts: null, titles: [] };

const rootReducer = (state = INITIAL_STATE, action) => {
	const { posts } = state;
	const { titles } = state;
	const { payload } = action;

	switch (action.type) {
		case "FETCH_TITLES": {
			if (!localStorage.getItem("state")) {
				const { titles } = payload;
				localStorage.setItem("state", JSON.stringify({ ...state, titles }));
				return { ...state, titles };
			} else {
				return JSON.parse(localStorage.getItem("state"));
			}
		}

		case "FETCH_POST": {
			const localState = localStorage.getItem("state");
			if (!localState.posts) {
				const { post } = payload;
				if (typeof post !== "object") {
					localStorage.setItem("state", JSON.stringify(state));
					return state;
				} else {
					const returnValue = {
						...state,
						posts: { ...state.posts, [post.id]: post },
					};
					localStorage.setItem("state", JSON.stringify(returnValue));
					return returnValue;
				}
			} else {
				return JSON.parse(localStorage.getItem("state"));
			}
		}

		case "ADD_POST": {
			const { id, title, description, votes } = payload;
			const returnValue = {
				titles: [...titles, { id, title, description, votes }],
				posts: { ...posts, [id]: { ...payload, comments: [] } },
			};
			localStorage.setItem("state", JSON.stringify(returnValue));
			return returnValue;
		}

		case "REMOVE_POST": {
			const { id } = payload;
			const returnValue = {
				titles: [
					...titles.filter((t) => {
						return t.id !== +id;
					}),
				],
				posts: { ...posts },
			};
			delete returnValue.posts[id];
			localStorage.setItem("state", JSON.stringify({ ...returnValue }));
			return { ...returnValue };
		}

		case "EDIT_POST": {
			const { post } = payload;
			const { id, title, description } = post;
			const returnValue = {
				titles: [
					...titles.map((t) => (t.id === +id ? { id, title, description } : t)),
				],
				posts: {
					...posts,
					[id]: { ...post, comments: posts[id].comments },
				},
			};
			localStorage.setItem("state", JSON.stringify(returnValue));
			return returnValue;
		}

		case "ADD_COMMENT": {
			const { comment, postId } = payload;
			const returnValue = {
				...state,
				posts: {
					...posts,
					[postId]: {
						...posts[postId],
						comments: [...posts[postId].comments, comment],
					},
				},
			};
			localStorage.setItem("state", JSON.stringify(returnValue));
			return returnValue;
		}

		case "REMOVE_COMMENT": {
			const { comment, postId } = payload;
			const returnValue = {
				...state,
				posts: {
					...posts,
					[postId]: {
						...posts[postId],
						comments: posts[postId].comments.filter((c) => c.id !== comment.id),
					},
				},
			};
			localStorage.setItem("state", JSON.stringify(returnValue));
			return returnValue;
		}

		case "CHANGE_VOTE": {
			const { votes, postId } = payload;
			const returnValue = {
				...state,
				posts: {
					...posts,
					[postId]: {
						...posts[postId],
						votes: votes,
					},
				},
			};
			localStorage.setItem("state", JSON.stringify(returnValue));
			return returnValue;
		}

		default:
			return state;
	}
};

export default rootReducer;
