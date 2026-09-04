export type MapProviderType = 'openstreetmap' | 'mapbox' | 'googlemaps';

export type MapTileTheme = 'standard' | 'light' | 'dark' | 'satellite';

export interface MapTileConfig {
  id: MapTileTheme;
  name: string;
  url: string;
  attribution: string;
  maxZoom: number;
}

export const mapTileProviders: Record<MapTileTheme, MapTileConfig> = {
  standard: {
    id: 'standard',
    name: 'OpenStreetMap (Default)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  },
  light: {
    id: 'light',
    name: 'CartoDB Positron (Light)',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
    maxZoom: 20
  },
  dark: {
    id: 'dark',
    name: 'CartoDB Dark Matter (Dark)',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
    maxZoom: 20
  },
  satellite: {
    id: 'satellite',
    name: 'ESRI World Imagery (Satellite)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18
  }
};

// Calculate distance in meters between two coordinates (Haversine formula)
export function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// User-friendly distance formatter (e.g., '150m away', '1.2 km away')
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters}m away`;
  }
  const km = (meters / 1000).toFixed(1);
  return `${km} km away`;
}

// Privacy-preserving address helper
export function obfuscateAddress(fullAddress: string, isAnonymous: boolean = false): string {
  if (isAnonymous) {
    // Return generalized landmark/locality only
    const parts = fullAddress.split(',');
    if (parts.length > 1) {
      return parts.slice(1).join(',').trim();
    }
  }
  return fullAddress;
}
