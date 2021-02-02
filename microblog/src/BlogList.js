import React, { useEffect } from "react";
import BlogListCard from "./BlogListCard";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchPost, fetchTitles, downVote, upVote } from "./actionCreators";

const BlogList = () => {
	const dispatch = useDispatch();
	const titles = useSelector((state) => state.titles, shallowEqual);

	useEffect(() => {
		dispatch(fetchTitles());
	}, [dispatch]);

	useEffect(() => {
		titles.map((title) => dispatch(fetchPost(title.id)));
	}, [dispatch, titles]);

	const posts = useSelector((state) => state.posts, shallowEqual);
	// console.log(posts[titles[0].id]);

	const handleUpVote = (id) => {
		dispatch(upVote(id));
	};

	const handleDownVote = (id) => {
		dispatch(downVote(id));
	};

	let postsArr = Object.values(posts);
	const newPostsArr = [...postsArr];
	let maxVotes;
	postsArr.map((post, idx) => {
		console.log(post);
		if ((!maxVotes && maxVotes !== 0) || post.votes > maxVotes) {
			newPostsArr.splice(idx, 1);
			newPostsArr.unshift(postsArr[idx]);
			maxVotes = post.votes;
		}
	});

	return (
		<div className="BlogList row">
			{newPostsArr.map((post) => (
				<BlogListCard
					postId={post.id}
					post={post}
					handleUpVote={handleUpVote}
					handleDownVote={handleDownVote}
					posts={posts}
					key={post.id}
				/>
			))}
		</div>
	);
};

export default BlogList;
