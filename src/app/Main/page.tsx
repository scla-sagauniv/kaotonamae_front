'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

function Main() {
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
		<div>
			<Button onClick={handleSignOut}>ログアウト</Button>
		</div>
	);
}

export default Main;
