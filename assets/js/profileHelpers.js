import { getProfile } from "./auth.js";

export function getProfileNameFromUrl() {
	const params = new URLSearchParams(window.location.search);

	const name = params.get("name");

	if (name) {
		return name;
	}

	const loggedInProfile = getProfile();

	if (!loggedInProfile) {
		return null;
	}

	return loggedInProfile.name;
}

export function isOwnProfile(profile) {
	const loggedInProfile = getProfile();

	if (!loggedInProfile) {
		return false;
	}

	return loggedInProfile.name === profile.name;
}

export function isFollowingProfile(profile) {
	const loggedInProfile = getProfile();

	if (!loggedInProfile || !profile.followers) {
		return false;
	}

	return profile.followers.some((follower) => {
		return follower.name === loggedInProfile.name;
	});
}

export function createProfileImage(profile) {
	if (!profile.avatar || !profile.avatar.url) {
		return null;
	}

	const image = document.createElement("img");

	image.src = profile.avatar.url;
	image.alt = profile.avatar.alt || `${profile.name} avatar`;
	image.className = "w-10 h-10 rounded-full object-cover";

	return image;
}
