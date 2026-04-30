import { followProfile, unfollowProfile } from "./api.js";
import { isLoggedIn } from "./auth.js";
import { isFollowingProfile, isOwnProfile } from "./profileHelpers.js";

export function createFollowButton(profile, onToggleComplete) {
	if (!isLoggedIn() || isOwnProfile(profile)) {
		return null;
	}

	const followButton = document.createElement("button");
	followButton.type = "button";

	if (isFollowingProfile(profile)) {
		followButton.textContent = "Unfollow";
	} else {
		followButton.textContent = "Follow";
	}

	followButton.addEventListener("click", async () => {
		if (isFollowingProfile(profile)) {
			await unfollowProfile(profile.name);
		} else {
			await followProfile(profile.name);
		}

		await onToggleComplete();
	});

	return followButton;
}
