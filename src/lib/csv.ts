import { createEmptyPlant, normalizePlant } from "./core";
import type { CropTaskOffset, PlantRecord, PlantType, SunPreference, WaterNeed } from "./types";

export const plantCsvHeaders = [
  "plantName",
  "variety",
  "type",
  "sun",
  "water",
  "spacing",
  "sowTransplantNotes",
  "priceDonation",
  "careUrl",
  "daysToMaturity",
  "quantity",
  "taskOffsets"
] as const;

function escapeCsvCell(value: unknown): string {
  const raw = value == null ? "" : String(value);
  if (/[",\n\r]/.test(raw)) {
    return `"${raw.split('"').join('""')}"`;
  }
  return raw;
}

export function parseCsvRows(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      if (row.some((value) => value.length > 0)) {
        rows.push(row);
      }
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some((value) => value.length > 0)) {
    rows.push(row);
  }

  if (inQuotes) {
    throw new Error("CSV has an unclosed quoted cell.");
  }

  return rows;
}

function parseTaskOffsets(value: string): CropTaskOffset[] {
  if (!value.trim()) {
    return [];
  }
  const parsed = JSON.parse(value) as CropTaskOffset[];
  if (!Array.isArray(parsed)) {
    return [];
  }
  return parsed
    .filter((task) => task && typeof task.label === "string")
    .map((task, index) => ({
      id: String(task.id || `task-${index + 1}`),
      label: String(task.label),
      daysFromLastFrost: Number(task.daysFromLastFrost || 0),
      phase: task.phase || "care"
    }));
}

export function plantsToCsv(plants: PlantRecord[]): string {
  const rows = [
    plantCsvHeaders,
    ...plants.map((plant) =>
      plantCsvHeaders.map((header) =>
        header === "taskOffsets" ? JSON.stringify(plant.taskOffsets) : plant[header]
      )
    )
  ];
  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
}

export function plantsFromCsv(csv: string): PlantRecord[] {
  const rows = parseCsvRows(csv);
  if (rows.length === 0) {
    return [];
  }
  const [headers, ...dataRows] = rows;
  const normalizedHeaders = headers.map((header) => header.trim());

  return dataRows.map((row, index) => {
    const base = createEmptyPlant();
    const record = { ...base, id: `imported-${Date.now()}-${index}` };
    normalizedHeaders.forEach((header, columnIndex) => {
      const value = row[columnIndex] ?? "";
      switch (header) {
        case "plantName":
        case "variety":
        case "spacing":
        case "sowTransplantNotes":
        case "priceDonation":
        case "careUrl":
        case "daysToMaturity":
          record[header] = value;
          break;
        case "type":
          record.type = (value || "other") as PlantType;
          break;
        case "sun":
          record.sun = (value || "full sun") as SunPreference;
          break;
        case "water":
          record.water = (value || "moderate") as WaterNeed;
          break;
        case "quantity":
          record.quantity = Number(value || 1);
          break;
        case "taskOffsets":
          record.taskOffsets = parseTaskOffsets(value);
          break;
        default:
          break;
      }
    });
    return normalizePlant(record);
  });
}
