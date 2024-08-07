'use client';

import Header from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchFriends, fetchUserName } from '@/services/friendService';
import { FriendNameType } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

function Friends() {
	const router = useRouter();
	const { userId } = useParams();
	const [objects, setObjects] = useState<FriendNameType[]>([]);

	useEffect(() => {
		const loadFriends = async () => {
			const id = Array.isArray(userId) ? userId[0] : userId;
			const friends = await fetchFriends(id);
			const userInfoPromises = friends.map((friend: { friend_id: string }) =>
				fetchUserName(friend.friend_id),
			);
			const friendName = await Promise.all(userInfoPromises);
			setObjects(friendName);
		};
		loadFriends();
	}, []);

	return (
		<div className="h-screen w-screen">
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
											: 'https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_6.png'
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
				<div className="flex flex-raw w-full justify-evenly absolute bottom-20">
					<div
						onClick={() => {
							router.push('/AddFriend');
						}}
						className="flex flex-col items-center justify-evenly"
					>
						<FontAwesomeIcon className="size-[100px]" icon={faUserPlus} />
						<span className="text-[20px]">友達追加</span>
					</div>
					<div
						onClick={() => {
							router.push('/QR');
						}}
						className="flex flex-col items-center justify-center"
					>
						<FontAwesomeIcon className="size-[100px]" icon={faQrcode} />
						<span className="text-[20px]">マイQRコード</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Friends;
