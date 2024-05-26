'use client';

import useKakaoMapLoader from '@/hooks/useKakaoMapLoader';
import { KakaoMapProps } from '@/types/KakaoMap';
import { getGeolocation } from '@/utilities/getGeolocation';
import { useState } from 'react';
import { Map, MapMarker, MapTypeControl, MarkerClusterer, ZoomControl } from 'react-kakao-maps-sdk';
import KakaoMapMarker from './KakaoMapMarker';
import { MdMyLocation } from 'react-icons/md';
import { ImSpinner } from 'react-icons/im';
import { MdLocationDisabled } from 'react-icons/md';

export default function KakaoMap({ data }: KakaoMapProps) {
	useKakaoMapLoader();
	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [myLocation, setMyLocation] = useState({ show: false, position: { lat: 0, lng: 0 } });
	const [loading, setLoading] = useState(false);
	const [openMarkerID, setOpenMarkerID] = useState<number | null>(null);

	const updateMyLocation = async () => {
		setLoading(true);
		const [position, error] = await getGeolocation();
		if (error) {
			alert(error);
			setLoading(false);
			return;
		}
		if (position) {
			const newPosition = { lat: position.latitude, lng: position.longitude };
			setMyLocation((prev) => ({ ...prev, show: true, position: newPosition }));
			map?.setLevel(1);
			map?.panTo(new kakao.maps.LatLng(newPosition.lat, newPosition.lng));
			setLoading(false);
		}
	};

	const hideMyLocation = () => {
		setMyLocation((prev) => ({ ...prev, show: false }));
	};

	const onMarkerClick = (id: number | null) => {
		setOpenMarkerID(id);
	};

	return (
		<div className='map-container'>
			<div className='map-button_container'>
				{map && (
					<>
						<button className='map-button_container-update_my_location_button' onClick={updateMyLocation}>
							{loading ? (
								<ImSpinner className='map-button_container-update_my_location_button-spinner_icon' />
							) : (
								<MdMyLocation />
							)}
						</button>
						{myLocation.show && (
							<button className='map-button_container-delete_my_location_button' onClick={hideMyLocation}>
								<MdLocationDisabled />
							</button>
						)}
					</>
				)}
			</div>
			<Map
				id='map'
				className='map'
				center={{ lat: 37.5519, lng: 126.9918 }}
				level={8}
				style={{
					width: '100%',
					height: '80vh',
				}}
				onCreate={(map: kakao.maps.Map) => setMap(map)}>
				<MapTypeControl position={'TOPRIGHT'} />
				<ZoomControl position={'RIGHT'} />
				{map && (
					<MarkerClusterer
						averageCenter={true}
						minLevel={3}
						minClusterSize={5}
						disableClickZoom={false}
						clickable={true}>
						{data &&
							data.length > 0 &&
							data.map((bin) => (
								<KakaoMapMarker
									key={`${bin.id}-${bin.latitude}-${bin.longitude}`}
									position={{
										lat: bin.latitude,
										lng: bin.longitude,
									}}
									content={bin.land_address || bin.road_address}
									markerID={bin.id}
									isOpen={openMarkerID === bin.id}
									onMarkerClick={onMarkerClick}></KakaoMapMarker>
							))}
					</MarkerClusterer>
				)}
				{myLocation.show && (
					<MapMarker
						position={myLocation.position}
						image={{
							src: '/icons/my-location-pin.png',
							size: { width: 16, height: 16 },
							options: { offset: { x: 8, y: 8 } },
						}}
						title='현재 위치'></MapMarker>
				)}
			</Map>
		</div>
	);
}
