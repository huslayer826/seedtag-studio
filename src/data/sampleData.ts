import { starterCrops } from "./starterCrops";
import { createPlantFromStarter } from "../lib/core";
import type { EventProfile, PlantRecord } from "../lib/types";

export const sampleEvent: EventProfile = {
  eventName: "Spring Seed & Plant Share",
  hostName: "Neighborhood Garden Club",
  location: "Maple Street Community Room",
  lastFrostDate: "2026-04-15",
  firstFrostDate: "2026-10-20",
  saleDate: "2026-05-10",
  pickupWindow: "9:00 AM - 1:00 PM",
  contactUrl: "gardenclub.example/seeds",
  notes: "Bring clean packets, labeled starts, and extra trays for transport."
};

export const samplePlants: PlantRecord[] = starterCrops
  .slice(0, 8)
  .map((crop, index) => createPlantFromStarter(crop, index + 1));

