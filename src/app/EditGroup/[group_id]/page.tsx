'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GroupSchema } from '@/utils/validationSchema';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GroupType } from '@/types/index';

function EditGroup() {
	const router = useRouter();
	const { group_id } = useParams();

	const [groupName, setGroupName] = useState<string>('');
	const [groupDescription, setGroupDescription] = useState<string>('');

	useEffect(() => {
		const fetchGroupsAndGroupMembers = async () => {
			try {
				const Group = await axios.get(
					`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/group/${group_id}`,
				);
				setGroupName(Group.data.group.group_name);
				setGroupDescription(Group.data.group.group_description);
			} catch (error) {
				console.error('Error fetching groups:', error);
			}
		};

		fetchGroupsAndGroupMembers();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<GroupType>({
		resolver: zodResolver(GroupSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: GroupType) => {
		const res = await axios.put(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/group/${group_id}`,
			{
				group_name: data.group_name,
				group_description: data.group_description,
			},
		);
		console.log(res);
		router.push(`/Group/${group_id}`);
	};

	return (
		<div className="h-screen w-screen">
			<Header />
			<form className="mt-[74px]" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-row justify-center w-full mt-10 space-x-5 ">
					<div className="rounded-full bg-gray-200 w-[100px] h-[100px]"></div>
					<div className="flex flex-col">
						<label htmlFor="groupName" className="text-[20px]">
							グループの名前
						</label>
						<input
							type="text"
							id="groupName"
							placeholder={groupName}
							{...register('group_name')}
							className="border border-black w-[250px] h-[40px] mt-[10px]"
						/>
						{errors.group_name && (
							<span className="text-red-500 text-sm">
								{errors.group_name.message}
							</span>
						)}
					</div>
				</div>
				<div className="flex flex-col items-center w-full mt-[20px]">
					<div className="flex flex-col">
						<label htmlFor="description" className="text-[20px]">
							グループの説明
						</label>
						<textarea
							id="description"
							placeholder={groupDescription}
							{...register('group_description')}
							className="border border-black w-[380px] h-[170px] mt-[10px]"
						/>
						{errors.group_description && (
							<span className="text-red-500 text-sm">
								{errors.group_description.message}
							</span>
						)}
					</div>
					<Button
						type="submit"
						className="w-5/6 mt-[18px] bg-green-500 hover:bg-green-200"
					>
						完了
					</Button>
				</div>
			</form>
		</div>
	);
}

export default EditGroup;
