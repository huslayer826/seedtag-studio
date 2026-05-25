import { describe, expect, it } from "vitest";
import { createPlantFromStarter, getCareUrlDisplay, getPlantTitle, summarizeBatch } from "../lib/core";
import { starterCrops } from "../data/starterCrops";

describe("core plant helpers", () => {
  it("creates independent plant records from starter crops", () => {
    const starter = starterCrops[0];
    const plant = createPlantFromStarter(starter, 1);

    plant.taskOffsets[0].label = "Changed";

    expect(plant.id).toBe("plant-tomato-cherry-01");
    expect(starter.taskOffsets[0].label).toBe("Start tomato seeds indoors");
  });

  it("summarizes batch counts and printable quantities", () => {
    const plants = [createPlantFromStarter(starterCrops[0], 1), createPlantFromStarter(starterCrops[1], 2)];
    plants[0].quantity = 4;
    plants[1].quantity = 6;

    expect(summarizeBatch(plants)).toEqual({
      plantCount: 2,
      labelCount: 10,
      typeCounts: { vegetable: 2 }
    });
  });

  it("formats titles and care URL display text", () => {
    const plant = createPlantFromStarter(starterCrops[2], 3);

    expect(getPlantTitle(plant)).toBe("Basil - Genovese");
    expect(getCareUrlDisplay("https://garden.example/care/basil")).toBe("garden.example/care/basil");
    expect(getCareUrlDisplay("")).toBe("Add care link");
  });
});

