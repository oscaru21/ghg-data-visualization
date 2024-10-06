import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import {
  STAC_API_URL,
  COLLECTION_NAME,
  RASTER_API_URL,
  ASSET_NAME,
} from "./constants";
import USStateData from "./assets/us-states.json";
import { GeoJSON, Feature } from "./models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to generate statistics
async function generateStats(item: any, geojson: any): Promise<any> {
  try {
    const result = await axios.post(
      `${RASTER_API_URL}/cog/statistics`,
      geojson,
      {
        params: { url: item.assets[ASSET_NAME].href },
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

function findFeatureById(
  features: Feature[],
  idValue: string,
): Feature | undefined {
  return features.find((feature) => feature.id === idValue);
}

// Main function to process the data
export async function processData(stateId: string) {
  const data: GeoJSON = USStateData;
  const features: Feature[] = data.features;
  const state = findFeatureById(features, stateId);
  if (!state) {
    console.error(`State not found: ${stateId}`);
    return;
  }
  try {
    const itemsResponse = await axios.get(
      `${STAC_API_URL}/collections/${COLLECTION_NAME}/items?limit=600`,
    );
    const years = itemsResponse.data.features;

    const stateName = state.properties.name;
    const stateBBoxCoords = state.geometry.coordinates;
    const stateGeometryType = state.geometry.type;

    const areaOfInterest = {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: stateBBoxCoords,
        type: stateGeometryType,
      },
    };

    const statistics: any[] = [];
    for (const year of years) {
      const statisticPerYear = await generateStats(year, areaOfInterest);
      if (statisticPerYear === null) {
        break;
      }
      statistics.push(statisticPerYear);
    }

    if (statistics.length === 0) {
      console.log(`No data found for ${stateName}`);
      return null;
    }

    // Clean the stats data
    const cleanedStatistics = cleanStats(statistics);
    return cleanedStatistics;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
