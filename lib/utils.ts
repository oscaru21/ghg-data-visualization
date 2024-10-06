import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { STAC_API_URL, collectionName, RASTER_API_URL } from "./constants";
import USStateData from "./assets/us-states.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const assetName = "total-co2";

// Function to generate statistics
async function generateStats(item: any, geojson: any): Promise<any> {
  try {
    const result = await axios.post(
      `${RASTER_API_URL}/cog/statistics`,
      geojson,
      {
        params: { url: item.assets[assetName].href },
      },
    );

    if (result.status > 400) {
      console.error(`Error: ${result.status}`);
      return null;
    }

    const data = result.data;

    return {
      ...data.properties,
      datetime: item.properties.start_datetime.slice(0, 10),
    };
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}

// Function to clean statistics
function cleanStats(statsJson: any[]): any[] {
  return statsJson.map((stat) => {
    const cleanedStat: any = {};
    for (const key in stat) {
      if (key.startsWith("statistics.b1.")) {
        cleanedStat[key.replace("statistics.b1.", "")] = stat[key];
      } else {
        cleanedStat[key] = stat[key];
      }
    }
    if (cleanedStat.datetime) {
      cleanedStat.date = new Date(cleanedStat.datetime);
    }
    return cleanedStat;
  });
}

// Main function to process the data
async function processData(stateId: string, assetName = "total_co2") {
  const data: GeoJSON = USStateData;
  const features: Feature[] = data.features;
  console.log(features);
  const state = findFeatureById(features, stateId);
  if (!state) {
    console.error(`State not found: ${stateId}`);
    return;
  }
  try {
    const itemsResponse = await axios.get(
      `${STAC_API_URL}/collections/${collectionName}/items?limit=600`,
    );
    const items = itemsResponse.data.features;

    const firstResultName = state.properties.name;
    const firstResultCoords = state.geometry.coordinates;
    const firstResultGeometryType = state.geometry.type;

    const aoi = {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: firstResultCoords,
        type: firstResultGeometryType,
      },
    };

    const stats: any[] = [];
    for (const item of items) {
      const res = await generateStats(item, aoi);
      if (res === null) {
        break;
      }
      stats.push(res);
    }

    if (stats.length === 0) {
      console.log(`No data found for ${firstResultName}`);
      return null;
    }

    // Clean the stats data
    const cleanedStats = cleanStats(stats);
    return cleanedStats;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

function findFeatureById(
  features: Feature[],
  idValue: string,
): Feature | undefined {
  return features.find((feature) => feature.id === idValue);
}

interface FeatureProperties {
  id: string;
  [key: string]: any;
}

interface Feature {
  type: string;
  id: string;
  properties: FeatureProperties;
  geometry: {
    type: string;
    coordinates: any[];
  };
}

interface GeoJSON {
  type: string;
  features: Feature[];
}
