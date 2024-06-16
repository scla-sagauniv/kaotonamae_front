'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const QuizFalse = () => {
	const router = useRouter();
	// ページ遷移先の設定まだです
	const end = () => {
		router.push('/');
	};
	const next = () => {
		router.push('/');
	};
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1>正解は</h1>
			<div className="rounded-full bg-gray-200 w-[150px] h-[150px]"></div>
			<h1>Aさんです</h1>
			<div>
				<button
					onClick={end}
					className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-6 font-medium text-neutral-50 transition active:scale-110 "
				>
					終了
				</button>
				<button
					onClick={next}
					className="inline-flex h-12 items-center justify-center rounded-md bg-blue-950 px-6 font-medium text-neutral-50 transition active:scale-110 "
				>
					次へ
				</button>
			</div>
		</div>
	);
};
export default QuizFalse;
