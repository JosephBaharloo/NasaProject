/**
 * Geocoding Service - Convert addresses to coordinates and vice versa
 * Uses OpenStreetMap Nominatim API (Free, no API key required)
 */

class GeocodingService {
    static BASE_URL = 'https://nominatim.openstreetmap.org';

    /**
     * Search for a location by query string
     * @param {string} query - Search query (e.g., "Central Park, New York")
     * @returns {Promise<Array>} Array of location results
     */
    static async searchLocation(query) {
        if (!query || query.trim() === '') {
            throw new Error('Search query cannot be empty');
        }

        try {
            const response = await fetch(
                `${this.BASE_URL}/search?` + new URLSearchParams({
                    q: query,
                    format: 'json',
                    limit: '5',
                    addressdetails: '1'
                }),
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }

            const data = await response.json();
            
            return data.map(item => ({
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
                displayName: item.display_name,
                name: item.name,
                address: this.formatAddress(item.address),
                type: item.type,
                importance: item.importance
            }));
        } catch (error) {
            console.error('Geocoding error:', error);
            throw error;
        }
    }

    /**
     * Reverse geocoding - Get address from coordinates
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     * @returns {Promise<Object>} Location information
     */
    static async reverseGeocode(lat, lng) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/reverse?` + new URLSearchParams({
                    lat: lat.toString(),
                    lon: lng.toString(),
                    format: 'json',
                    addressdetails: '1'
                }),
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch address data');
            }

            const data = await response.json();
            
            return {
                lat: parseFloat(data.lat),
                lng: parseFloat(data.lon),
                displayName: data.display_name,
                address: this.formatAddress(data.address),
                name: data.name || data.address.city || data.address.town || 'Unknown location'
            };
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            throw error;
        }
    }

    /**
     * Format address object into readable string
     * @param {Object} address - Address object from Nominatim
     * @returns {string} Formatted address
     */
    static formatAddress(address) {
        if (!address) return 'Unknown location';

        const parts = [];
        
        if (address.road) parts.push(address.road);
        if (address.city) parts.push(address.city);
        else if (address.town) parts.push(address.town);
        else if (address.village) parts.push(address.village);
        
        if (address.state) parts.push(address.state);
        if (address.country) parts.push(address.country);

        return parts.join(', ') || address.display_name || 'Unknown location';
    }

    /**
     * Get user's current location using browser's geolocation API
     * @returns {Promise<Object>} Current location coordinates
     */
    static async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    try {
                        const locationData = await this.reverseGeocode(lat, lng);
                        resolve(locationData);
                    } catch (error) {
                        // If reverse geocoding fails, still return coordinates
                        resolve({
                            lat,
                            lng,
                            displayName: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
                            address: 'Current location',
                            name: 'Current location'
                        });
                    }
                },
                (error) => {
                    reject(new Error('Unable to retrieve your location: ' + error.message));
                }
            );
        });
    }
}

export default GeocodingService;
