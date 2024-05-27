import { CustomOverlayMap, useMap } from 'react-kakao-maps-sdk';
import { IoCloseSharp } from 'react-icons/io5';
import { CustomOverlayProps } from '@/types/KakaoMap';

export default function CustomOverlay({ position, content, setOpenMarker }: CustomOverlayProps) {
	const map = useMap();

	const copyTextToClipboard = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const target = e.currentTarget;
		if (target.textContent) {
			try {
				await navigator.clipboard.writeText(target.textContent);
				console.log('Text copied to clipboard:', target.textContent);
			} catch (err) {
				console.error('Failed to copy text to clipboard:', err);
			}
		}
	};

	return (
		<CustomOverlayMap
			position={position}
			zIndex={1}
			yAnchor={1.4}
			clickable={true}
			onCreate={(overlay: kakao.maps.CustomOverlay) => overlay.setMap(map)}>
			<div className='overlay'>
				<IoCloseSharp className='overlay_close-button' onClick={() => setOpenMarker(null)} />
				<div className='overlay_content' onClick={copyTextToClipboard}>
					{content}
				</div>
				<div className='overlay_link'>
					<a href={`https://map.kakao.com/link/search/${content}`} target='_blank'>
						kakao map 바로가기
					</a>
				</div>
			</div>
		</CustomOverlayMap>
	);
}
