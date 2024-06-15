import { QRCodeCanvas } from 'qrcode.react';

type QRCodeProps = {
	value: string;
};

function QRCode(props: QRCodeProps) {
	return (
		<div>
			<QRCodeCanvas value={props.value} size={128} />
		</div>
	);
}

export default QRCode;
