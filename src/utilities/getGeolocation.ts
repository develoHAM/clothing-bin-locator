export function getGeolocation(options?: {
	timeout?: number;
	maximumAge?: number;
	enableHighAccuracy?: boolean;
}): Promise<[{ latitude: number; longitude: number }, null] | [null, string]> {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			resolve([null, 'please enable GPS']);
		}
		const { geolocation } = navigator;

		const onSuccess = (position: GeolocationPosition) => {
			const { latitude, longitude } = position.coords;
			resolve([{ latitude, longitude }, null]);
		};

		const onError = (error: GeolocationPositionError) => {
			resolve([null, error.message]);
		};

		geolocation.getCurrentPosition(onSuccess, onError, options);
	});
}
