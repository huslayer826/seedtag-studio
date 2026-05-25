import { describe, expect, it } from "vitest";
import { buildCalendarTasks, buildIcs } from "../lib/calendar";
import type { EventProfile, PlantRecord } from "../lib/types";

const event: EventProfile = {
  eventName: "Test Sale",
  hostName: "Garden Club",
  location: "Library",
  lastFrostDate: "2026-04-15",
  firstFrostDate: "2026-10-20",
  saleDate: "2026-05-10",
  pickupWindow: "9-12",
  contactUrl: "example.test",
  notes: ""
};

const tomato: PlantRecord = {
  id: "plant-1",
  plantName: "Tomato",
  variety: "Cherry",
  type: "vegetable",
  sun: "full sun",
  water: "consistent",
  spacing: "24 in",
  sowTransplantNotes: "Start early",
  priceDonation: "$4",
  careUrl: "/care/tomato",
  daysToMaturity: "70",
  quantity: 2,
  taskOffsets: [
    { id: "start", label: "Start indoors", daysFromLastFrost: -42, phase: "start" },
    { id: "transplant", label: "Transplant", daysFromLastFrost: 14, phase: "transplant" }
  ]
};

describe("calendar helpers", () => {
  it("builds sorted tasks from last frost offsets and sale date", () => {
    const tasks = buildCalendarTasks([tomato], event);

    expect(tasks.map((task) => [task.label, task.date])).toEqual([
      ["Start indoors", "2026-03-04"],
      ["Transplant", "2026-04-29"],
      ["Print labels, care cards, and table signs", "2026-05-03"],
      ["Run seed swap or plant sale table", "2026-05-10"]
    ]);
  });

  it("returns no crop tasks when the frost date is invalid", () => {
    expect(buildCalendarTasks([tomato], { ...event, lastFrostDate: "April" })).toEqual([]);
  });

  it("exports all-day ICS events", () => {
    const tasks = buildCalendarTasks([tomato], event);
    const ics = buildIcs(tasks, event, new Date("2026-01-01T12:00:00Z"));

    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("DTSTART;VALUE=DATE:20260304");
    expect(ics).toContain("SUMMARY:Start indoors - Tomato - Cherry");
    expect(ics).toContain("X-WR-CALNAME:Test Sale");
  });
});

