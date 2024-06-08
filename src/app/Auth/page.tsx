'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';

function Auth() {
	return (
		<div className="flex min-h-screen justify-center items-center px-5">
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
		</div>
	);
}

export default Auth;
