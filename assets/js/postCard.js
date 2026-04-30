import { createProfileLink } from "./profileLink.js";

export function createPostCard(post, showAuthor) {
	const article = document.createElement("article");

	article.className =
		"bg-white border rounded-md p-4 flex flex-col gap-4 max-w-hero w-full mx-auto cursor-pointer";

	article.addEventListener("click", () => {
		window.location.href = `post.html?id=${post.id}`;
	});

	if (showAuthor && post.author) {
		const authorLink = createProfileLink(post.author.name);

		authorLink.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();

			window.location.href = `profile.html?name=${post.author.name}`;
		});

		article.appendChild(authorLink);
	}

	const title = document.createElement("h2");
	title.className = "text-large font-bold";
	title.textContent = post.title;

	article.appendChild(title);

	if (post.media && post.media.url) {
		const imageWrapper = document.createElement("div");
		imageWrapper.className = "flex justify-center w-full";

		const image = document.createElement("img");
		image.src = post.media.url;
		image.alt = post.media.alt || post.title || "Post image";
		image.className = "max-w-md w-full max-h-72 object-cover rounded-md";

		imageWrapper.appendChild(image);
		article.appendChild(imageWrapper);
	}

	if (post.body) {
		const body = document.createElement("p");
		body.textContent = post.body;

		article.appendChild(body);
	}

	return article;
}
