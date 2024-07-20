import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import axios from 'axios';
import { ProfileInfoType } from '@/types/index';
import Image from 'next/image';

function DisPlayMyPage() {
	const [profileInfo, setProfileInfo] = useState<ProfileInfoType | null>(null);
	const [Loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		try {
			const fetchProfileInfo = async () => {
				const { userId } = await getCurrentUser();
				const res = await axios.get(
					`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/v1/userInfo/${userId}`,
				);
				console.log(res);
				console.log(res.data);
				setProfileInfo({
					firstName: res.data.userInfo.user_first_name,
					lastName: res.data.userInfo.user_last_name,
					firstname_kana: res.data.userInfo.user_first_name_kana,
					lastname_kana: res.data.userInfo.user_last_name_kana,
					birthday: res.data.userInfo.birth_date,
					hobby: res.data.userInfo.hobby,
					gender: res.data.userInfo.gender,
					organization: res.data.userInfo.organization,
					holidayactivity: res.data.userInfo.holiday_activity,
					weaknesses: res.data.userInfo.weakness,
					favoriteColor: res.data.userInfo.favorite_color,
					favoriteAnimal: res.data.userInfo.favorite_animal,
					favoritePlace: res.data.userInfo.favorite_place,
					language: res.data.userInfo.language,
					nickname: res.data.userInfo.nickname,
					icon: res.data.userInfo.icon,
				});
				setLoading(false);
			};
			fetchProfileInfo();
		} catch (error) {
			console.error('Error during fetch profile info:', error);
			setLoading(false);
		}
		console.log('profileInfo:', profileInfo);
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
								src={profileInfo.icon}
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
				<Button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
					ホーム
				</Button>
			</div>
		</div>
	);
}

export default DisPlayMyPage;
