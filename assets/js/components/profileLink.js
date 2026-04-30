export function createProfileLink(name) {
	const profileLink = document.createElement("a");

	profileLink.href = `profile.html?name=${name}`;
	profileLink.className = "text-small text-dusty-blue";
	profileLink.textContent = `@${name}`;

	return profileLink;
}
