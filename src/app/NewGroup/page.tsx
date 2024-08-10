'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GroupSchema } from '@/utils/validationSchema';
import { useEffect, useState } from 'react';
import { GroupType } from '@/types/index';
import { getCurrentUser } from 'aws-amplify/auth';
import Image from 'next/image';
import { CreateGroup } from '@/services/grouoService';
import { handleImageUpload } from '@/services/uploadService';

function NewGroup() {
	const router = useRouter();
	const [userId, setUserId] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const { userId } = await getCurrentUser();
			setUserId(userId);
			console.log(userId);
		};
		fetchUser();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<GroupType>({
		resolver: zodResolver(GroupSchema),
		mode: 'onChange',
	});

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const onSubmit = async (data: GroupType) => {
		if (!file) {
			console.log('画像が選択されていません');
			return;
		}

		const uploadImageUrl = await handleImageUpload(file);

		if (!uploadImageUrl) {
			console.log('画像のアップロードに失敗しました');
			return;
		}

		await CreateGroup(userId, data);
		router.push('/');
	};

	return (
		<div className="h-screen w-screen">
			<Header />
			<form onSubmit={handleSubmit(onSubmit)} className="mt-[74px]">
				<div className="flex flex-row justify-center w-full mt-10 space-x-3">
					<div className="w-[100px] h-[100px] rounded-full overflow-hidden flex justify-center items-center border border-black">
						<Image
							src={file ? URL.createObjectURL(file) : ''}
							alt="groupIcon"
							width={100}
							height={100}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="groupName" className="text-[20px]">
							グループの名前
						</label>
						<input
							type="text"
							id="groupName"
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
						<input
							type="file"
							accept="image/png, image/jpeg"
							className="mt-4"
							onChange={handleImageChange}
						/>
						<label htmlFor="description" className="text-[20px]">
							グループの説明
						</label>
						<textarea
							id="description"
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

export default NewGroup;
