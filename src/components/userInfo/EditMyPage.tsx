import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { CreateUserInfo } from '@/services/userInfoService';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ProfileInfoType } from '@/types/index';
import { ProfileSchema } from '@/utils/validationSchema';
import { useEffect, useState } from 'react';

const EditMyPage = () => {
	const router = useRouter();

	const [userId, setUserId] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const { userId } = await getCurrentUser();
			setUserId(userId);
		};
		fetchUser();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ProfileInfoType>({
		resolver: zodResolver(ProfileSchema),
		mode: 'onChange',
	});

	const handleImageUpload = async (file: File): Promise<string | null> => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('filename', file.name);

		try {
			const res = await fetch(`/api/kaotonamae/upload?filename=${file.name}`, {
				method: 'POST',
				body: formData,
			});

			if (!res.ok) {
				console.error('画像のアップロードに失敗しました');
			}

			const jsonRes = await res.json();
			return jsonRes.imageUrl;
		} catch (err) {
			console.error('画像のアップロードに失敗しました', err);
			return null;
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			console.log('Change Image', e.target.files[0]);
			setFile(e.target.files[0]);
		}
	};

	const onSubmit = async (data: ProfileInfoType) => {
		if (!file) {
			console.log('画像が選択されていません');
			return;
		}

		const uploadImageUrl = await handleImageUpload(file);

		if (!uploadImageUrl) {
			console.log('画像のアップロードに失敗しました');
			return;
		}

		await CreateUserInfo(data, userId, uploadImageUrl);
		router.push('/');
	};

	return (
		<div>
			<div className="max-h-screen w-full p-4">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col items-center w-full justify-center">
						<img
							src={
								file
									? URL.createObjectURL(file)
									: 'https://icooon-mono.com/i/icon_14440/icon_144400_256.png'
							}
							alt=""
							className="rounded-full w-[300px] h-[300px] object-cover border border-black"
						/>
						<input
							type="file"
							accept="image/png, image/jpeg"
							onChange={handleImageChange}
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-2">姓</label>
						<Input
							{...register('lastName')}
							placeholder="姓"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
						{errors.lastName && (
							<span className="text-red-500 text-sm">
								{errors.lastName.message}
							</span>
						)}
					</div>

					<div>
						<label className="block text-gray-700 font-bold mb-2">名</label>
						<Input
							{...register('firstName')}
							placeholder="名"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
						{errors.firstName && (
							<span className="text-red-500 text-sm">
								{errors.firstName.message}
							</span>
						)}
					</div>

					<div>
						<label className="block text-gray-700 font-bold mb-2">セイ</label>
						<Input
							{...register('lastname_kana')}
							placeholder="セイ"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
						{errors.lastname_kana && (
							<span className="text-red-500 text-sm">
								{errors.lastname_kana.message}
							</span>
						)}
					</div>

					<div>
						<label className="block text-gray-700 font-bold mb-2">メイ</label>
						<Input
							{...register('firstname_kana')}
							placeholder="メイ"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
						{errors.firstname_kana && (
							<span className="text-red-500 text-sm">
								{errors.firstname_kana.message}
							</span>
						)}
					</div>

					<div>
						<label className="block text-gray-700 font-bold mb-2">性別</label>
						<Controller
							name="gender"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="w-[180px] text-border-gray-300 rounded-md">
										<SelectValue placeholder="性別" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="男性">男性</SelectItem>
										<SelectItem value="女性">女性</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-2">誕生日</label>
						<Input
							{...register('birthday')}
							type="date"
							min="2024-01-01"
							max="2024-12-31"
							placeholder="誕生日"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-2">趣味</label>
						<Input
							{...register('hobby')}
							placeholder="趣味"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
						{errors.hobby && (
							<span className="text-red-500 text-sm">
								{errors.hobby.message}
							</span>
						)}
					</div>

					<div>
						<label className="block text-gray-700 font-bold mb-2">
							所属組織
						</label>
						<Input
							{...register('organization')}
							placeholder="所属組織"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>

					<div>
						<label className="block text-gray-700 font-bold mb-2">
							休日やってること
						</label>
						<Input
							{...register('holidayactivity')}
							placeholder="休日にやってること"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>

					<div>
						<label className="block text-gray-700 font-bold mb-2">
							苦手なこと
						</label>
						<Input
							{...register('weaknesses')}
							placeholder="苦手なこと"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-2">
							好きな色
						</label>
						<Input
							{...register('favoriteColor')}
							placeholder="好きな色"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-2">
							好きな動物
						</label>
						<Input
							{...register('favoriteAnimal')}
							placeholder="好きな動物"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-2">
							好きな場所
						</label>
						<Input
							{...register('favoritePlace')}
							placeholder="好きな場所"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-2">言語</label>
						<Input
							{...register('language')}
							placeholder="言語"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-2">あだ名</label>
						<Input
							{...register('nickname')}
							placeholder="あだ名"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<Button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
					>
						送信
					</Button>
				</form>
			</div>
		</div>
	);
};

export default EditMyPage;
