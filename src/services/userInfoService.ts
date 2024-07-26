import axios from 'axios';

export const fetchUserInfo = async (userId: string) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/userInfo/${userId}`,
		);
		const userInfo = {
			firstName: res.data.userInfo.user_first_name,
			lastName: res.data.userInfo.user_last_name,
			firstname_kana: res.data.userInfo.user_first_name_kana,
			lastname_kana: res.data.userInfo.user_last_name_kana,
			birthday: res.data.userInfo.birth_date,
			hobby: res.data.userInfo.hobby,
			gender: res.data.userInfo.gender,
			organization: res.data.userInfo.organization,
			holidayactivity: res.data.userInfo.holiday_activity,
			weaknesses: res.data.userInfo.weakness,
			favoriteColor: res.data.userInfo.favorite_color,
			favoriteAnimal: res.data.userInfo.favorite_animal,
			favoritePlace: res.data.userInfo.favorite_place,
			language: res.data.userInfo.language,
			nickname: res.data.userInfo.nickname,
			icon: res.data.userInfo.icon,
		};
		return userInfo;
	} catch (error) {
		console.error('Error fetching user info:', error);
		return null;
	}
};
