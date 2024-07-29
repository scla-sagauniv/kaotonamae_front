import axios from 'axios';

export const fetchFriends = async (userId: string) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/friend/user/${userId}`,
		);
		if (res.data.friends && res.data.friends.length > 0) {
			const mappedFriends = res.data.friends.map((friend: string) => ({
				friend_id: friend,
			}));
			return mappedFriends;
		}
		return [];
	} catch (error) {
		console.error('Error fetching user or groups:', error);
		return [];
	}
};

export const fetchUserName = async (userId: string) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/userInfo/${userId}`,
		);
		const userName =
			res.data.userInfo.user_last_name +
			' ' +
			res.data.userInfo.user_first_name;
		const userIdAndName = {
			userId: userId,
			userName: userName,
			userIcon: res.data.userInfo.icon,
		};
		return userIdAndName;
	} catch (error) {
		console.error('Error fetching user name:', error);
		return null;
	}
};
