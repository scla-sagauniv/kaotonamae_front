'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

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

		if (!response.ok) {
			console.error('Failed to upload image');
			return;
		}

		const jsonResponse = await response.json();
		console.log('Upload successful:', jsonResponse.imageUrl);
	};

	return (
		<div className="h-screen w-screen">
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
