import { useForm } from 'react-hook-form';
import { SignUpType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpSchema } from '@/utils/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from 'aws-amplify/auth';
import { useOneTimePassStore } from '@/store/oneTimePassStore';

function SignUp() {
	const {
		setOneTimePassTrue,
		setConfirmEmail,
		setConfirmPassword,
		confirmEmail,
	} = useOneTimePassStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpType>({
		mode: 'onChange',
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = async (data: SignUpType) => {
		if (data.password !== data.confirmPassword) {
			console.error('Password does not match');
			return;
		}
		try {
			const userData = await signUp({
				username: data.email,
				password: data.password,
				options: {
					userAttributes: {
						email: data.email,
					},
				},
			});
			console.log('Sign Up', userData);
			setConfirmEmail(data.email);
			setConfirmPassword(data.password);
			setOneTimePassTrue();
		} catch (error) {
			console.error('Error during sign up:', error);
		}
	};

	return (
		<Card>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardContent className="space-y-2 mt-3">
					<div className="space-y-1">
						<Label htmlFor="new_email">Email</Label>
						<Input
							id="new_email"
							type="email"
							placeholder="メールアドレス"
							{...register('email')}
						/>
						{errors.email && (
							<span className="text-red-500 text-[13px]">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="space-y-1">
						<Label htmlFor="new_password">Password</Label>
						<Input
							id="new_password"
							type="password"
							placeholder="パスワード"
							{...register('password')}
						/>
						{errors.password && (
							<span className="text-red-500 text-[13px]">
								{errors.password.message}
							</span>
						)}
					</div>
					<div className="space-y-1">
						<Label htmlFor="re_password">Password(再入力)</Label>
						<Input
							id="re_password"
							type="password"
							placeholder="パスワード"
							{...register('confirmPassword')}
						/>
						{errors.confirmPassword && (
							<span className="text-red-500 text-[13px]">
								{errors.confirmPassword.message}
							</span>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}

export default SignUp;
