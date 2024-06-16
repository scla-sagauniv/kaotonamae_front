'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface QuizCorrectProps {
	onNext: () => void;
	onEnd: () => void;
}

function QuizCorrect({ onNext, onEnd }: QuizCorrectProps) {
	return (
		<div className="flex min-h-screen justify-center items-center px-10">
			<Card className="items-center">
				<CardHeader className="flex justify-center w-full">
					<CardTitle className="text-center">正解です。</CardTitle>
					<CardDescription className="text-center">
						<CardContent className="rounded-full bg-gray-200 w-[150px] h-[150px]"></CardContent>
					</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center w-full">
					<p className="text-center">素晴らしい</p>
				</CardContent>
				<CardFooter className="flex justify-center w-full">
					<div className="flex space-x-4">
						<Button
							onClick={onEnd}
							className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-6 font-medium text-neutral-50 transition active:scale-110"
						>
							終了
						</Button>
						<Button
							onClick={onNext}
							className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-6 font-medium text-neutral-50 transition active:scale-110"
						>
							次へ
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}

export default QuizCorrect;
