import { CalendarClock, Download, Leaf } from "lucide-react";
import { formatReadableDate } from "../lib/date";
import type { CalendarTask, EventProfile } from "../lib/types";

interface CalendarPanelProps {
  event: EventProfile;
  tasks: CalendarTask[];
  onDownloadIcs: () => void;
}

const phaseLabels: Record<CalendarTask["phase"], string> = {
  start: "Start",
  "direct-sow": "Direct sow",
  transplant: "Transplant",
  care: "Care",
  sale: "Sale"
};

export function CalendarPanel({ event, tasks, onDownloadIcs }: CalendarPanelProps) {
  const hasFrostDate = Boolean(event.lastFrostDate);

  return (
    <section className="panel calendar-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Frost-date kit</p>
          <h2>Mini calendar</h2>
        </div>
        <button className="icon-button" type="button" onClick={onDownloadIcs} disabled={tasks.length === 0}>
          <Download size={17} />
          <span>ICS</span>
        </button>
      </div>

      {!hasFrostDate && (
        <div className="empty-state compact">
          <CalendarClock size={28} />
          <p>Add a last frost date to calculate crop tasks.</p>
        </div>
      )}

      {hasFrostDate && tasks.length === 0 && (
        <div className="empty-state compact">
          <Leaf size={28} />
          <p>Add crops with offsets to build a volunteer task list.</p>
        </div>
      )}

      {tasks.length > 0 && (
        <ol className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <time dateTime={task.date}>{formatReadableDate(task.date)}</time>
              <div>
                <span>{phaseLabels[task.phase]}</span>
                <strong>{task.label}</strong>
                <p>
                  {[task.plantName, task.variety].filter(Boolean).join(" - ")}
                  {task.offsetDays !== 0 ? ` (${task.offsetDays > 0 ? "+" : ""}${task.offsetDays} days)` : ""}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

