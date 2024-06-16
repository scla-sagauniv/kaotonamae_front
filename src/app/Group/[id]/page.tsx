// pages/Group/[id]/page.tsx

'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const objects = [
	{ name: 'ユーザー1' },
	{ name: 'ユーザー2' },
	{ name: 'ユーザー3' },
	{ name: 'ユーザー4' },
	{ name: 'ユーザー5' },
	{ name: 'ユーザー6' },
	{ name: 'ユーザー7' },
	{ name: 'ユーザー8' },
	{ name: 'ユーザー9' },
	{ name: 'ユーザー10' },
];

function GroupPage() {
	const router = useRouter();
	const Params = useParams();
	const id = Params.id; // ここで動的パラメータを取得
	const [groupName, setGroupName] = useState('');

	console.log(id);

	useEffect(() => {
		if (id) {
			setGroupName(`グループ ${id}`);
		} else {
			router.push('/'); // idがない場合はホームにリダイレクト
		}
	}, [id, router]);

	return (
		<div className="h-screen w-screen">
			<Header />
			<div className="flex flex-col items-center w-full">
				<div className="flex flex-row items-center w-10/12 mt-[10px] space-x-5">
					<div className="rounded-full bg-gray-200 w-[80px] h-[80px]"></div>
					<div className="text-[30px]">{groupName}</div> {/* idを表示 */}
				</div>
				<div className="border border-black w-10/12 h-[170px] mt-[10px]"></div>
				<div className="flex flex-col mt-[25px] overflow-y-auto max-h-[250px] w-10/12">
					{objects.map((object, index) => (
						<div
							key={index}
							className="flex flex-row items-center border border-black h-[50px] space-x-2 w-full p-3"
						>
							<div className="rounded-full bg-gray-200 w-10 h-10 ml-2"></div>
							<p>{object.name}</p>
						</div>
					))}
				</div>
				<Button
					onClick={() => {
						router.push('/Quiz');
					}}
					className="w-5/6 mt-[18px] bg-green-500 hover:bg-green-200"
				>
					クイズ
				</Button>
				<div className="flex flex-row justify-evenly w-5/6 mt-[30px]">
					<Button className="w-1/3">編集</Button>
					<Button
						onClick={() => {
							router.push('/');
						}}
						className="w-1/3"
					>
						ホームへ
					</Button>
				</div>
			</div>
		</div>
	);
}

export default GroupPage;
