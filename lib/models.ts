export interface FeatureProperties {
  name: string;
  density: number;
}

export interface Feature {
  type: string;
  id: string;
  properties: FeatureProperties;
  geometry: {
    type: string;
    coordinates: any;
  };
}

export interface GeoJSON {
  type: string;
  features: Feature[];
}
