import { followProfile, unfollowProfile } from "../api/api.js";
import { isLoggedIn } from "../auth/auth.js";
import { isFollowingProfile, isOwnProfile } from "../features/profileHelpers.js";

/**
 * Create follow/unfollow button
 * Returns null if the user is logged out or view their own profile
 *
 * @param {object} profile The profile
 * @param {Function} onToggleComplete Toggle, runs on state change
 * @returns {ButtonElement|null} A follow/unfollow button, or null
 */
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
