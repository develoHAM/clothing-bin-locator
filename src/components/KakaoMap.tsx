'use client';

import { KakaoMapProps, Position } from '@/types/KakaoMap';
import { getGeolocation } from '@/utilities/getGeolocation';
import { useState } from 'react';
import { Map, MapMarker, MapTypeControl, MarkerClusterer, ZoomControl } from 'react-kakao-maps-sdk';
import CustomOverlay from './CustomOverlay';
import { MdMyLocation } from 'react-icons/md';
import { ImSpinner } from 'react-icons/im';
import { MdLocationDisabled } from 'react-icons/md';
import { BinModel } from '@/types/Models';

export default function KakaoMap({ data }: KakaoMapProps) {
	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [myLocation, setMyLocation] = useState({ show: false, position: { lat: 0, lng: 0 } });
	const [loading, setLoading] = useState(false);
	const [openMarker, setOpenMarker] = useState<{ position: Position; content: string } | null>(null);

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

	const onMarkerClick = (marker: kakao.maps.Marker, bin: BinModel) => {
		map?.panTo(marker.getPosition());

		setOpenMarker((prev) => ({
			...prev,
			position: { lat: bin.latitude, lng: bin.longitude },
			content: bin.land_address || bin.road_address,
		}));
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
				minLevel={10}
				style={{
					width: '100%',
					height: '80vh',
				}}
				onCreate={(map: kakao.maps.Map) => setMap(map)}>
				<MapTypeControl position={'TOPRIGHT'} />
				<ZoomControl position={'RIGHT'} />
				{map && (
					<MarkerClusterer averageCenter={true} minLevel={3} disableClickZoom={false} gridSize={100}>
						{data &&
							data.length > 0 &&
							data.map((bin) => (
								<MapMarker
									key={`${bin.id}-${bin.latitude}-${bin.longitude}`}
									position={{
										lat: bin.latitude,
										lng: bin.longitude,
									}}
									onClick={(marker: kakao.maps.Marker) => {
										onMarkerClick(marker, bin);
									}}></MapMarker>
							))}
					</MarkerClusterer>
				)}

				{openMarker && (
					<CustomOverlay
						position={openMarker.position}
						content={openMarker.content}
						setOpenMarker={setOpenMarker}></CustomOverlay>
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
