import { Connection } from 'mysql2/promise';
import { BinModel } from './Models';
import { MapMarkerProps } from 'react-kakao-maps-sdk';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface Position {
	lat: number;
	lng: number;
}

export interface MapState {
	isPanto?: boolean;
	center: Position;
	level: number;
}

export interface MapMarkerState extends MapMarkerProps {
	id?: number;
	position: Position;
	image?: {
		src: string;
		size: {
			width: number;
			height: number;
		};
		options?: {
			alt?: string;
			offset?: {
				x: number;
				y: number;
			};
		};
	};
	/**
	 * click 이벤트 핸들러
	 */
	onClick?: (marker: kakao.maps.Marker) => void;
	/**
	 * mouseover 이벤트 핸들러
	 */
	onMouseOver?: (marker: kakao.maps.Marker) => void;
	/**
	 * mouseout 이벤트 핸들러
	 */
	onMouseOut?: (marker: kakao.maps.Marker) => void;
	/**
	 * dragstart 이벤트 핸들러
	 */
	onDragStart?: (marker: kakao.maps.Marker) => void;
	/**
	 * dragend 이벤트 핸들러
	 */
	onDragEnd?: (marker: kakao.maps.Marker) => void;
	/**
	 * Maker 생성 이벤트 핸들러
	 */
	onCreate?: (maker: kakao.maps.Marker) => void;
	/**
	 * 마커 엘리먼트의 타이틀 속성 값 (툴팁)
	 */
	title?: string;
	/**
	 * 드래그 가능한 마커, 로드뷰에 올릴 경우에는 유효하지 않다.
	 */
	draggable?: boolean;
	/**
	 * 클릭 가능한 마커
	 */
	clickable?: boolean;
	/**
	 * 마커 엘리먼트의 z-index 속성 값
	 */
	zIndex?: number;
	/**
	 * 마커 투명도 (0-1)
	 */
	opacity?: number;
	/**
	 * InfoWindow 옵션
	 */
	infoWindowOptions?: {
		/**
		 * 인포윈도우를 열 때 지도가 자동으로 패닝하지 않을지의 여부 (기본값: false)
		 */
		disableAutoPan?: boolean;
		/**
		 * 삭제 가능한 인포윈도우
		 */
		removable?: boolean;
		/**
		 * 인포윈도우 엘리먼트의 z-index 속성 값
		 */
		zIndex?: number;
	};
}

export interface KakaoMapProps {
	data: BinModel[] | undefined;
}

export interface KakaoMapMarkerProps {
	position: Position;
	content: ReactNode;
	markerID: number;
	onMarkerClick: (marker: kakao.maps.Marker) => void;
}

export interface CustomOverlayProps {
	position: Position;
	content: string;
	setOpenMarker: Dispatch<SetStateAction<{ position: Position; content: string } | null>>;
}
