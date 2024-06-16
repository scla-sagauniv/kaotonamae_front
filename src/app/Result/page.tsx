'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Result = () => {
	const router = useRouter();
	const result = () => {
		router.push('/');
	};
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110">
				結果
			</div>
			<div className="text-4xl">得点</div>
			<button
				onClick={result}
				className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110 "
			>
				戻る
			</button>
		</div>
	);
};
export default Result;
