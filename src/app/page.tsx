'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useOneTimePassStore } from '@/store/oneTimePassStore';

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

	const router = useRouter();
	const handleSignOut = async () => {
		try {
			await signOut();
			console.log('ログアウトしました');
			router.push('/Auth');
		} catch (error) {
			console.error('Error signing out', error);
		}
	};

	return (
		<>
			<Button onClick={handleSignOut}>ログアウト</Button>
		</>
	);
}
