import { getPublicPosts } from "./api.js";

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
			const article = document.createElement("article");

			article.className =
				"bg-white border rounded-md p-4 flex flex-col gap-4 max-w-hero w-full mx-auto cursor-pointer";

			// Whole card click → open post page
			article.addEventListener("click", () => {
				window.location.href = `post.html?id=${post.id}`;
			});

			// Username link
			const authorLink = document.createElement("a");

			authorLink.href = `profile.html?name=${post.author.name}`;
			authorLink.className = "text-small text-dusty-blue";
			authorLink.textContent = `@${post.author.name}`;

			// Prevent card click from triggering
			authorLink.addEventListener("click", (event) => {
				event.preventDefault();
				event.stopPropagation();

				window.location.href = `profile.html?name=${post.author.name}`;
			});

			article.appendChild(authorLink);

			// Title
			const title = document.createElement("h2");

			title.className = "text-large font-bold";
			title.textContent = post.title;

			article.appendChild(title);

			// Image (if exists)
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

			// Body text (if exists)
			if (post.body) {
				const body = document.createElement("p");

				body.textContent = post.body;

				article.appendChild(body);
			}

			container.appendChild(article);
		});
	} catch (error) {
		container.innerHTML = error.message;
	}
}
