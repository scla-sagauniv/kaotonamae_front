import { useForm } from 'react-hook-form';
import { SignUpType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function SignUp() {
	const { register, handleSubmit } = useForm<SignUpType>();

	const onSubmit = (data: SignUpType) => {
		console.log('Sign Up');
		console.log(data);
	};

	return (
		<>
			<Card>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-2 mt-3">
						<div className="space-y-1">
							<Label htmlFor="new_email">Email</Label>
							<Input id="new_email" type="email" {...register('email')} />
						</div>
						<div className="space-y-1">
							<Label htmlFor="new_password">Password</Label>
							<Input
								id="new_password"
								type="password"
								{...register('password')}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button>Submit</Button>
					</CardFooter>
				</form>
			</Card>
		</>
	);
}

export default SignUp;
