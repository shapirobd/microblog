export const voteCount = (post) => {
	if (post) {
		return post.votes;
	}
};

export const orderedPosts = (posts) => {
	if (posts) {
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

export const determineColor = (votes) => {
	let color = "white";
	if (votes > 0 && votes <= 5) {
		color = "rgb(175, 255, 175)";
	} else if (votes < 0 && votes >= -5) {
		color = "rgb(255, 175, 175)";
	} else if (votes < -5) {
		color = "rgb(255, 75, 75)";
	} else if (votes > 5) {
		color = "rgb(75, 255, 75)";
	}
	return color;
};
