import { useState } from 'react';
import QRCodeReader from '@/components/QRCodeReader';

function QRCodeReaderComponent() {
	const [scannedResult, setScannedResult] = useState('');

	const onNewScanResult = (result: any) => {
		console.log('QRコードスキャン結果');
		console.log(result);
		setScannedResult(result);
	};
	return (
		<>
			<div>
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

export default QRCodeReaderComponent;
