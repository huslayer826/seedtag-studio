import { describe, expect, it } from "vitest";
import { parseCsvRows, plantsFromCsv, plantsToCsv } from "../lib/csv";
import type { PlantRecord } from "../lib/types";

const plant: PlantRecord = {
  id: "plant-1",
  plantName: "Basil",
  variety: "Genovese, classic",
  type: "herb",
  sun: "full sun",
  water: "moderate",
  spacing: "10-12 in",
  sowTransplantNotes: "Start indoors\nPinch tips.",
  priceDonation: "$3 donation",
  careUrl: "/care/basil",
  daysToMaturity: "65 days",
  quantity: 8,
  taskOffsets: [{ id: "start", label: "Start basil", daysFromLastFrost: -35, phase: "start" }]
};

describe("CSV helpers", () => {
  it("parses quoted commas, escaped quotes, and newlines", () => {
    expect(parseCsvRows('name,note\n"Basil, Genovese","Pinch ""tips""\nweekly"')).toEqual([
      ["name", "note"],
      ["Basil, Genovese", 'Pinch "tips"\nweekly']
    ]);
  });

  it("round trips plant records with task offsets", () => {
    const csv = plantsToCsv([plant]);
    const [roundTripped] = plantsFromCsv(csv);

    expect(roundTripped.plantName).toBe("Basil");
    expect(roundTripped.variety).toBe("Genovese, classic");
    expect(roundTripped.sowTransplantNotes).toBe("Start indoors\nPinch tips.");
    expect(roundTripped.quantity).toBe(8);
    expect(roundTripped.taskOffsets).toEqual(plant.taskOffsets);
  });

  it("throws on unclosed quoted cells", () => {
    expect(() => parseCsvRows('name\n"tomato')).toThrow("unclosed");
  });
});

