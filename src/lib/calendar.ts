import { addDays, formatLocalDate, parseLocalDate, toIcsDate } from "./date";
import type { CalendarTask, EventProfile, PlantRecord, TaskPhase } from "./types";

export function buildCalendarTasks(plants: PlantRecord[], event: EventProfile): CalendarTask[] {
  const lastFrost = parseLocalDate(event.lastFrostDate);
  if (!lastFrost) {
    return [];
  }

  const cropTasks = plants.flatMap((plant) =>
    plant.taskOffsets.map((offset) => ({
      id: `${plant.id}-${offset.id}`,
      recordId: plant.id,
      plantName: plant.plantName,
      variety: plant.variety,
      label: offset.label,
      date: formatLocalDate(addDays(lastFrost, offset.daysFromLastFrost)),
      phase: offset.phase,
      offsetDays: offset.daysFromLastFrost
    }))
  );

  const saleDate = parseLocalDate(event.saleDate);
  const saleTasks: CalendarTask[] = saleDate
    ? [
        {
          id: "sale-label-check",
          recordId: "event",
          plantName: event.eventName,
          variety: "",
          label: "Print labels, care cards, and table signs",
          date: formatLocalDate(addDays(saleDate, -7)),
          phase: "sale" satisfies TaskPhase,
          offsetDays: 0
        },
        {
          id: "sale-event",
          recordId: "event",
          plantName: event.eventName,
          variety: "",
          label: "Run seed swap or plant sale table",
          date: event.saleDate,
          phase: "sale" satisfies TaskPhase,
          offsetDays: 0
        }
      ]
    : [];

  return [...cropTasks, ...saleTasks].sort((a, b) => a.date.localeCompare(b.date) || a.label.localeCompare(b.label));
}

function escapeIcsText(value: string): string {
  return value
    .split("\\")
    .join("\\\\")
    .split(";")
    .join("\\;")
    .split(",")
    .join("\\,")
    .split("\n")
    .join("\\n");
}

function nextDay(value: string): string {
  const parsed = parseLocalDate(value);
  return parsed ? toIcsDate(formatLocalDate(addDays(parsed, 1))) : toIcsDate(value);
}

export function buildIcs(tasks: CalendarTask[], event: EventProfile, generatedAt = new Date()): string {
  const stamp = generatedAt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SeedTag Studio//Garden Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcsText(event.eventName || "SeedTag Studio Calendar")}`
  ];

  tasks.forEach((task) => {
    const titleParts = [task.label, task.plantName, task.variety].filter(Boolean);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${escapeIcsText(task.id)}@seedtag-studio`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${toIcsDate(task.date)}`,
      `DTEND;VALUE=DATE:${nextDay(task.date)}`,
      `SUMMARY:${escapeIcsText(titleParts.join(" - "))}`,
      `DESCRIPTION:${escapeIcsText(`Offset from last frost: ${task.offsetDays} days. Phase: ${task.phase}.`)}`,
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}
