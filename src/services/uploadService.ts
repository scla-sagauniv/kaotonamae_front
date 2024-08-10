export const handleImageUpload = async (file: File): Promise<string | null> => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('filename', file.name);

	try {
		const res = await fetch(`/api/kaotonamae/upload?filename=${file.name}`, {
			method: 'POST',
			body: formData,
		});

		if (!res.ok) {
			console.error('画像のアップロードに失敗しました');
		}

		const jsonRes = await res.json();
		return jsonRes.imageUrl;
	} catch (err) {
		console.error('画像のアップロードに失敗しました', err);
		return null;
	}
};
