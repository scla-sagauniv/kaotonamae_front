'use client';

import Header from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const objects = [
	{ name: 'ユーザー1' },
	{ name: 'ユーザー2' },
	{ name: 'ユーザー3' },
	{ name: 'ユーザー4' },
	{ name: 'ユーザー5' },
	{ name: 'ユーザー6' },
	{ name: 'ユーザー7' },
	{ name: 'ユーザー8' },
	{ name: 'ユーザー9' },
	{ name: 'ユーザー10' },
];

function Friends() {
	const router = useRouter();

	return (
		<div className="h-screen w-screen">
			<Header />
			<div className="flex flex-col items-center w-full">
				<div className="flex flex-col mt-[45px] overflow-y-auto max-h-[400px] w-10/12">
					{objects.map((object, index) => (
						<div
							key={index}
							className="flex flex-raw items-center border border-black h-[50px] space-x-2 w-full p-3"
						>
							<div className="rounded-full bg-gray-200 w-10 h-10 ml-2"></div>
							<p>{object.name}</p>
						</div>
					))}
				</div>
				<div className="flex flex-raw w-full justify-evenly absolute bottom-20">
					<div className="flex flex-col items-center justify-evenly">
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
						<span className="text-[20px]">QRコード</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Friends;
