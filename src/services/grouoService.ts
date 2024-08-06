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
		}));
		return groups;
	} catch (error) {
		console.error('Error fetching user or groups:', error);
		return null;
	}
};
