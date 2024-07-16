'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GroupSchema } from '@/utils/validationSchema';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GroupType, GroupMemberType } from '@/types/index';

function NewGroup() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<GroupType>({
		resolver: zodResolver(GroupSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: GroupType) => {
		console.log('クリックされました');
		console.log(data);
	};

	return (
		<div className="h-screen w-screen">
			<Header />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-row justify-center w-full mt-10 space-x-5">
					<div className="rounded-full bg-gray-200 w-[100px] h-[100px]"></div>
					<div className="flex flex-col">
						<label htmlFor="groupName" className="text-[20px]">
							グループの名前
						</label>
						<input
							type="text"
							id="groupName"
							{...register('groupName')}
							className="border border-black w-[250px] h-[40px] mt-[10px]"
						/>
						{errors.groupName && (
							<span className="text-red-500 text-sm">
								{errors.groupName.message}
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
							{...register('description')}
							className="border border-black w-[380px] h-[170px] mt-[10px]"
						/>
						{errors.description && (
							<span className="text-red-500 text-sm">
								{errors.description.message}
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

export default NewGroup;
