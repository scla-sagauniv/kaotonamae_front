'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import EditMyPage from '@/components/userInfo/EditMyPage';
import DisPlayUserInfo from '@/components/userInfo/DisPlayUserInfo';
import { Button } from '@/components/ui/button';
import { CreateUserInfo } from '@/services/userInfoService';

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
				<div>
					{isEdit ? (
						<EditMyPage UserInfoFunction={CreateUserInfo} />
					) : (
						<DisPlayUserInfo />
					)}
				</div>
			</div>
		</>
	);
};

export default MyPage;
