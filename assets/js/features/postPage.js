import { getPostById } from "../api/api.js";
import { createOwnerActions } from "./postOwnership.js";
import { createProfileLink } from "../components/profileLink.js";
import { createPostImage, getPostIdFromUrl } from "./postHelpers.js";
import { createCommentsSection } from "./comments.js";

export async function loadPostPage(postContainer) {
	const postId = getPostIdFromUrl();

	if (!postId) {
		postContainer.textContent = "No post id found.";
		return;
	}

	postContainer.textContent = "Loading post...";

	try {
		const post = await getPostById(postId);

		postContainer.innerHTML = "";

		const article = document.createElement("article");
		article.className =
			"bg-white border rounded-md p-4 flex flex-col gap-4 max-w-hero w-full mx-auto";

		article.style.boxSizing = "border-box";

		const message = document.createElement("p");
		message.setAttribute("aria-live", "assertive");

		const backLink = document.createElement("a");
		backLink.href = "index.html";
		backLink.textContent = "Back to feed";
		backLink.className = "text-dusty-blue";

		const authorLink = createProfileLink(post.author.name);

		const title = document.createElement("h1");
		title.className = "text-2xl font-bold";
		title.textContent = post.title;

		article.appendChild(backLink);
		article.appendChild(authorLink);
		article.appendChild(title);

		const image = createPostImage(post);

		if (image) {
			article.appendChild(image);
		}

		if (post.body) {
			const body = document.createElement("p");
			body.textContent = post.body;

			article.appendChild(body);
		}

		const ownerActions = createOwnerActions(post, article, backLink, message, () =>
			loadPostPage(postContainer),
		);

		if (ownerActions) {
			article.appendChild(ownerActions);
		}

		article.appendChild(message);
		postContainer.appendChild(article);
		const commentsSection = createCommentsSection(post, () => loadPostPage(postContainer));
		postContainer.appendChild(commentsSection);
	} catch (error) {
		postContainer.textContent = error.message;
	}
}
