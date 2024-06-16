'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { QuizType } from '@/types';
import QuizCorrect from '@/app/QuizCorrect/page';
import QuizFalse from '@/app/QuizFalse/page';

function Quiz() {
	const [quizData, setQuizData] = useState<QuizType[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswer, setUserAnswer] = useState('');
	const [showHint, setShowHint] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const router = useRouter();
	const params = useParams();
	const id = params.id; // 動的パラメータを取得

	useEffect(() => {
		// コンポーネントがマウントされたときにクイズデータをAPIから取得
		async function fetchQuizData() {
			try {
				const response = await axios.get<QuizType[]>(
					`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/quiz/${id}`,
				);
				setQuizData(response.data);
			} catch (error) {
				console.error('Error fetching quiz data:', error);
			}
		}
		fetchQuizData();
	}, [id]);

	const handleSubmit = () => {
		const currentQuestion = quizData[currentQuestionIndex];
		if (currentQuestion.quizAnswer === userAnswer) {
			setIsCorrect(true);
		} else {
			setIsCorrect(false);
		}
		setShowResult(true);
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < quizData.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setUserAnswer('');
			setShowHint(false);
			setShowResult(false);
		} else {
			router.push('/'); // クイズが終わったら他のページにリダイレクト
		}
	};

	if (quizData.length === 0) {
		return <div>Loading...</div>;
	}

	const currentQuestion = quizData[currentQuestionIndex];

	return (
		<div className="flex flex-col items-center h-screen w-screen">
			{!showResult && (
				<>
					<div className="text-[25px] mt-[35px]">
						{currentQuestion.quizQuestionTop}
					</div>
					<div className="rounded-full bg-gray-200 w-[230px] h-[230px] mt-2">
						{/* ユーザの写真があれば表示 */}
						{currentQuestion.userPhoto && (
							<img
								src={currentQuestion.userPhoto}
								alt="User Photo"
								className="w-full h-full rounded-full object-cover"
							/>
						)}
					</div>
					<div className="text-[25px]">
						{currentQuestion.quizQuestionBottom}
					</div>
					<div className="w-full mt-3 space-y-3 p-5">
						<Input
							id="answer"
							value={userAnswer}
							onChange={(e) => setUserAnswer(e.target.value)}
							className="border border-black"
						/>
						<div className="flex flex-row justify-evenly w-full">
							<Button
								onClick={() => setShowHint(true)}
								className="w-2/5 mt-3 bg-green-500 hover:bg-green-200"
							>
								ヒント
							</Button>
							<Button
								type="submit"
								className="w-2/5 mt-3 bg-green-500 hover:bg-green-200"
								onClick={handleSubmit}
							>
								回答
							</Button>
						</div>
					</div>
					{showHint && (
						<div className="border border-black w-5/6 h-[250px] mt-[20px] overflow-y-auto space-y-7 bg-yellow-200">
							{Object.entries(currentQuestion.quizHint).map(
								([key, value], index) => (
									<div key={index} className="flex flex-col">
										<div>ヒント{index + 1}</div>
										<p>{value}</p>
									</div>
								),
							)}
						</div>
					)}
				</>
			)}
			{showResult && (
				<div className="mt-5 text-[20px] w-full flex flex-col items-center">
					{isCorrect ? (
						<QuizCorrect
							onNext={handleNextQuestion}
							onEnd={() => router.push('/')}
						/>
					) : (
						<QuizFalse
							correctAnswer={currentQuestion.quizAnswer}
							onNext={handleNextQuestion}
							onEnd={() => router.push('/')}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default Quiz;
