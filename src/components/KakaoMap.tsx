'use client';
import { getGeolocation } from '@/utilities/getGeolocation';
import useKakaoMapLoader from '@/hooks/useKakaoMapLoader';
import { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

export default function KakaoMap() {
	useKakaoMapLoader();
	const [mapLocation, setMapLocation] = useState({
		lat: 0,
		lng: 0,
	});
	console.log(mapLocation);
	const [mapError, setMapError] = useState<string | null>(null);

	useEffect(() => {
		function onSuccess(position: GeolocationPosition) {
			const { latitude, longitude } = position.coords;
			console.log(position.coords);
			setMapLocation({ lat: latitude, lng: longitude });
			setMapError(null);
		}
		function onError(error: GeolocationPositionError) {
			setMapLocation({
				// 지도의 중심좌표
				lat: 37.54699,
				lng: 127.09598,
			});
			setMapError(error.message);
		}
		try {
			getGeolocation(onSuccess, onError, { timeout: 100 });
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div>
			<div>{mapError}</div>
			<Map // 지도를 표시할 Container
				center={mapLocation}
				isPanto={true}
				style={{
					// 지도의 크기
					width: '100%',
					height: '400px',
				}}
				level={3} // 지도의 확대 레벨
			>
				<MapTypeControl position={'TOPRIGHT'} />
				<ZoomControl position={'RIGHT'} />
				{/* {myLocation.show && (
					<MapMarker // 마커를 생성합니다
						position={mapLocation}
						image={{
							src: '/icons/my-location.png', // 마커이미지의 주소입니다
							size: {
								width: 20,
								height: 20,
							}, // 마커이미지의 크기입니다
							options: {
								offset: {
									x: 10,
									y: 10,
								}, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
							},
						}}
					/>
				)} */}
			</Map>
			{/* <button onClick={panToMyLocation}>Find My Location</button>
			{myLocation.loading && <div>LOADING...</div>} */}
		</div>
	);
}
