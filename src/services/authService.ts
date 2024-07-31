import axios from 'axios';

export const CreateAuth = async (
	userId: string,
	email: string,
	password: string,
) => {
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/auth/`,
			{
				user_id: userId,
				email: email,
				password: password,
			},
		);
		console.log('Create Auth : ', res);
	} catch (error) {
		console.error('Error during sign up:', error);
	}
};
