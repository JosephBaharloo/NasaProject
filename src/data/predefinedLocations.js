/**
 * Predefined Locations - 24 Major US Cities
 * This module provides a curated list of major US cities for location selection
 */

export const PREDEFINED_LOCATIONS = [
    // West Coast
    { city: 'Los Angeles', state: 'California', region: 'West', lat: 34.0522, lng: -118.2437, timezone: 'America/Los_Angeles' },
    { city: 'San Francisco', state: 'California', region: 'West', lat: 37.7749, lng: -122.4194, timezone: 'America/Los_Angeles' },
    { city: 'San Diego', state: 'California', region: 'West', lat: 32.7157, lng: -117.1611, timezone: 'America/Los_Angeles' },
    { city: 'Seattle', state: 'Washington', region: 'West', lat: 47.6062, lng: -122.3321, timezone: 'America/Los_Angeles' },
    { city: 'Portland', state: 'Oregon', region: 'West', lat: 45.5152, lng: -122.6784, timezone: 'America/Los_Angeles' },
    { city: 'Las Vegas', state: 'Nevada', region: 'West', lat: 36.1699, lng: -115.1398, timezone: 'America/Los_Angeles' },
    
    // Mountain
    { city: 'Denver', state: 'Colorado', region: 'Mountain', lat: 39.7392, lng: -104.9903, timezone: 'America/Denver' },
    { city: 'Phoenix', state: 'Arizona', region: 'Mountain', lat: 33.4484, lng: -112.0740, timezone: 'America/Phoenix' },
    { city: 'Salt Lake City', state: 'Utah', region: 'Mountain', lat: 40.7608, lng: -111.8910, timezone: 'America/Denver' },
    
    // Midwest
    { city: 'Chicago', state: 'Illinois', region: 'Midwest', lat: 41.8781, lng: -87.6298, timezone: 'America/Chicago' },
    { city: 'Detroit', state: 'Michigan', region: 'Midwest', lat: 42.3314, lng: -83.0458, timezone: 'America/Detroit' },
    { city: 'Minneapolis', state: 'Minnesota', region: 'Midwest', lat: 44.9778, lng: -93.2650, timezone: 'America/Chicago' },
    { city: 'Kansas City', state: 'Missouri', region: 'Midwest', lat: 39.0997, lng: -94.5786, timezone: 'America/Chicago' },
    
    // South
    { city: 'Houston', state: 'Texas', region: 'South', lat: 29.7604, lng: -95.3698, timezone: 'America/Chicago' },
    { city: 'Dallas', state: 'Texas', region: 'South', lat: 32.7767, lng: -96.7970, timezone: 'America/Chicago' },
    { city: 'Austin', state: 'Texas', region: 'South', lat: 30.2672, lng: -97.7431, timezone: 'America/Chicago' },
    { city: 'Atlanta', state: 'Georgia', region: 'South', lat: 33.7490, lng: -84.3880, timezone: 'America/New_York' },
    { city: 'Miami', state: 'Florida', region: 'South', lat: 25.7617, lng: -80.1918, timezone: 'America/New_York' },
    { city: 'New Orleans', state: 'Louisiana', region: 'South', lat: 29.9511, lng: -90.0715, timezone: 'America/Chicago' },
    
    // Northeast
    { city: 'New York', state: 'New York', region: 'Northeast', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
    { city: 'Boston', state: 'Massachusetts', region: 'Northeast', lat: 42.3601, lng: -71.0589, timezone: 'America/New_York' },
    { city: 'Philadelphia', state: 'Pennsylvania', region: 'Northeast', lat: 39.9526, lng: -75.1652, timezone: 'America/New_York' },
    { city: 'Washington DC', state: 'District of Columbia', region: 'Northeast', lat: 38.9072, lng: -77.0369, timezone: 'America/New_York' },
    { city: 'Baltimore', state: 'Maryland', region: 'Northeast', lat: 39.2904, lng: -76.6122, timezone: 'America/New_York' },
];

/**
 * Haversine formula to calculate distance between two coordinates
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lng1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lng2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Find the nearest predefined location to given coordinates
 * @param {number} lat - Target latitude
 * @param {number} lng - Target longitude
 * @returns {object} Nearest predefined location
 */
export function findNearestLocation(lat, lng) {
    let nearest = PREDEFINED_LOCATIONS[0];
    let minDistance = haversineDistance(lat, lng, nearest.lat, nearest.lng);

    for (const location of PREDEFINED_LOCATIONS) {
        const distance = haversineDistance(lat, lng, location.lat, location.lng);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = location;
        }
    }

    return nearest;
}

/**
 * Search locations by city or state name
 * @param {string} query - Search query
 * @returns {array} Matching locations
 */
export function searchLocations(query) {
    if (!query || query.trim() === '') {
        return PREDEFINED_LOCATIONS;
    }

    const searchTerm = query.toLowerCase().trim();
    return PREDEFINED_LOCATIONS.filter(location => 
        location.city.toLowerCase().includes(searchTerm) ||
        location.state.toLowerCase().includes(searchTerm) ||
        location.region.toLowerCase().includes(searchTerm)
    );
}

/**
 * Get locations grouped by region
 * @returns {object} Locations grouped by region
 */
export function getLocationsByRegion() {
    const grouped = {};
    for (const location of PREDEFINED_LOCATIONS) {
        if (!grouped[location.region]) {
            grouped[location.region] = [];
        }
        grouped[location.region].push(location);
    }
    return grouped;
}

/**
 * Get a specific location by city name
 * @param {string} cityName - City name to find
 * @returns {object|null} Location object or null if not found
 */
export function getLocationByCity(cityName) {
    return PREDEFINED_LOCATIONS.find(
        location => location.city.toLowerCase() === cityName.toLowerCase()
    ) || null;
}
