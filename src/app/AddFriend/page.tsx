'use client';

import { useState } from 'react';
import QRCodeReader from '@/components/QRCodeReader';
import Header from '@/components/Header';

function AddFriend() {
	const [scannedResult, setScannedResult] = useState('');

	const onNewScanResult = (result: any) => {
		console.log('QRコードスキャン結果');
		console.log(result);
		setScannedResult(result);
	};
	return (
		<>
			<Header />
			<div className="mt-[75px]">
				<h2>スキャン結果：{scannedResult}</h2>
			</div>
			<QRCodeReader
				onScanSuccess={onNewScanResult}
				onScanFailure={(error: any) => {
					console.log('Qr scan error', error);
				}}
			/>
		</>
	);
}

export default AddFriend;
