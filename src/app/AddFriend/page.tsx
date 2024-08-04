'use client';

import { useState } from 'react';
import QRCodeReader from '@/components/QRCodeReader';
import Header from '@/components/Header';

function AddFriend() {
	const [scannedResult, setScannedResult] = useState('');

	const onNewScanResult = (result: string) => {
		console.log('QRコードスキャン結果');
		setScannedResult(result);
		console.log('スキャン結果', scannedResult);
	};
	return (
		<>
			<Header />
			<div className="flex flex-col justify-center h-screen">
				<QRCodeReader
					onScanSuccess={onNewScanResult}
					onScanFailure={(error: string) => {
						return error;
					}}
				/>
			</div>
		</>
	);
}

export default AddFriend;
