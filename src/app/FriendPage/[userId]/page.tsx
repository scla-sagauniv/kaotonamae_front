'use client';

import Header from '@/components/Header';
import DisPlayUserInfo from '@/components/userInfo/DisPlayUserInfo';

function FriendPage() {
	return (
		<div>
			<Header />
			<div className="flex flex-col mt-[75px]">
				<DisPlayUserInfo />
			</div>
		</div>
	);
}

export default FriendPage;
