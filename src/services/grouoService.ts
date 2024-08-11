import axios from 'axios';
import { GroupType } from '@/types/index';

export const fetchGroups = async (UserId: string) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/group/user/${UserId}`,
		);
		const groups = res.data.groups.map((group: GroupType) => ({
			group_id: group.group_id,
			group_name: group.group_name,
			group_icon: group.group_icon,
		}));
		return groups;
	} catch (error) {
		console.error('Error fetching user or groups:', error);
		return null;
	}
};

export const fetchGroup = async (groupId: string) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/group/${groupId}`,
		);
		return res.data.group;
	} catch (error) {
		console.error('Error fetching group:', error);
		return null;
	}
};

export const CreateGroup = async (
	userId: string,
	data: GroupType,
	upLoadImageUrl: string,
) => {
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/group/`,
			{
				user_id: userId,
				group_name: data.group_name,
				group_description: data.group_description,
				group_icon: upLoadImageUrl,
			},
		);
		return res;
	} catch (error) {
		console.error('Error creating group:', error);
		return null;
	}
};
