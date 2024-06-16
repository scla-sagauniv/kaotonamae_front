'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import EditMyPage from '@/components/mypage/EditMyPage';
import DisPlayMyPage from '@/components/mypage/DisPlayMyPage';
import { Button } from '@/components/ui/button';

const MyForm = () => {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	return (
		<>
			<Header />
			{isEdit ? <EditMyPage /> : <DisPlayMyPage />}
			<Button
				onClick={() => {
					setIsEdit(!isEdit);
				}}
				className="w-1/2"
			>
				{isEdit ? '編集' : '戻る'}
			</Button>
		</>
	);
};

export default MyForm;
