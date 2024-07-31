'use client';

import EditMyPage from '@/components/userInfo/EditMyPage';
import { CreateUserInfo } from '@/services/userInfoService';
import Header from '@/components/Header';

function NewMyInfo() {
	return (
		<>
			<Header />
			<div className="flex flex-col mt-[75px]">
				<EditMyPage UserInfoFunction={CreateUserInfo} />
			</div>
		</>
	);
}

export default NewMyInfo;
