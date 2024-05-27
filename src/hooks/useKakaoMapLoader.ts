'use client';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

export default function useKakaoMapLoader() {
	const [loading, error] = useKakaoLoader({
		appkey: process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY as string,
		libraries: ['clusterer', 'drawing', 'services'],
	});
}
