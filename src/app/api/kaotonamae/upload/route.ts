import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: Request) {
	const {
		NEXT_PUBLIC_ACCESS_KEY_ID,
		NEXT_PUBLIC_SECRET_ACCESS_KEY,
		NEXT_PUBLIC_REGION,
		NEXT_PUBLIC_S3_BUCKET_NAME,
	} = process.env;

	const s3Client = new S3Client({
		region: NEXT_PUBLIC_REGION,
		credentials: {
			accessKeyId: NEXT_PUBLIC_ACCESS_KEY_ID || '',
			secretAccessKey: NEXT_PUBLIC_SECRET_ACCESS_KEY || '',
		},
	});

	const { searchParams } = new URL(request.url);
	const fileName = searchParams.get('filename');

	const formData = await request.formData();
	const file: any = formData.get('file');

	const buffer = Buffer.from(await file?.arrayBuffer());

	const uploadParams: any = {
		Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
		Key: fileName,
		Body: buffer,
		ContentType: 'image/png',
		ACL: 'public-read',
	};

	try {
		const command = new PutObjectCommand(uploadParams);
		const uploadResult = await s3Client.send(command);
		console.log('Upload success:', uploadResult);
		const imageUrl = `https://${NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${NEXT_PUBLIC_REGION}.amazonaws.com/${fileName}`;
		return NextResponse.json({ imageUrl });
	} catch (err) {
		console.error(err);
		return NextResponse.json(err);
	}
}
