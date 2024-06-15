'use client';

import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
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

// バリデーションスキーマの定義
const FormSchema = z.object({
	lastName: z.string().nonempty({ message: '姓は必須です。' }),
	firstName: z.string().nonempty({ message: '名は必須です。' }),
	lastname_kana: z.string().nonempty({ message: 'セイは必須です。' }),
	firstname_kana: z.string().nonempty({ message: 'メイは必須です。' }),
	hobby: z.string().nonempty({ message: '趣味は必須です。' }),
	organization: z.string().nonempty({ message: '所属組織は必須です。' }),
	holidayactivity: z
		.string()
		.nonempty({ message: '休日にやっていることは必須です' }),
	weaknesses: z.string().nonempty({ message: '苦手なことは必須です' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const MyForm = () => {
	// TODO apiからデータを取得
	const demo: FormSchemaType = {
		lastName: 'hajime',
		firstName: 'hoshino',
		lastname_kana: 'hajime',
		firstname_kana: 'hoshino',
		hobby: 'climbing',
		organization: 'scla',
		holidayactivity: 'sleeping',
		weaknesses: 'English',
	};

	const [showForm, setShowForm] = useState<boolean>(false);

	// TODO 編集ボタンクリックできりかえ
	// useFormの初期化
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
	});

	// フォーム送信ハンドラー
	const onSubmit = (data: FormSchemaType) => {
		console.log(data);
		// toast({
		// 	title: '以下の内容を送信しました:',
		// 	description: (
		// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
		// 			<code className="text-white">{JSON.stringify(data, null, 2)}</code>
		// 		</pre>
		// 	),
		// });
	};
	const router = useRouter();
	// const { handleSubmit : HOME } = useForm<inputs>({
	// 	// フォームのバリデーションや送信処理など
	// 	onSubmit: async (data) => {
	// 		// フォームのデータを送信する処理

	// 		// 送信後に別のページに遷移する
	// 		router.push('/success-page');
	// 	},
	// });
	return (
		<>
			<Header />

			{showForm ? <UserInfoForm /> : <UserInfo />}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">姓</label>
					<Input
						{...register('lastName')}
						placeholder="姓"
						className="w-full p-2 border-gray-300 rounded-md"
						disabled={!showForm}
					/>
					{errors.lastName && (
						<p className="text-red-500 text-sm">{errors.lastName.message}</p>
					)}
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">名</label>
					<Input
						{...register('firstName')}
						placeholder="名"
						className="w-full p-2 border-gray-300 rounded-md"
						disabled={!showForm}
					/>
					{errors.firstName && (
						<p className="text-red-500 text-sm">{errors.firstName.message}</p>
					)}
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">セイ</label>
					<Input
						{...register('lastname_kana')}
						placeholder="セイ"
						className="w-full p-2 border-gray-300 rounded-md"
						disabled={!showForm}
					/>
					{errors.lastname_kana && (
						<p className="text-red-500 text-sm">
							{errors.lastname_kana.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">メイ</label>
					<Input
						{...register('firstname_kana')}
						placeholder="メイ"
						className="w-full p-2 border-gray-300 rounded-md"
						disabled={!showForm}
					/>
					{errors.firstname_kana && (
						<p className="text-red-500 text-sm">
							{errors.firstname_kana.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">趣味</label>
					<Input
						{...register('hobby')}
						placeholder="趣味"
						className="w-full p-2 border-gray-300 rounded-md"
						disabled={!showForm}
					/>
					{errors.hobby && (
						<p className="text-red-500 text-sm">{errors.hobby.message}</p>
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
						disabled={!showForm}
					/>
					{errors.organization && (
						<p className="text-red-500 text-sm">
							{errors.organization.message}
						</p>
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
						<p className="text-red-500 text-sm">
							{errors.holidayactivity.message}
						</p>
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
					{errors.weaknesses && (
						<p className="text-red-500 text-sm">{errors.weaknesses.message}</p>
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
					{errors.weaknesses && (
						<p className="text-red-500 text-sm">{errors.weaknesses.message}</p>
					)}
				</div>
				<Button
					onClick={() => setShowForm(!showForm)}
					type="submit"
					className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-700"
				>
					{showForm ? 'フォームを非表示' : '編集'}
				</Button>
				{showForm && (
					<Button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
					>
						送信
					</Button>
				)}
				{/* フォームの入力項目 */}
				<Button
					type="button"
					onClick={() => {
						router.push('/');
					}}
					className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-700"
				>
					HOME
				</Button>
			</form>
		</>
	);
};

export default MyForm;
