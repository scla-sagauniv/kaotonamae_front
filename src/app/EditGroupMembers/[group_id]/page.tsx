'use client';

import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FriendNameType } from '@/types';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchFriends, fetchUserName } from '@/services/friendService';
import Image from 'next/image';
import Link from 'next/link';

function EditGroupMembers() {
	const [objects, setObjects] = useState<FriendNameType[]>([]);

	useEffect(() => {
		const loadFriends = async () => {
			const { userId } = await getCurrentUser();
			const friends = await fetchFriends(userId);
			const userInfoPromises = friends.map((friend: { friend_id: string }) =>
				fetchUserName(friend.friend_id),
			);
			const friendName = await Promise.all(userInfoPromises);
			setObjects(friendName);
		};
		loadFriends();
	}, []);
	return (
		<div className="h-screen w-screen flex flex-col mt-[74px]">
			<Header />
			<div className="flex flex-col items-center w-full mt-[74px]">
				<div className="flex flex-col mt-[45px] overflow-y-auto max-h-[400px] w-10/12">
					{objects.map((object, index) => (
						<Link
							href={`/FriendPage/${object.userId}`}
							key={index}
							className="flex flex-raw items-center border border-black h-[50px] space-x-2 w-full p-3"
						>
							<div className="rounded-full bg-gray-200 w-[40px] h-[40px] ml-2 overflow-hidden">
								<Image
									src={
										object.userIcon
											? object.userIcon
											: 'https://kaotonamae.s3.ap-northeast-1.amazonaws.com/fish.png'
									}
									height={70}
									width={70}
									alt="ユーザのアイコン"
									className="object-cover"
								/>
							</div>
							<p>{object.userName}</p>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default EditGroupMembers;
