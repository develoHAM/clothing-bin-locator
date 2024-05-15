const onSuccess = (position: GeolocationPosition) => {
	const { latitude, longitude } = position.coords;
	return { position: { lat: latitude, lng: longitude }, error: null };
};

const onError = (error: GeolocationPositionError) => {
	return { position: null, error: error.message };
};

export function getGeolocation(options?: { timeout?: number; maximumAge?: number; enableHighAccuracy?: boolean }) {
	if (!navigator.geolocation) {
		return { position: null, error: 'please enable GPS' };
	}
	const { geolocation } = navigator;

	geolocation.getCurrentPosition(onSuccess, onError, options);
}
