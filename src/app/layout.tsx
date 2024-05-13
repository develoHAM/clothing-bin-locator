'use client';
import '../styles/global.css';
import Script from 'next/script';
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ko'>
			<title>의류 수거함 위치 찾기</title>
			<body>
				<Script
					src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&libraries=services,clusterer&autoload=false`}
					strategy='beforeInteractive'></Script>
				<header className='site-header'>
					<h3>의류 수거함 위치</h3>
				</header>
				{children}
			</body>
		</html>
	);
}
