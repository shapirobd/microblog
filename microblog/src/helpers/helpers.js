export const voteCount = (post) => {
	if (post) {
		return post.votes;
	}
};

export const orderedPosts = (posts) => {
	if (posts) {
		console.log(posts);
		const postsArr = Object.values(posts);
		const postsArrCopy = [...postsArr];
		const orderedPostsArr = [];
		postsArr.map((p) => pushMaxPost(postsArrCopy, orderedPostsArr));
		return orderedPostsArr;
	}
};

const pushMaxPost = (postsArrCopy, newPostsArr) => {
	const { maxPost, maxPostIdx } = findMaxPost(postsArrCopy);
	postsArrCopy.splice(maxPostIdx, 1);
	newPostsArr.push(maxPost);
};

const findMaxPost = (postsArrCopy) => {
	let maxPost;
	let maxPostIdx;
	let maxVotes;
	postsArrCopy.map((post, idx) => {
		if ((!maxVotes && maxVotes !== 0) || post.votes >= maxVotes) {
			maxVotes = post.votes;
			maxPost = post;
			maxPostIdx = idx;
		}
	});
	return { maxPost, maxPostIdx };
};
