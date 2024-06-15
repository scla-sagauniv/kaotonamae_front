'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function CreateUserIcon() {
	const router = useRouter();

	return (
		<div className="h-screen w-screen">
			<div className="flex flex-col items-center justify-center w-full">
				<div className="rounded-full bg-gray-200 w-[230px] h-[230px] mt-[230px]"></div>
				<Button className="mt-4 w-1/2 bg-green-500 hover:bg-green-200">
					写真を選択する
				</Button>
				<Button
					onClick={() => {
						router.push('/');
					}}
					className="mt-4 w-1/2 bg-green-500 hover:bg-green-200"
				>
					完了
				</Button>
			</div>
		</div>
	);
}

export default CreateUserIcon;
