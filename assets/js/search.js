import { getPublicPosts } from "./api.js";
import { createPostCard } from "./postCard.js";

/**
 * Sets up post search on the index page.
 *
 * @param {HTMLElement} feedContainer - Feed container to render results into.
 */
export function setupPostSearch(feedContainer) {
	const searchForm = document.querySelector("#search-form");
	const searchInput = document.querySelector("#search-input");
	const clearSearchButton = document.querySelector("#clear-search-btn");
	const searchMessage = document.querySelector("#search-message");

	searchForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const query = searchInput.value.trim().toLowerCase();

		if (!query) {
			searchMessage.textContent = "";
			clearSearchButton.classList.add("hidden");
			return;
		}

		feedContainer.textContent = "Searching posts...";

		try {
			const posts = await getPublicPosts();

			const filteredPosts = posts.filter((post) => {
				const title = post.title.toLowerCase();
				const body = post.body ? post.body.toLowerCase() : "";

				return title.includes(query) || body.includes(query);
			});

			feedContainer.innerHTML = "";

			if (!filteredPosts.length) {
				searchMessage.textContent = "No posts found.";
				clearSearchButton.classList.remove("hidden");
				return;
			}

			filteredPosts.forEach((post) => {
				const postCard = createPostCard(post, true);

				feedContainer.appendChild(postCard);
			});

			searchMessage.textContent = `${filteredPosts.length} posts found.`;
			clearSearchButton.classList.remove("hidden");
		} catch (error) {
			searchMessage.textContent = error.message;
		}
	});

	clearSearchButton.addEventListener("click", () => {
		searchInput.value = "";
		searchMessage.textContent = "";
		clearSearchButton.classList.add("hidden");

		window.location.reload();
	});
}
