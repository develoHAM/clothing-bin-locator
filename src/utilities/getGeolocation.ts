export function getGeolocation(
	onSuccessCallback: (position: GeolocationPosition) => void,
	onErrorCallback: (error: GeolocationPositionError) => void,
	options?: { timeout?: number; maximumAge?: number; enableHighAccuracy?: boolean }
) {
	if (!navigator.geolocation) {
		throw new Error('GPS is not enabled');
	}
	const { geolocation } = navigator;

	geolocation.getCurrentPosition(onSuccessCallback, onErrorCallback, options);
}
