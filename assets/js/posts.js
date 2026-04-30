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
			const link = document.createElement("a");

			link.href = `post.html?id=${post.id}`;
			link.className = "no-underline text-charcoal block max-w-hero w-full mx-auto";

			const article = document.createElement("article");

			article.className = "bg-white border rounded-md p-4 flex flex-col gap-4";

			const author = document.createElement("p");
			author.className = "text-small";
			author.textContent = `@${post.author.name}`;

			const title = document.createElement("h2");
			title.className = "text-large font-bold";
			title.textContent = post.title;

			article.appendChild(author);
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

			link.appendChild(article);
			container.appendChild(link);
		});
	} catch (error) {
		container.innerHTML = error.message;
	}
}
