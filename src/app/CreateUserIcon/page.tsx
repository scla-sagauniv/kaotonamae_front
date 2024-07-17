'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { getCurrentUser } from 'aws-amplify/auth';
import Header from '@/components/Header';

function CreateUserIcon() {
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data: any) => {
		if (!data.file.length) {
			console.log('No file selected');
			return;
		}

		const file = data.file[0];
		console.log('Selected file:', file);
		const imageFileName = file.name;
		const formData = new FormData();
		formData.append('file', file);

		const response = await fetch(
			`/api/kaotonamae/upload?filename=${imageFileName}`,
			{
				method: 'POST',
				body: formData,
			},
		);
		console.log('S3に送信される画像は', response);

		if (!response.ok) {
			console.error('Failed to upload image');
			return;
		}

		const jsonResponse = await response.json();
		console.log('成功');
		console.log(imageFileName);
		console.log(jsonResponse.imageUrl);
		const { userId } = await getCurrentUser();
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/userInfo`,
			{
				userId: userId,
				photo: jsonResponse.imageUrl,
			},
		);
		console.log(res);
	};

	return (
		<div className="h-screen w-screen">
			<Header />
			<div className="flex flex-col items-center justify-center w-full">
				<div className="rounded-full bg-gray-200 w-[230px] h-[230px] mt-[230px]"></div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="file"
						accept="image/png, image/jpeg"
						{...register('file')}
						className="mt-4"
					/>
					<Button className="mt-4 w-1/2 bg-green-500 hover:bg-green-200">
						完了
					</Button>
				</form>
			</div>
		</div>
	);
}

export default CreateUserIcon;
