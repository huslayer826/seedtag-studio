export const plantTypes = [
  "vegetable",
  "herb",
  "flower",
  "native",
  "houseplant",
  "other"
] as const;

export const sunOptions = ["full sun", "part sun", "part shade", "shade"] as const;
export const waterOptions = ["low", "moderate", "consistent", "high"] as const;

export type PlantType = (typeof plantTypes)[number];
export type SunPreference = (typeof sunOptions)[number];
export type WaterNeed = (typeof waterOptions)[number];
export type TaskPhase = "start" | "direct-sow" | "transplant" | "care" | "sale";
export type PrintTemplate = "plant-tags" | "seed-packets" | "care-cards" | "sale-sign";

export interface CropTaskOffset {
  id: string;
  label: string;
  daysFromLastFrost: number;
  phase: TaskPhase;
}

export interface PlantRecord {
  id: string;
  plantName: string;
  variety: string;
  type: PlantType;
  sun: SunPreference;
  water: WaterNeed;
  spacing: string;
  sowTransplantNotes: string;
  priceDonation: string;
  careUrl: string;
  daysToMaturity: string;
  quantity: number;
  taskOffsets: CropTaskOffset[];
}

export interface StarterCrop extends Omit<PlantRecord, "id" | "quantity"> {
  starterId: string;
  summary: string;
}

export interface EventProfile {
  eventName: string;
  hostName: string;
  location: string;
  lastFrostDate: string;
  firstFrostDate: string;
  saleDate: string;
  pickupWindow: string;
  contactUrl: string;
  notes: string;
}

export interface CalendarTask {
  id: string;
  recordId: string;
  plantName: string;
  variety: string;
  label: string;
  date: string;
  phase: TaskPhase;
  offsetDays: number;
}

export interface AppState {
  version: 1;
  event: EventProfile;
  plants: PlantRecord[];
  selectedPlantId: string | null;
  selectedTemplate: PrintTemplate;
}

