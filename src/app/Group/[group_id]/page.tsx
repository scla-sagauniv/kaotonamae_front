'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GroupType, GroupMemberType } from '@/types/index';

function GroupPage() {
	const router = useRouter();
	const { group_id } = useParams();
	const [groupMembers, setGroupMembers] = useState<GroupMemberType[]>([]);
	const [group, setGroup] = useState<GroupType>({
		group_id: group_id.toString(),
		group_name: '',
		group_description: '',
		group_icon: '',
	});

	useEffect(() => {
		const fetchGroupsAndGroupMembers = async () => {
			try {
				const Group = await axios.get(
					`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/group/${group_id}`,
				);
				setGroup(Group.data.group);
			} catch (error) {
				console.error('Error fetching groups:', error);
			}
		};

		fetchGroupsAndGroupMembers();
	}, []);

	return (
		<div className="h-screen w-screen flex flex-col mt-[74px]">
			<Header />
			<div className="flex flex-col items-center w-ful">
				<div className="flex flex-row items-center w-10/12 mt-[10px] space-x-5">
					<div className="rounded-full bg-gray-200 w-[80px] h-[80px]"></div>
					<div className="text-[20px]">{group.group_name}</div>
				</div>
				<div className="border border-black w-10/12 h-[170px] mt-[10px]">
					{group.group_description}
				</div>
				<div className="flex flex-col mt-[25px] overflow-y-auto max-h-[250px] w-10/12">
					{groupMembers.map((member, index) => (
						<div
							key={index}
							className="flex flex-row items-center border border-black h-[50px] space-x-2 w-full p-3"
						>
							<div className="rounded-full bg-gray-200 w-10 h-10 ml-2"></div>
							<p>{member.memberName}</p>
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
					<Button
						onClick={() => {
							router.push(`/EditGroup/${group_id}`);
						}}
						className="w-1/3"
					>
						編集
					</Button>
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
