import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ProfileInfoType } from '@/types/index';
import { ProfileSchema } from '@/utils/validationSchema';

const EditMyPage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ProfileInfoType>({
		resolver: zodResolver(ProfileSchema),
		mode: 'onChange',
	});

	const onSubmit = (data: ProfileInfoType) => {
		console.log(data);
	};

	return (
		<div>
			<div className="max-h-screen w-full p-4">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className="block text-gray-700 flont-bold mb-2">姓</label>
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
						<label className="block text-gray-700 flont-bold mb-2">名</label>
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
						<label className="block text-gray-700 flont-bold mb-2">セイ</label>
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
						<label className="block text-gray-700 flont-bold mb-2">メイ</label>
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
						<label className="block text-gray-700 flont-bold mb-2">性別</label>
						<Controller
							name="Gender"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="w-[180px] text-border-gray-300 rounded-md">
										<SelectValue placeholder="性別" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="men">男</SelectItem>
										<SelectItem value="women">女</SelectItem>
										<SelectItem value="the_other">その他</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div>
						<label className="block text-gray-700 flont-bold mb-2">
							誕生日
						</label>
						<Input
							type="date"
							min="2024-01-01"
							max="2024-12-31"
							{...register('Birthday')}
							placeholder="誕生日"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 flont-bold mb-2">趣味</label>
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
						<label className="block text-gray-700 flont-bold mb-2">
							所属組織
						</label>
						<Input
							{...register('organization')}
							placeholder="所属組織"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>

					<div>
						<label className="block text-gray-700 flont-bold mb-2">
							休日やってること
						</label>
						<Input
							{...register('holidayactivity')}
							placeholder="休日にやってること"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>

					<div>
						<label className="block text-gray-700 flont-bold mb-2">
							苦手なこと
						</label>
						<Input
							{...register('weaknesses')}
							placeholder="苦手なこと"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 flont-bold mb-2">
							好きな色
						</label>
						<Input
							{...register('FavoriteColor')}
							placeholder="好きな色"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 flont-bold mb-2">
							好きな動物
						</label>
						<Input
							{...register('FavoriteAnimal')}
							placeholder="好きな動物"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 flont-bold mb-2">
							好きな場所
						</label>
						<Input
							{...register('FavoritePlace')}
							placeholder="好きな場所"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 flont-bold mb-2">言語</label>
						<Input
							{...register('Language')}
							placeholder="言語"
							className="w-full p-2 border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label className="block text-gray-700 flont-bold mb-2">
							あだ名
						</label>
						<Input
							{...register('Nickname')}
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
