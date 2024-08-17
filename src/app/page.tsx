'use client';

import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import { useOneTimePassStore } from '@/store/oneTimePassStore';
import Header from '@/components/Header';
import { GroupType } from '@/types/index';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchGroups } from '@/services/grouoService';
import Image from 'next/image';

export default function Home() {
	const router = useRouter();
	const { setOneTimePassFalse } = useOneTimePassStore();
	const [objects, setObjects] = useState<GroupType[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [groupNum, setGroupNum] = useState<number>(0);
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		setOneTimePassFalse();
		const loadGroups = async () => {
			const { userId } = await getCurrentUser();
			setUserId(userId);
			const groups = await fetchGroups(userId);
			if (groups && groups.length > 0) {
				setObjects(groups);
				setGroupNum(groups.length);
			} else {
				setObjects([]);
				setError('グループが見つかりませんでした。');
			}
		};
		loadGroups();
	}, []);

	return (
		<div className="h-screen w-screen">
			<Header />
			<div className="flex flex-col items-center w-full mt-[74px]">
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
								<div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center border border-black">
									<Image
										src={
											object.group_icon
												? object.group_icon
												: 'https://kaotonamae.s3.ap-northeast-1.amazonaws.com/fish.png'
										}
										height={50}
										width={50}
										alt="グループのアイコン"
										className="object-cover"
									/>
								</div>
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
						router.push(`/Friends/${userId}`);
					}}
					className="w-[200px]"
				>
					友達一覧
				</Button>
			</div>
		</div>
	);
}
