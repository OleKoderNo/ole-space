import { getPublicPosts } from "../api/api.js";
import { createPostCard } from "../components/postCard.js";

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
		container.innerHTML = "";

		const message = document.createElement("section");

		message.className =
			"bg-white border rounded-md p-4 flex flex-col gap-4 max-w-hero w-full mx-auto";

		message.innerHTML = `
			<h2 class="text-large font-bold">Welcome to OleSpace</h2>
			<p>Log in or register to view posts, create posts, follow users, and join the conversation.</p>
		`;

		container.appendChild(message);
	}
}
