import '../styles/global.css';
import Script from 'next/script';
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ko'>
			<title>의류 수거함 위치 찾기</title>
			<body className='site-body'>
				<Script
					src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_JS_KEY}&libraries=services,clusterer&autoload=false`}
					strategy='beforeInteractive'
				/>

				<header className='site-header'>
					<h3>서울시 의류 수거함 위치 현황</h3>
				</header>
				{children}
				<footer className='site-footer'>
					<div className='site-footer_content'>
						<div className='site-footer_content_notice'>
							<p>
								<span className='bold'>데이터 출처: </span> 공공데이터포털, 관할구청 홈페이지
							</p>
							<p>
								<span className='bold'>의류 수거함 위치 데이터 미제공 자치구: </span>
								강북구, 도봉구, 용산구, 중구
							</p>
						</div>
					</div>
					<div className='credits'>
						<a href='https://www.flaticon.com/free-icons/dot' target='_blank' title='dot icons'>
							current location icon created by Pixelmeetup - Flaticon
						</a>
					</div>
					<div className='copyright'>
						© 2024{' '}
						<a href='https://github.com/develoHAM' target='_blank'>
							&nbsp;develoHAM&nbsp;
						</a>{' '}
						All rights reserved.
					</div>
				</footer>
			</body>
		</html>
	);
}
