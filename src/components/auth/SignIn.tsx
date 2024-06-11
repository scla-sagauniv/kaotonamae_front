import { useForm } from 'react-hook-form';
import { SignInType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInSchema } from '@/utils/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

function SignIn() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInType>({
		mode: 'onChange',
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async (data: SignInType) => {
		try {
			const userData = await signIn({
				username: data.email,
				password: data.password,
			});
			console.log('Sign In', userData);
			router.push('/');
		} catch (error) {
			console.error('Error during sign in:', error);
		}
	};
	return (
		<>
			<Card>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-2 mt-3">
						<div className="space-y-1">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
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
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
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
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Submit
						</Button>
					</CardFooter>
				</form>
			</Card>
		</>
	);
}

export default SignIn;
