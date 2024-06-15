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
	const objects = [
		{ group: 'グループ1' },
		{ group: 'グループ2' },
		{ group: 'グループ3' },
		{ group: 'グループ4' },
		{ group: 'グループ5' },
		{ group: 'グループ6' },
		{ group: 'グループ7' },
		{ group: 'グループ8' },
		{ group: 'グループ9' },
		{ group: 'グループ10' },
	];

	return (
		<div className="h-screen w-screen">
			<Header />
			<div className="flex flex-col items-center w-full">
				<div className="flex flex-col mt-[45px] overflow-y-auto max-h-[400px] w-10/12">
					{objects.map((object, index) => (
						<div
							key={index}
							className="flex flex-raw items-center border border-black h-[50px] space-x-2 w-full p-3"
						>
							<div className="rounded-full bg-gray-200 w-10 h-10 ml-2"></div>
							<p>{object.group}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
