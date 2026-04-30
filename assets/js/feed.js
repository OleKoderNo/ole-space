import { getPublicPosts } from "./api.js";
import { createPostCard } from "./postCard.js";

export async function loadPublicFeed(container) {
	container.innerHTML = "Loading posts...";

	try {
		const posts = await getPublicPosts();

		if (!posts.length) {
			container.innerHTML = "No posts found.";
			return;
		}

		container.innerHTML = "";

		posts.forEach((post) => {
			const postCard = createPostCard(post, true);

			container.appendChild(postCard);
		});
	} catch (error) {
		container.innerHTML = error.message;
	}
}
