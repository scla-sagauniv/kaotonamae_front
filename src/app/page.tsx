'use client';

import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOneTimePassStore } from '@/store/oneTimePassStore';
import Header from '@/components/Header';
import { GroupType } from '@/types/index';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
	const router = useRouter();
	const { isOneTimePass, setOneTimePassFalse } = useOneTimePassStore();
	const [objects, setObjects] = useState<GroupType[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [groupNum, setGroupNum] = useState<number>(0);

	useEffect(() => {
		const fetchUserAndGroups = async () => {
			try {
				setOneTimePassFalse();
				console.log('isOneTimePass: ', isOneTimePass);

				const { userId, username, signInDetails } = await getCurrentUser();
				console.log('user id: ', userId);
				console.log('username: ', username);
				console.log('sign-in details: ', signInDetails);

				const res = await axios.get<GroupType[]>(
					`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/groups/${userId}`,
				);

				if (res.data && res.data.length > 0) {
					setObjects(res.data);
					setGroupNum(res.data.length);
				} else {
					setObjects([]);
					setError('グループが見つかりませんでした。');
				}
			} catch (error) {
				console.error('Error fetching user or groups:', error);
				setError('データを取得中にエラーが発生しました。');
			}
		};

		fetchUserAndGroups();
	}, [groupNum]);

	// const handleAddNewGroup = async () => {
	// 	try {
	// 		const { userId } = await getCurrentUser();
	// 		const res = await axios.post<GroupType[]>(
	// 			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/newGroup/${userId}`,
	// 		);
	// 		console.log(res);
	// 		setGroupNum(groupNum + 1);
	// 	} catch (error) {
	// 		console.error('Error adding new group:', error);
	// 	}
	// };

	return (
		<div className="h-screen w-screen">
			<Header />
			<div className="flex flex-col items-center w-full">
				<h1 className="text-2xl mt-5">グループ数:{groupNum}</h1>
				{/* <div className="flex flex-col mt-[45px] overflow-y-auto max-h-[400px] w-10/12">
					{error ? (
						<div className="flex justify-center items-center h-[50px] w-full p-3">
							<p>{error}</p>
						</div>
					) : objects.length > 0 ? (
						objects.map((object) => (
							<Link
								key={object.groupId}
								href={`/Group/${object.groupId}`}
								passHref
								className="flex flex-row items-center border border-black h-[50px] space-x-2 w-full p-3"
							>
								<div className="rounded-full bg-gray-200 w-10 h-10 ml-2"></div>
								<p>{object.groupName}</p>
							</Link>
						))
					) : (
						<div className="flex justify-center items-center h-[50px] w-full p-3">
							<p>データがありません。</p>
						</div>
					)}
				</div> */}
			</div>
			<div className="flex flex-col justify-center items-center space-y-3">
				<Button
					onClick={() => {
						router.push('/NewGroup');
					}}
					className="w-40 bg-blue-500 text-white rounded-md hover:bg-blue-700"
				>
					グループ新規追加
				</Button>
				<Button
					onClick={() => {
						router.push('/Friends');
					}}
					className="w-[200px]"
				>
					友達一覧
				</Button>
			</div>
		</div>
	);
}
