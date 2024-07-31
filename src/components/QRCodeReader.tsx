import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

function QRCodeReader({
	onScanSuccess,
	onScanFailure,
}: {
	onScanSuccess: (result: string) => void;
	onScanFailure: (error: string) => void;
}) {
	const router = useRouter();
	const qrcodeRegionId = 'html5qr-code-full-region';

	const config = { fps: 1, qrbox: { width: 250, height: 250 } };

	const scannerRef = useRef<Html5Qrcode | null>(null);

	useEffect(() => {
		console.log('QRCodeReader mounted');
		const loadCamera = async () => {
			scannerRef.current = new Html5Qrcode(qrcodeRegionId);
			const cameras = await Html5Qrcode.getCameras();
			if (cameras && cameras.length) {
				const formattedCameras = cameras.map((camera) => ({
					value: camera.id,
					label: camera.label || `Camera ${camera.id}`,
				}));
				await scannerRef.current.start(
					formattedCameras[0].value,
					config,
					async (result: string) => {
						onScanSuccess(result);
						if (scannerRef.current) {
							await scannerRef.current.stop();
						}
						router.push('/');
					},
					onScanFailure,
				);
			}
		};
		loadCamera();

		return () => {
			if (scannerRef.current) {
				scannerRef.current.clear();
			}
		};
	}, []);

	return (
		<div className="container mx-auto">
			<div className="max-w-screen-lg" id={qrcodeRegionId} />
		</div>
	);
}

export default QRCodeReader;
