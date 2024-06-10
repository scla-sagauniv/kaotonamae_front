'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import { useOneTimePassStore } from '@/store/oneTimePassStore';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function Auth() {
	const { isOneTimePass, setOneTimePassFalse } = useOneTimePassStore();

	const onSubmit = () => {
		console.log('Submit');
		setOneTimePassFalse();
	};

	return (
		<div className="flex min-h-screen justify-center items-center px-5">
			{isOneTimePass ? (
				<Card>
					<CardHeader>
						<CardTitle>One-Time Password</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription>
							Please check your email and enter the one time password.
						</CardDescription>
						<form onSubmit={onSubmit}>
							<InputOTP className="flex justify-center" maxLength={6}>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
							<CardFooter className="mt-[40px]">
								<Button type="submit" className="w-full">
									Submit
								</Button>
							</CardFooter>
						</form>
					</CardContent>
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
