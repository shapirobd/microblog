const INITIAL_STATE = localStorage.getItem("state")
	? JSON.parse(localStorage.getItem("state"))
	: { posts: null, titles: [] };

// localStorage.setItem("state", JSON.stringify(INITIAL_STATE));

console.log(INITIAL_STATE);

const rootReducer = (state = INITIAL_STATE, action) => {
	const { posts } = state;
	const { titles } = state;
	const { payload } = action;

	switch (action.type) {
		case "FETCH_TITLES": {
			if (!localStorage.getItem("state")) {
				const { titles } = payload;
				localStorage.setItem("state", JSON.stringify({ ...state, titles }));
				console.log({ ...state, titles });
				return { ...state, titles };
			} else {
				return JSON.parse(localStorage.getItem("state"));
			}
		}

		case "FETCH_POST": {
			const localState = localStorage.getItem("state");
			console.log(localState.posts);
			if (!localState.posts) {
				const { post } = payload;
				if (typeof post !== "object") {
					localStorage.setItem("state", JSON.stringify(state));
					return state;
				} else {
					localStorage.setItem(
						"state",
						JSON.stringify({
							...state,
							posts: { ...state.posts, [post.id]: post },
						})
					);
					return { ...state, posts: { ...state.posts, [post.id]: post } };
				}
			} else {
				return JSON.parse(localStorage.getItem("state"));
			}
		}

		case "ADD_POST": {
			const { id, title, description, votes } = payload;
			localStorage.setItem(
				"state",
				JSON.stringify({
					titles: [...titles, { id, title, description, votes }],
					posts: { ...posts, [id]: { ...payload, comments: [] } },
				})
			);
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
			localStorage.setItem("state", JSON.stringify({ ...stateCopy }));
			return { ...stateCopy };
		}

		case "EDIT_POST": {
			const { post } = payload;
			const { id, title, description } = post;
			localStorage.setItem(
				"state",
				JSON.stringify({
					titles: [
						...titles.map((t) =>
							t.id === +id ? { id, title, description } : t
						),
					],
					posts: {
						...posts,
						[id]: { ...post, comments: posts[id].comments },
					},
				})
			);
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
			localStorage.setItem(
				"state",
				JSON.stringify({
					...state,
					posts: {
						...posts,
						[postId]: {
							...posts[postId],
							comments: [...posts[postId].comments, comment],
						},
					},
				})
			);
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
			localStorage.setItem(
				"state",
				JSON.stringify({
					...state,
					posts: {
						...posts,
						[postId]: {
							...posts[postId],
							comments: posts[postId].comments.filter(
								(c) => c.id !== comment.id
							),
						},
					},
				})
			);
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

		case "CHANGE_VOTE": {
			const { votes, postId } = payload;
			localStorage.setItem(
				"state",
				JSON.stringify({
					...state,
					posts: {
						...posts,
						[postId]: {
							...posts[postId],
							votes: votes,
						},
					},
				})
			);
			return {
				...state,
				posts: {
					...posts,
					[postId]: {
						...posts[postId],
						votes: votes,
					},
				},
			};
		}

		default:
			return state;
	}
};

export default rootReducer;
