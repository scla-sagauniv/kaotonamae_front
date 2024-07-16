import { z } from 'zod';

export const signUpSchema = z
	.object({
		email: z
			.string()
			.min(1, 'メールアドレスは必須です')
			.email('メールアドレスの形式が正しくありません'),
		password: z
			.string()
			.min(6, 'パスワードは6文字以上で入力してください')
			.regex(/[0-9]+/, { message: '数字を含めてください' })
			.regex(/[a-z]+/, { message: '英小文字を含めてください' })
			.regex(/[A-Z]+/, { message: '英大文字を含めてください' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'パスワードが一致しません',
		path: ['confirmPassword'],
	});

export const signInSchema = z.object({
	email: z
		.string()
		.min(1, 'メールアドレスは必須です')
		.email('メールアドレスの形式が正しくありません'),
	password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
});

export const ProfileSchema = z.object({
	lastName: z.string().min(1, '姓は必須です'),
	firstName: z.string().min(1, '名は必須です'),
	firstname_kana: z.string().min(1, 'メイは必須です'),
	lastname_kana: z.string().min(1, 'セイは必須です'),
	hobby: z.string().min(1, '趣味は必須です'),
	organization: z.string().optional(),
	holidayactivity: z.string().optional(),
	weaknesses: z.string().optional(),
	favoriteColor: z.string().optional(),
	favoriteAnimal: z.string().optional(),
	favoritePlace: z.string().optional(),
	language: z.string().optional(),
	birthday: z.string().optional(),
	gender: z.string().optional(),
	nickname: z.string().optional(),
});

export const GroupSchema = z.object({
	groupName: z.string().min(1, 'グループ名は必須です'),
	description: z.string().min(1, 'グループの説明は必須です'),
});
