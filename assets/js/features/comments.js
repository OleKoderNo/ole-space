import { createComment, deleteComment } from "../api/api.js";
import { getProfile, isLoggedIn } from "../auth/auth.js";

export function createCommentsSection(post, onCommentCreated) {
	const section = document.createElement("section");

	section.className =
		"bg-white border rounded-md p-4 flex flex-col gap-4 max-w-hero w-full mx-auto";

	section.style.boxSizing = "border-box";

	const title = document.createElement("h2");
	title.textContent = "Comments";
	title.className = "text-large font-bold";

	section.appendChild(title);

	if (isLoggedIn()) {
		const form = document.createElement("form");
		form.className = "flex flex-col gap-2";

		const label = document.createElement("label");
		label.setAttribute("for", "comment-body");
		label.textContent = "Write a comment";

		const textarea = document.createElement("textarea");
		textarea.id = "comment-body";
		textarea.name = "body";
		textarea.placeholder = "Write a comment...";
		textarea.required = true;

		const button = document.createElement("button");
		button.type = "submit";
		button.textContent = "Post comment";

		const message = document.createElement("p");
		message.setAttribute("aria-live", "assertive");

		form.appendChild(label);
		form.appendChild(textarea);
		form.appendChild(button);
		form.appendChild(message);

		form.addEventListener("submit", async (event) => {
			event.preventDefault();

			message.textContent = "";

			const body = textarea.value.trim();

			if (!body) {
				message.textContent = "Comment cannot be empty.";
				return;
			}

			try {
				button.disabled = true;
				button.textContent = "Posting...";

				await createComment(post.id, body);

				textarea.value = "";
				message.textContent = "Comment posted.";

				await onCommentCreated();
			} catch (error) {
				message.textContent = error.message;
			} finally {
				button.disabled = false;
				button.textContent = "Post comment";
			}
		});

		section.appendChild(form);
	}

	if (!post.comments || post.comments.length === 0) {
		const empty = document.createElement("p");
		empty.textContent = "No comments yet.";

		section.appendChild(empty);

		return section;
	}

	const loggedInProfile = getProfile();

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

		if (loggedInProfile && comment.author.name === loggedInProfile.name) {
			const deleteButton = document.createElement("button");

			deleteButton.type = "button";
			deleteButton.textContent = "Delete comment";
			deleteButton.className = "text-white bg-alert px-6 py-2 rounded-md cursor-pointer";

			deleteButton.addEventListener("click", async () => {
				await deleteComment(post.id, comment.id);
				await onCommentCreated();
			});

			commentCard.appendChild(deleteButton);
		}

		section.appendChild(commentCard);
	});

	return section;
}
