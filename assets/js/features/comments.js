export function createCommentsSection(post) {
	const section = document.createElement("section");

	section.className =
		"bg-white border rounded-md p-4 flex flex-col gap-4 max-w-hero w-full mx-auto";

	section.style.boxSizing = "border-box";

	const title = document.createElement("h2");
	title.textContent = "Comments";
	title.className = "text-large font-bold";

	section.appendChild(title);

	if (!post.comments || post.comments.length === 0) {
		const empty = document.createElement("p");
		empty.textContent = "No comments yet.";

		section.appendChild(empty);

		return section;
	}

	post.comments.forEach((comment) => {
		const commentCard = document.createElement("article");

		commentCard.className = "bg-off-white border rounded-md p-4 flex flex-col gap-2";
		commentCard.style.boxSizing = "border-box";

		const author = document.createElement("strong");
		author.textContent = `@${comment.author.name}`;

		const body = document.createElement("p");
		body.textContent = comment.body;

		commentCard.appendChild(author);
		commentCard.appendChild(body);

		section.appendChild(commentCard);
	});

	return section;
}
