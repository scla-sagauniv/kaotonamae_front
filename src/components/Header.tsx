import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'aws-amplify/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from 'aws-amplify/auth';

function Header() {
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

	const handleMyPage = async () => {
		const { userId } = await getCurrentUser();
		router.push(`/MyPage/${userId}`);
	};

	return (
		<div className="flex justify-between items-center p-4 bg-sky-600 text-white fixed top-0 w-full z-50">
			<div
				className="font-bold"
				onClick={() => {
					router.push('/');
				}}
			>
				アプリ名
			</div>
			<div className="flex flex-row space-x-2">
				<Button onClick={handleSignOut} className="bg-sky-600 hover:bg-sky-200">
					ログアウト
				</Button>
				<div className="flex flex-col items-center">
					<FontAwesomeIcon icon={faUser} className="size-[25px]" />
					<span className="text-[8px] mt-1" onClick={handleMyPage}>
						マイページ
					</span>
				</div>
			</div>
		</div>
	);
}

export default Header;
