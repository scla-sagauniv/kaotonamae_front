import { Html5Qrcode } from 'html5-qrcode';
import Select from 'react-select';
import { useState, useEffect } from 'react';

function QRCodeReader({
	onScanSuccess,
	onScanFailure,
}: {
	onScanSuccess: any;
	onScanFailure: any;
}) {
	const qrcodeRegionId = 'html5qr-code-full-region';

	const config = { fps: 1, qrbox: { width: 250, height: 250 } };

	const [cameraPermission, setCameraPermission] = useState<boolean>(false);
	const [selectedCameraId, setSelectedCameraId] = useState<string>('');
	const [cameras, setCameras] = useState<any>([]);
	const [Html5QrcodeScanner, setHtml5QrcodeScanner] = useState<any>(null);

	useEffect(() => {
		if (!onScanSuccess && !onScanFailure) {
			throw 'required callback.';
		}

		const scanner = new Html5Qrcode(qrcodeRegionId);
		setHtml5QrcodeScanner(scanner);

		return () => {
			scanner.clear();
		};
	}, []);

	const getCameras = async () => {
		try {
			const cameras = await Html5Qrcode.getCameras();
			if (cameras && cameras.length) {
				const formattedCameras = cameras.map((camera) => ({
					value: camera.id,
					label: camera.label || `Camera ${camera.id}`,
				}));
				setCameras(formattedCameras);
				setSelectedCameraId(formattedCameras[0].value);
				setCameraPermission(true);
			}
		} catch (err) {
			console.error('Error getting cameras:', err);
		}
	};

	const startScan = async () => {
		try {
			await Html5QrcodeScanner.start(
				selectedCameraId,
				config,
				onScanSuccess,
				onScanFailure,
			);
			setHtml5QrcodeScanner(Html5QrcodeScanner);
		} catch (err) {
			console.error('Error starting scanner:', err);
		}
	};

	const stopScan = async () => {
		console.log('Stopping scanner');
		try {
			await Html5QrcodeScanner.stop();
			setHtml5QrcodeScanner(Html5QrcodeScanner);
		} catch (err) {
			console.error('Error stopping scanner:', err);
		}
	};

	const switchCamera = (targetId: string) => {
		console.log('Switching camera to:', targetId);
		setSelectedCameraId(targetId);
	};

	return (
		<div className="container mx-auto">
			<div className="max-w-screen-lg" id={qrcodeRegionId} />
			<div>
				{cameras.length > 0 ? (
					<Select
						name="camera"
						options={cameras}
						value={cameras.find(
							(camera: any) => camera.value === selectedCameraId,
						)}
						placeholder="カメラを選択"
						onChange={async (camera) => await switchCamera(camera.value)}
					/>
				) : (
					<p>カメラがありません</p>
				)}
			</div>
			<div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded mr-2"
					onClick={() => getCameras()}
				>
					カメラ取得
				</button>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded mr-2"
					onClick={async () => await startScan()}
					disabled={!cameraPermission && selectedCameraId == ''}
				>
					スキャン開始
				</button>
				<button
					className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
					onClick={async () => await stopScan()}
				>
					スキャン停止
				</button>
			</div>
		</div>
	);
}

export default QRCodeReader;
