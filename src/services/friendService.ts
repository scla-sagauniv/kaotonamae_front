import axios from 'axios';

export const fetchFriends = async (userId: string) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/friend/user/${userId}`,
		);
		if (res.data.friends && res.data.friends.length > 0) {
			const mappedFriends = res.data.friends.map((friend: any) => ({
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
