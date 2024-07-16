'use client';

import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOneTimePassStore } from '@/store/oneTimePassStore';
import Header from '@/components/Header';
import { GroupType } from '@/types/index';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

				const res = await axios.get(
					`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/group/user/${userId}`,
				);

				if (res.data.groups && res.data.groups.length > 0) {
					const mappedGroups = res.data.groups.map((group: GroupType) => ({
						group_id: group.group_id,
						group_name: group.group_name,
						// group_description: group.group_description,
						// groupIcon: group.group_icon,
						// updatedAt: group.updated_at,
						// createdAt: group.created_at,
					}));
					setObjects(mappedGroups);
					setGroupNum(res.data.groups.length);
				} else {
					setObjects([]);
					console.log('No data');
					setError('グループが見つかりませんでした。');
				}
			} catch (error) {
				console.error('Error fetching user or groups:', error);
				setError('データを取得中にエラーが発生しました。');
			}
		};

		fetchUserAndGroups();
	}, []);

	return (
		<div className="h-screen w-screen">
			<Header />
			<div className="flex flex-col items-center w-full">
				<h1 className="text-2xl mt-5">グループ数:{groupNum}</h1>
				<div className="flex flex-col mt-[45px] overflow-y-auto max-h-[400px] w-10/12">
					{error ? (
						<div className="flex justify-center items-center h-[50px] w-full p-3">
							<p>{error}</p>
						</div>
					) : objects.length > 0 ? (
						objects.map((object) => (
							<Link
								key={object.group_id}
								href={`/Group/${object.group_id}`}
								passHref
								className="flex flex-row items-center border border-black h-[50px] space-x-2 w-full p-3"
							>
								<div className="rounded-full bg-gray-200 w-10 h-10 ml-2"></div>
								<p>{object.group_name}</p>
							</Link>
						))
					) : (
						<div className="flex justify-center items-center h-[50px] w-full p-3">
							<p>データがありません。</p>
						</div>
					)}
				</div>
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
