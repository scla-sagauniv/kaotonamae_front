'use client';

import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, FileDiff } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { string, z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UserInfoForm from '@/components/mypage/UerInfoForm';
import UserInfo from '@/components/mypage/UserInfo';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
// const FormSchema = z.object({
// 	lastName: z.string().nonempty({ message: '姓は必須です。' }),
// 	firstName: z.string().nonempty({ message: '名は必須です。' }),
// 	lastname_kana: z.string().nonempty({ message: 'セイは必須です。' }),
// 	firstname_kana: z.string().nonempty({ message: 'メイは必須です。' }),
// 	hobby: z.string().nonempty({ message: '趣味は必須です。' }),
// 	organization: z.string().nonempty({ message: '所属組織は必須です。' }),
// 	holidayactivity: z
// 		.string()
// 		.nonempty({ message: '休日にやっていることは必須です' }),
// 	weaknesses: z.string().nonempty({ message: '苦手なことは必須です' }),
// 	FavoriteColor: z.string().nonempty({ message: '好きな色は必須です' }),
// 	FavoriteAnimal: z.string().nonempty({ message: '好きな動物は必須です' }),
// 	FavoritePlace: z.string().nonempty({ message: '好きな場所は必須です' }),
// 	Language: z.string().nonempty({ message: '言語は必須です' }),
// 	Age: z.string().nonempty({ message: '年齢は必須です' }),
// 	Birthday: z.string().nonempty({ message: '誕生日は必須です' }),
// 	Gender: z.string().nonempty({ message: '性別は必須です' }),
// 	Nickname: z.string().nonempty({ message: 'あだ名は必須です' }),
// });

// type FormSchemaType = z.infer<typeof FormSchema>;

const MyForm = () => {
	// const demo: FormSchemaType = {
	// 	lastName: 'a',
	// 	firstName: 'a',
	// 	lastname_kana: 'a',
	// 	firstname_kana: 'a',
	// 	hobby: 'a',
	// 	organization: 'a',
	// 	holidayactivity: 'a',
	// 	weaknesses: 'a',
	// 	FavoriteColor: 'a',
	// 	FavoriteAnimal: 'a',
	// 	FavoritePlace: 'a',
	// 	Language: 'a',
	// 	Age: 'a',
	// 	Birthday: 'a',
	// 	Gender: 'a',
	// 	Nickname: 'a',
	// };

	const [showForm, setShowForm] = useState<boolean>(true);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		// resolver: zodResolver(FormSchema),
	});

	const onSubmit = (data: any) => {
		console.log('テスト');
		console.log(data);
	};
	const router = useRouter();

	return (
		<>
			<Header />
			{showForm ? <UserInfoForm /> : <UserInfo />}
			<div className="max-h-screen w-full p-4">
				<div>
					<div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									姓
								</label>
								<Input
									{...register('lastName')}
									placeholder="姓"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.lastName && <p className="text-red-500 text-sm"></p>}
							</div>

							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									名
								</label>
								<Input
									{...register('firstName')}
									placeholder="名"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.firstName && <p className="text-red-500 text-sm"></p>}
							</div>

							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									セイ
								</label>
								<Input
									{...register('lastname_kana')}
									placeholder="セイ"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.lastname_kana && (
									<p className="text-red-500 text-sm"></p>
								)}
							</div>

							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									メイ
								</label>
								<Input
									{...register('firstname_kana')}
									placeholder="メイ"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.firstname_kana && (
									<p className="text-red-500 text-sm"></p>
								)}
							</div>

							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									性別
								</label>
								<Controller
									name="Gender"
									control={control}
									render={({ field }) => (
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={!showForm}
										>
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
								{errors.Gender && <p className="text-red-500 text-sm"></p>}
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
									disabled={!showForm}
								/>
								{errors.Birthday && <p className="text-red-500 text-sm"></p>}
							</div>
							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									趣味
								</label>
								<Input
									{...register('hobby')}
									placeholder="趣味"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
							</div>

							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									所属組織
								</label>
								<Input
									{...register('organization')}
									placeholder="所属組織"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.organization && (
									<p className="text-red-500 text-sm"></p>
								)}
							</div>

							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									休日やってること
								</label>
								<Input
									{...register('holidayactivity')}
									placeholder="休日にやってること"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.holidayactivity && (
									<p className="text-red-500 text-sm"></p>
								)}
							</div>

							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									苦手なこと
								</label>
								<Input
									{...register('weaknesses')}
									placeholder="苦手なこと"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.weaknesses && <p className="text-red-500 text-sm"></p>}
							</div>
							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									好きな色
								</label>
								<Input
									{...register('FavoriteColor')}
									placeholder="好きな色"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.FavoriteColor && (
									<p className="text-red-500 text-sm"></p>
								)}
							</div>
							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									好きな動物
								</label>
								<Input
									{...register('FavoriteAnimal')}
									placeholder="好きな動物"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.FavoriteAnimal && (
									<p className="text-red-500 text-sm"></p>
								)}
							</div>
							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									好きな場所
								</label>
								<Input
									{...register('FavoritePlace')}
									placeholder="好きな場所"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.FavoritePlace && (
									<p className="text-red-500 text-sm"></p>
								)}
							</div>
							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									言語
								</label>
								<Input
									{...register('Language')}
									placeholder="言語"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.Language && <p className="text-red-500 text-sm"></p>}
							</div>
							<div>
								<label className="block text-gray-700 flont-bold mb-2">
									あだ名
								</label>
								<Input
									{...register('Nickname')}
									placeholder="あだ名"
									className="w-full p-2 border-gray-300 rounded-md"
									disabled={!showForm}
								/>
								{errors.Nickname && <p className="text-red-500 text-sm"></p>}
							</div>
							{/* <Button
								onClick={() => setShowForm(!showForm)}
								className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-700"
							>
								{showForm ? 'フォームを非表示' : '編集'}
							</Button> */}
							{showForm && (
								<Button
									type="submit"
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
								>
									送信
								</Button>
							)}
							{/* <Button
								onClick={() => {
									router.push('/');
								}}
								className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-700"
							>
								HOME
							</Button> */}
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyForm;
