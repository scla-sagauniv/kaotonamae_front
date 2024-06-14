'use client';

import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect } from 'react';
import { useOneTimePassStore } from '@/store/oneTimePassStore';
import Header from '@/components/Header';

export default function Home() {
	const { isOneTimePass, setOneTimePassFalse } = useOneTimePassStore();
	useEffect(() => {
		setOneTimePassFalse();
		console.log('isOneTimePass: ', isOneTimePass);
		const fetchUser = async () => {
			const { userId, username, signInDetails } = await getCurrentUser();
			console.log('user id: ', userId);
			console.log('username: ', username);
			console.log('sign-in details: ', signInDetails);
		};
		fetchUser();
	}, []);

	return (
		<>
			<Header />
			<div className="text-center mt-10">
				<h1 className="text-4xl font-bold">Home</h1>
			</div>
		</>
	);
}
