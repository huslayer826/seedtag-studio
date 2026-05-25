import { starterCrops } from "../data/starterCrops";
import type { AppState, EventProfile, PlantRecord, PrintTemplate, StarterCrop } from "./types";

export const appVersion = 1 as const;

export function makeId(prefix = "plant"): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createEmptyPlant(): PlantRecord {
  return {
    id: makeId(),
    plantName: "",
    variety: "",
    type: "vegetable",
    sun: "full sun",
    water: "moderate",
    spacing: "",
    sowTransplantNotes: "",
    priceDonation: "",
    careUrl: "",
    daysToMaturity: "",
    quantity: 12,
    taskOffsets: [
      {
        id: makeId("task"),
        label: "Plan seed or plant prep",
        daysFromLastFrost: 0,
        phase: "care"
      }
    ]
  };
}

export function createPlantFromStarter(starter: StarterCrop, sequence?: number): PlantRecord {
  const suffix = sequence ? sequence.toString().padStart(2, "0") : makeId("starter");
  return {
    ...starter,
    id: `plant-${starter.starterId}-${suffix}`,
    quantity: 12,
    taskOffsets: starter.taskOffsets.map((task) => ({ ...task }))
  };
}

export function createInitialState(event: EventProfile, plants: PlantRecord[]): AppState {
  return {
    version: appVersion,
    event,
    plants,
    selectedPlantId: plants[0]?.id ?? null,
    selectedTemplate: "plant-tags"
  };
}

export function getSelectedPlant(plants: PlantRecord[], selectedPlantId: string | null): PlantRecord | null {
  return plants.find((plant) => plant.id === selectedPlantId) ?? plants[0] ?? null;
}

export function upsertPlant(plants: PlantRecord[], nextPlant: PlantRecord): PlantRecord[] {
  const index = plants.findIndex((plant) => plant.id === nextPlant.id);
  if (index === -1) {
    return [...plants, nextPlant];
  }
  return plants.map((plant) => (plant.id === nextPlant.id ? nextPlant : plant));
}

export function duplicatePlant(plant: PlantRecord): PlantRecord {
  return {
    ...plant,
    id: makeId("plant"),
    plantName: plant.plantName,
    variety: plant.variety ? `${plant.variety} copy` : "Copy",
    taskOffsets: plant.taskOffsets.map((task) => ({ ...task, id: makeId("task") }))
  };
}

export function removePlant(plants: PlantRecord[], plantId: string): PlantRecord[] {
  return plants.filter((plant) => plant.id !== plantId);
}

export function getPlantTitle(plant: PlantRecord): string {
  return [plant.plantName, plant.variety].filter(Boolean).join(" - ") || "Untitled plant";
}

export function normalizePlant(plant: PlantRecord): PlantRecord {
  return {
    ...plant,
    plantName: plant.plantName.trim(),
    variety: plant.variety.trim(),
    spacing: plant.spacing.trim(),
    sowTransplantNotes: plant.sowTransplantNotes.trim(),
    priceDonation: plant.priceDonation.trim(),
    careUrl: plant.careUrl.trim(),
    daysToMaturity: plant.daysToMaturity.trim(),
    quantity: Number.isFinite(plant.quantity) ? Math.max(1, Math.round(plant.quantity)) : 1,
    taskOffsets: plant.taskOffsets.map((task) => ({
      ...task,
      label: task.label.trim() || "Garden task",
      daysFromLastFrost: Number.isFinite(task.daysFromLastFrost) ? Math.round(task.daysFromLastFrost) : 0
    }))
  };
}

export function summarizeBatch(plants: PlantRecord[]): {
  plantCount: number;
  labelCount: number;
  typeCounts: Record<string, number>;
} {
  return plants.reduce(
    (summary, plant) => {
      summary.plantCount += 1;
      summary.labelCount += Math.max(1, plant.quantity);
      summary.typeCounts[plant.type] = (summary.typeCounts[plant.type] ?? 0) + 1;
      return summary;
    },
    { plantCount: 0, labelCount: 0, typeCounts: {} as Record<string, number> }
  );
}

export function getCareUrlDisplay(url: string): string {
  const cleaned = url.trim();
  if (!cleaned) {
    return "Add care link";
  }
  return cleaned.replace(/^https?:\/\//, "");
}

export function getTemplateLabel(template: PrintTemplate): string {
  const labels: Record<PrintTemplate, string> = {
    "plant-tags": "Plant tag grid",
    "seed-packets": "Seed packet label sheet",
    "care-cards": "Care card",
    "sale-sign": "Sale table sign"
  };
  return labels[template];
}

export function findStarterById(starterId: string): StarterCrop | undefined {
  return starterCrops.find((crop) => crop.starterId === starterId);
}

