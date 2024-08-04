'use client';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function QR() {
	const [qrValue, setQrValue] = useState('');
	const router = useRouter();

	useEffect(() => {
		const getUserID = async () => {
			const { userId } = await getCurrentUser();
			console.log('user id: ', userId);
			setQrValue(userId);
		};
		getUserID();
	}, []);

	return (
		<div className="flex justify-center h-screen w-screen">
			<div className="flex flex-col items-center mt-[200px] w-full">
				<QRCode value={qrValue} size={300} />
				<Button
					onClick={() => {
						router.push(`/`);
					}}
					className="mt-10 w-3/4"
				>
					ホームへ
				</Button>
			</div>
		</div>
	);
}

export default QR;
