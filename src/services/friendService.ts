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

export const CreateFriend = async (userId: string, friendId: string) => {
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/friend/`,
			{
				user_id1: userId,
				user_id2: friendId,
			},
		);
		return res.data;
	} catch (error) {
		console.error('Error creating friend:', error);
		return null;
	}
};
