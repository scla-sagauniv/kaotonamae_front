'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
function Result() {
	const router = useRouter();
	const result = () => {
		router.push('/');
	};
	return (
		<div className="flex min-h-screen justify-center items-center px-10">
			<Card className="items-center">
				<CardHeader className="flex justify-center w-full">
					<CardTitle className="text-center">結果</CardTitle>
					<CardDescription className="text-center"></CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center w-full"></CardContent>
				<CardFooter className="flex justify-center w-full">
					<div className="flex space-x-4">
						<button
							onClick={result}
							className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110 "
						>
							戻る
						</button>
					</div>
				</CardFooter>
			</Card>
		</div>
		// <div className="flex flex-col items-center justify-center h-screen">
		// 	<div className="text-5xl text-border-gray-100 rounded-md items-">
		// 		結果
		// 	</div>
		// 	<div className="text-4xl">得点</div>

		// </div>
	);
}
export default Result;
