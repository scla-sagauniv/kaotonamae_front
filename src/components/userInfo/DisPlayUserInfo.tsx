import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { ProfileInfoType } from '@/types/index';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { fetchUserInfo } from '@/services/userInfoService';

function DisPlayUserInfo() {
	const router = useRouter();
	const { userId } = useParams();
	const [profileInfo, setProfileInfo] = useState<ProfileInfoType | null>(null);
	const [Loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadUserInfo = async () => {
			const id = Array.isArray(userId) ? userId[0] : userId;
			const userInfo = await fetchUserInfo(id);
			setProfileInfo(userInfo);
			setLoading(false);
		};
		loadUserInfo();
	}, []);

	if (Loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className="max-h-screen w-full p-4">
				{profileInfo && (
					<div className="flex justify-center">
						<div className="w-[300px] h-[300px] rounded-full overflow-hidden flex justify-center items-center">
							<Image
								src={
									profileInfo.icon
										? profileInfo.icon
										: 'https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_6.png'
								}
								height={400} // 親要素より大きく設定
								width={400} // 親要素より大きく設定
								alt="ユーザのアイコン"
								className="object-cover"
							/>
						</div>
					</div>
				)}
				<div>
					<label className="block text-gray-700 flont-bold mb-2">姓</label>
					<div className="h-[30px]">{profileInfo?.lastName}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">名</label>
					<div className="h-[30px]">{profileInfo?.firstName}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">セイ</label>
					<div className="h-[30px]">{profileInfo?.lastname_kana}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">メイ</label>
					<div className="h-[30px]">{profileInfo?.firstname_kana}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">性別</label>
					<div className="h-[30px]">{profileInfo?.gender}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">誕生日</label>
					<div className="h-[30px]">{profileInfo?.birthday}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">趣味</label>
					<div className="h-[30px]">{profileInfo?.hobby}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						所属組織
					</label>
					<div className="h-[30px]">{profileInfo?.organization}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						休日やってること
					</label>
					<div className="h-[30px]">{profileInfo?.holidayactivity}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						苦手なこと
					</label>
					<div className="h-[30px]">{profileInfo?.weaknesses}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						好きな色
					</label>
					<div className="h-[30px]">{profileInfo?.favoriteColor}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						好きな動物
					</label>
					<div className="h-[30px]">{profileInfo?.favoriteAnimal}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						好きな場所
					</label>
					<div className="h-[30px]">{profileInfo?.favoritePlace}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">言語</label>
					<div className="h-[30px]">{profileInfo?.language}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">あだ名</label>
					<div className="h-[30px]">{profileInfo?.nickname}</div>
				</div>
				<Button
					onClick={() => {
						router.push('/');
					}}
					className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
				>
					ホーム
				</Button>
			</div>
		</div>
	);
}

export default DisPlayUserInfo;
