export async function fetchPositionFromKakao(address: string): Promise<{ longitude: number; latitude: number } | null> {
	const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;
	console.log('address', address);
	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
			},
		});
		if (response.status !== 200) {
			throw new Error('Error occured while fetching data');
		}
		const result = await response.json();
		console.log('result', result);
		const { documents, meta } = result;
		if (!documents) {
			throw new Error('no result');
		} else {
			console.log('docs ---------------', documents);
			const longitude = documents[0].x;
			const latitude = documents[0].y;
			return { longitude, latitude };
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}
