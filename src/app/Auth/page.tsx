'use client';

import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import { useOneTimePassStore } from '@/store/oneTimePassStore';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { confirmSignUp, signIn } from 'aws-amplify/auth';
import { OneTimePassType } from '@/types';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from 'aws-amplify/auth';
import { CreateAuth } from '@/services/authService';

function Auth() {
	const router = useRouter();
	const { isOneTimePass, confirmEmail, confirmPassword, setConfirmPassword } =
		useOneTimePassStore();

	const { register, handleSubmit } = useForm<OneTimePassType>();

	const onSubmit = async (data: OneTimePassType) => {
		try {
			const confirmData = await confirmSignUp({
				username: confirmEmail,
				confirmationCode: data.otp,
			});
			console.log('Confirm Sign Up', confirmData);
			const userData = await signIn({
				username: confirmEmail,
				password: confirmPassword,
			});
			console.log('Sign In', userData);
			const { userId } = await getCurrentUser();
			await CreateAuth(userId, confirmEmail, confirmPassword);
			console.log('メール', confirmEmail);
			setConfirmPassword('');
			router.push('/');
		} catch (error) {
			console.error('Error during confirm sign up:', error);
			console.log(data.otp);
			console.log(confirmEmail);
			console.log('エラー');
		}
	};

	return (
		<div className="flex min-h-screen justify-center items-center px-5">
			{isOneTimePass ? (
				<Card>
					<form onSubmit={handleSubmit(onSubmit)}>
						<CardHeader>
							<CardTitle>One-Time Password</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Please check your email and enter the one time password.
							</CardDescription>
							<Input {...register('otp')} />
						</CardContent>
						<CardFooter className="mt-[40px]">
							<Button type="submit" className="w-full">
								Submit
							</Button>
						</CardFooter>
					</form>
				</Card>
			) : (
				<Tabs defaultValue="signIn" className="w-[400px]">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="signIn">Sign in</TabsTrigger>
						<TabsTrigger value="signUp">Sign up</TabsTrigger>
					</TabsList>
					<TabsContent value="signIn">
						<SignIn />
					</TabsContent>
					<TabsContent value="signUp">
						<SignUp />
					</TabsContent>
				</Tabs>
			)}
		</div>
	);
}

export default Auth;
