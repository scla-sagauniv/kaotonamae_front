'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Quiz() {
	const [openHint, setOpenHint] = useState<boolean>(false);
	const router = useRouter();

	const object = [
		{ hint: '酒、競馬が好き' },
		{ hint: '常に金欠' },
		{ hint: '1限起きれない' },
	];

	const onSubmit = () => {
		router.push('/');
	};
	return (
		<div className="flex flex-col items-center h-screen w-screen">
			<div className="text-[25px] mt-[35px]">この写真の方の</div>
			<div className="rounded-full bg-gray-200 w-[230px] h-[230px] mt-2"></div>
			<div className="w-full mt-3 space-y-3 p-5">
				<Label htmlFor="answer" className="text-[25px]">
					お名前は?(カタカナ)
				</Label>
				<Input id="answer" className="border border-black" />
				<div className="flex flex-row justify-evenly w-full">
					<Button
						onClick={() => {
							setOpenHint(true);
						}}
						className="w-2/5 mt-3 bg-green-500 hover:bg-green-200"
					>
						ヒント
					</Button>
					<Button
						type="submit"
						className="w-2/5 mt-3 bg-green-500 hover:bg-green-200"
						onClick={onSubmit}
					>
						回答
					</Button>
				</div>
			</div>
			{openHint && (
				<div className="border border-black w-5/6 h-[250px] mt-[20px] overflow-y-auto space-y-7 bg-yellow-200">
					{object.map((object, index) => (
						<div key={index} className="flex flex-col">
							<div>ヒント{index + 1}</div>
							<p>{object.hint}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Quiz;
