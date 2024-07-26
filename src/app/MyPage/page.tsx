'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import EditMyPage from '@/components/userInfo/EditMyPage';
import DisPlayMyPage from '@/components/userInfo/DisPlayMyPage';
import { Button } from '@/components/ui/button';

const MyPage = () => {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	return (
		<>
			<Header />
			<div className="flex flex-col mt-[75px]">
				<Button
					onClick={() => {
						setIsEdit(!isEdit);
					}}
					className="w-[70px]"
				>
					{isEdit ? '戻る' : '編集'}
				</Button>
				<div>{isEdit ? <EditMyPage /> : <DisPlayMyPage />}</div>
			</div>
		</>
	);
};

export default MyPage;
