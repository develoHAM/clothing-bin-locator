'use client';

import useGeolocation from '@/hooks/useGeolocation';
import { Map, MapMarker, MapMarkerProps, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState, useDeferredValue } from 'react';

import { MapMarkerState, MapState, Position } from '@/types/KakaoMap';

export default function KakaoMap() {
	// useGeolocation Custom Hook로 현재 위치 로딩 상태, 위치, 그리고 에러 반환
	const kakaoMapRef = useRef<null | kakao.maps.Map>(null);
	const options: PositionOptions = { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 };
	const [geolocationLoading, geolocationPosition, geolocationError, refreshGeolocation] = useGeolocation(options);
	const [myLocationPin, setMyLocationPin] = useState<null | MapMarkerState>(null);

	const [mapState, setMapState] = useState<MapState | null>(null);

	useEffect(() => {
		if (geolocationPosition) {
			setMapState((prev) => {
				return { ...prev, center: geolocationPosition, isPanto: true, level: 2 };
			});
		}
	}, [geolocationPosition]);

	const initiateMapState = (map: kakao.maps.Map) => {
		console.log('map initiated');
	};

	const dropMyLocationPin = () => {
		if (geolocationPosition) {
			setMyLocationPin((prev) => {
				return { ...prev, position: geolocationPosition, title: '현재 위치' };
			});
		} else {
			console.log('no geo');
		}
	};

	const removeMyLocationPin = () => {
		setMyLocationPin(null);
	};

	const centerMapToMyLocation = () => {
		refreshGeolocation();
		dropMyLocationPin();
	};

	const updateMapState = (map: kakao.maps.Map) => {
		const newCenter = {
			lat: map.getCenter().getLat(),
			lng: map.getCenter().getLng(),
		};
		const newLevel = map.getLevel();

		setMapState((prev) => {
			return { ...prev, center: newCenter, level: newLevel, isPanto: true };
		});
	};

	return (
		<div>
			{mapState && (
				<Map
					ref={kakaoMapRef}
					center={mapState.center}
					level={mapState.level}
					isPanto={mapState.isPanto}
					style={{
						width: '100%',
						height: 400,
					}}
					onCreate={initiateMapState}
					onIdle={updateMapState}>
					<MapTypeControl position={'TOPRIGHT'} />
					<ZoomControl position={'RIGHT'} />

					{myLocationPin && (
						<MapMarker
							key={`${myLocationPin.position.lat}-${myLocationPin.position.lng}`}
							position={myLocationPin.position}
							image={{
								src: '/icons/my-location-pin.png',
								size: {
									width: 20,
									height: 20,
								},
								options: {
									offset: {
										y: 10,
										x: 0,
									},
								},
							}}
							title={myLocationPin.title}
						/>
					)}
				</Map>
			)}

			<div>{geolocationLoading && 'loading...'}</div>
			<div>{geolocationError}</div>
			<div>
				{mapState?.center.lat} : {mapState?.center.lng}
			</div>
			<div className='map-controls'>
				<div className='map-controls__geolocation'>
					<button onClick={centerMapToMyLocation}>내 위치 찾기로 이동</button>
					<button onClick={removeMyLocationPin}>Remove Pin</button>
				</div>
			</div>
		</div>
	);
}
