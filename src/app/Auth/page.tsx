import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Auth() {
	return (
		<div className="flex min-h-screen justify-center items-center px-5">
			<Tabs defaultValue="signIn" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="signIn">Sign in</TabsTrigger>
					<TabsTrigger value="signUp">Sign up</TabsTrigger>
				</TabsList>
				<TabsContent value="signIn">
					<Card>
						<CardContent className="space-y-2 mt-3">
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Submit</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="signUp">
					<Card>
						<CardContent className="space-y-2 mt-3">
							<div className="space-y-1">
								<Label htmlFor="new_email">Email</Label>
								<Input id="new_email" type="email" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="new_password">Password</Label>
								<Input id="new_password" type="password" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Submit</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Auth;
