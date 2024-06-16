import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import axios from 'axios';
import { ProfileInfoType } from '@/types/index';

function DisPlayMyPage() {
	useEffect(() => {
		console.log('useEffect');
		try {
			const fetchProfileInfo = async () => {
				const { userId } = await getCurrentUser();
				const res = await axios.get(
					`${process.env.NEXT_PUBLIC_VITE_GO_APP_API_URL}/userInfo/${userId}`,
				);
				console.log(res.data);
				setProfileInfo({
					...res.data,
					firstName: res.data.userFirstName,
					lastName: res.data.userLastName,
					firstNameKana: res.data.firstNameFurigana,
					lastNameKana: res.data.lastNameFurigana,
					birthday: res.data.birthday,
					hobby: res.data.hobbys,
					gender: res.data.gender,
					organization: res.data.organization,
					holidayActivity: res.data.holidayActivity,
					weaknesses: res.data.weaknesses,
					favoriteColor: res.data.favoriteColor,
					favoriteAnimal: res.data.favoriteAnimal,
					favoritePlace: res.data.favoritePlace,
					language: res.data.language,
					nickname: res.data.nickname,
				});
			};
			fetchProfileInfo();
		} catch (error) {
			console.error('Error during fetch profile info:', error);
		}
	}, []);

	const [profileInfo, setProfileInfo] = useState<ProfileInfoType | null>(null);
	return (
		<div>
			<div className="max-h-screen w-full p-4">
				<div>
					<label className="block text-gray-700 flont-bold mb-2">姓</label>
					<div className="h-[30px]">{profileInfo?.lastName}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">名</label>
					<div>{profileInfo?.firstName}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">セイ</label>
					<div>{profileInfo?.lastname_kana}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">メイ</label>
					<div>{profileInfo?.firstname_kana}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">性別</label>
					<div>{profileInfo?.Gender}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">誕生日</label>
					<div>{profileInfo?.Birthday}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">趣味</label>
					<div>{profileInfo?.hobby}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						所属組織
					</label>
					<div>{profileInfo?.organization}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						休日やってること
					</label>
					<div>{profileInfo?.holidayactivity}</div>
				</div>

				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						苦手なこと
					</label>
					<div>{profileInfo?.weaknesses}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						好きな色
					</label>
					<div>{profileInfo?.FavoriteColor}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						好きな動物
					</label>
					<div>{profileInfo?.FavoriteAnimal}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">
						好きな場所
					</label>
					<div>{profileInfo?.FavoritePlace}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">言語</label>
					<div>{profileInfo?.Language}</div>
				</div>
				<div>
					<label className="block text-gray-700 flont-bold mb-2">あだ名</label>
					<div>{profileInfo?.Nickname}</div>
				</div>
				<Button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
					ホーム
				</Button>
			</div>
		</div>
	);
}

export default DisPlayMyPage;
