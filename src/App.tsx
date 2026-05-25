import { type ChangeEvent, useMemo, useRef, useState } from "react";
import {
  Copy,
  Download,
  FileJson,
  FolderOpen,
  Leaf,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload
} from "lucide-react";
import { CalendarPanel } from "./components/CalendarPanel";
import { PrintTemplates } from "./components/PrintTemplates";
import { sampleEvent, samplePlants } from "./data/sampleData";
import { starterCrops } from "./data/starterCrops";
import { buildCalendarTasks, buildIcs } from "./lib/calendar";
import {
  createEmptyPlant,
  createInitialState,
  createPlantFromStarter,
  duplicatePlant,
  getPlantTitle,
  getSelectedPlant,
  getTemplateLabel,
  makeId,
  removePlant,
  summarizeBatch,
  upsertPlant
} from "./lib/core";
import { plantsFromCsv, plantsToCsv } from "./lib/csv";
import { clearState, loadState, saveState } from "./lib/storage";
import type { AppState, CropTaskOffset, EventProfile, PlantRecord, PrintTemplate, TaskPhase } from "./lib/types";
import { plantTypes, sunOptions, waterOptions } from "./lib/types";

const printTemplates: PrintTemplate[] = ["plant-tags", "seed-packets", "care-cards", "sale-sign"];
const taskPhases: TaskPhase[] = ["start", "direct-sow", "transplant", "care", "sale"];

function downloadText(filename: string, content: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function readJsonState(text: string): AppState {
  const parsed = JSON.parse(text) as AppState;
  if (parsed.version !== 1 || !Array.isArray(parsed.plants) || !parsed.event) {
    throw new Error("This JSON file is not a SeedTag Studio export.");
  }
  return parsed;
}

function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      return loadState() ?? createInitialState(sampleEvent, samplePlants);
    } catch {
      return createInitialState(sampleEvent, samplePlants);
    }
  });
  const [starterSearch, setStarterSearch] = useState("");
  const [notice, setNotice] = useState("Loaded sample seed swap event data.");
  const csvImportRef = useRef<HTMLInputElement>(null);
  const jsonImportRef = useRef<HTMLInputElement>(null);

  const selectedPlant = getSelectedPlant(state.plants, state.selectedPlantId);
  const tasks = useMemo(() => buildCalendarTasks(state.plants, state.event), [state.event, state.plants]);
  const summary = useMemo(() => summarizeBatch(state.plants), [state.plants]);
  const filteredStarters = useMemo(() => {
    const query = starterSearch.trim().toLowerCase();
    if (!query) {
      return starterCrops;
    }
    return starterCrops.filter((crop) =>
      [crop.plantName, crop.variety, crop.type, crop.summary].join(" ").toLowerCase().includes(query)
    );
  }, [starterSearch]);

  function updateEvent<K extends keyof EventProfile>(key: K, value: EventProfile[K]) {
    setState((current) => ({
      ...current,
      event: {
        ...current.event,
        [key]: value
      }
    }));
  }

  function updateSelectedPlant(updater: (plant: PlantRecord) => PlantRecord) {
    if (!selectedPlant) {
      return;
    }
    setState((current) => ({
      ...current,
      plants: upsertPlant(current.plants, updater(selectedPlant))
    }));
  }

  function addCustomPlant() {
    const plant = createEmptyPlant();
    setState((current) => ({
      ...current,
      plants: [...current.plants, plant],
      selectedPlantId: plant.id
    }));
    setNotice("Added a blank plant record.");
  }

  function addStarterPlant(starterId: string) {
    const starter = starterCrops.find((crop) => crop.starterId === starterId);
    if (!starter) {
      return;
    }
    const plant = createPlantFromStarter(starter, state.plants.length + 1);
    setState((current) => ({
      ...current,
      plants: [...current.plants, plant],
      selectedPlantId: plant.id
    }));
    setNotice(`Added ${starter.plantName} from starter data.`);
  }

  function duplicateSelectedPlant() {
    if (!selectedPlant) {
      return;
    }
    const copyPlant = duplicatePlant(selectedPlant);
    setState((current) => ({
      ...current,
      plants: [...current.plants, copyPlant],
      selectedPlantId: copyPlant.id
    }));
    setNotice(`Duplicated ${getPlantTitle(selectedPlant)}.`);
  }

  function deleteSelectedPlant() {
    if (!selectedPlant) {
      return;
    }
    setState((current) => {
      const nextPlants = removePlant(current.plants, selectedPlant.id);
      return {
        ...current,
        plants: nextPlants,
        selectedPlantId: nextPlants[0]?.id ?? null
      };
    });
    setNotice(`Removed ${getPlantTitle(selectedPlant)}.`);
  }

  function updateTask(taskId: string, patch: Partial<CropTaskOffset>) {
    updateSelectedPlant((plant) => ({
      ...plant,
      taskOffsets: plant.taskOffsets.map((task) => (task.id === taskId ? { ...task, ...patch } : task))
    }));
  }

  function addTaskOffset() {
    updateSelectedPlant((plant) => ({
      ...plant,
      taskOffsets: [
        ...plant.taskOffsets,
        {
          id: makeId("task"),
          label: "Custom garden task",
          daysFromLastFrost: 0,
          phase: "care"
        }
      ]
    }));
  }

  function removeTaskOffset(taskId: string) {
    updateSelectedPlant((plant) => ({
      ...plant,
      taskOffsets: plant.taskOffsets.filter((task) => task.id !== taskId)
    }));
  }

  function saveLocal() {
    saveState(state);
    setNotice("Saved this batch to localStorage on this browser.");
  }

  function loadLocal() {
    const saved = loadState();
    if (saved) {
      setState(saved);
      setNotice("Loaded saved local batch.");
      return;
    }
    setNotice("No local save found yet.");
  }

  function resetSamples() {
    clearState();
    setState(createInitialState(sampleEvent, samplePlants));
    setNotice("Restored the sample event and starter labels.");
  }

  function exportJson() {
    downloadText("seedtag-studio-export.json", JSON.stringify(state, null, 2), "application/json");
    setNotice("Downloaded JSON export.");
  }

  function exportCsv() {
    downloadText("seedtag-labels.csv", plantsToCsv(state.plants), "text/csv;charset=utf-8");
    setNotice("Downloaded CSV label export.");
  }

  function exportIcs() {
    downloadText("seedtag-calendar.ics", buildIcs(tasks, state.event), "text/calendar;charset=utf-8");
    setNotice("Downloaded ICS calendar.");
  }

  async function importCsv(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const importedPlants = plantsFromCsv(await file.text());
      setState((current) => ({
        ...current,
        plants: importedPlants,
        selectedPlantId: importedPlants[0]?.id ?? null
      }));
      setNotice(`Imported ${importedPlants.length} plant records from CSV.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "CSV import failed.");
    } finally {
      event.target.value = "";
    }
  }

  async function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const importedState = readJsonState(await file.text());
      setState(importedState);
      setNotice("Imported SeedTag Studio JSON export.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "JSON import failed.");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header no-print">
        <div>
          <p className="eyebrow">Seed swap and plant sale kit</p>
          <h1>SeedTag Studio</h1>
          <p>
            Build printable labels, care cards, table signs, and a frost-date task calendar without external services.
          </p>
        </div>
        <div className="header-actions">
          <button type="button" onClick={saveLocal}>
            <Save size={17} />
            Save
          </button>
          <button type="button" onClick={loadLocal}>
            <FolderOpen size={17} />
            Load
          </button>
          <button type="button" onClick={() => window.print()}>
            <Printer size={17} />
            Print
          </button>
        </div>
      </header>

      <main className="workspace no-print">
        <section className="left-rail">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Event</p>
                <h2>Club details</h2>
              </div>
              <button className="icon-button" type="button" onClick={resetSamples}>
                <RotateCcw size={17} />
                <span>Sample</span>
              </button>
            </div>
            <div className="form-grid">
              <label>
                Event name
                <input
                  value={state.event.eventName}
                  onChange={(event) => updateEvent("eventName", event.target.value)}
                />
              </label>
              <label>
                Host
                <input value={state.event.hostName} onChange={(event) => updateEvent("hostName", event.target.value)} />
              </label>
              <label>
                Location
                <input value={state.event.location} onChange={(event) => updateEvent("location", event.target.value)} />
              </label>
              <label>
                Pickup window
                <input
                  value={state.event.pickupWindow}
                  onChange={(event) => updateEvent("pickupWindow", event.target.value)}
                />
              </label>
              <label>
                Last frost
                <input
                  type="date"
                  value={state.event.lastFrostDate}
                  onChange={(event) => updateEvent("lastFrostDate", event.target.value)}
                />
              </label>
              <label>
                First frost
                <input
                  type="date"
                  value={state.event.firstFrostDate}
                  onChange={(event) => updateEvent("firstFrostDate", event.target.value)}
                />
              </label>
              <label>
                Sale date
                <input
                  type="date"
                  value={state.event.saleDate}
                  onChange={(event) => updateEvent("saleDate", event.target.value)}
                />
              </label>
              <label>
                Club link
                <input
                  value={state.event.contactUrl}
                  placeholder="gardenclub.example/seeds"
                  onChange={(event) => updateEvent("contactUrl", event.target.value)}
                />
              </label>
              <label className="span-2">
                Notes
                <textarea value={state.event.notes} onChange={(event) => updateEvent("notes", event.target.value)} />
              </label>
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Starter data</p>
                <h2>Crop library</h2>
              </div>
              <span className="count-pill">{starterCrops.length} crops</span>
            </div>
            <label className="search-field">
              <Search size={17} />
              <input
                value={starterSearch}
                placeholder="Search tomato, herb, native..."
                onChange={(event) => setStarterSearch(event.target.value)}
              />
            </label>
            <div className="starter-list">
              {filteredStarters.map((crop) => (
                <article className="starter-card" key={crop.starterId}>
                  <div>
                    <p>{crop.type}</p>
                    <h3>{crop.plantName}</h3>
                    <span>{crop.variety}</span>
                  </div>
                  <p>{crop.summary}</p>
                  <button type="button" onClick={() => addStarterPlant(crop.starterId)}>
                    <Plus size={16} />
                    Add
                  </button>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="center-column">
          <section className="panel batch-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Batch builder</p>
                <h2>Labels and records</h2>
              </div>
              <button type="button" onClick={addCustomPlant}>
                <Plus size={17} />
                Custom
              </button>
            </div>
            <div className="batch-stats">
              <div>
                <strong>{summary.plantCount}</strong>
                <span>records</span>
              </div>
              <div>
                <strong>{summary.labelCount}</strong>
                <span>print pieces</span>
              </div>
              <div>
                <strong>{Object.keys(summary.typeCounts).length}</strong>
                <span>types</span>
              </div>
            </div>

            {state.plants.length === 0 ? (
              <div className="empty-state">
                <Leaf size={34} />
                <h3>No labels yet</h3>
                <p>Add a starter crop, import a CSV, or create a custom plant record.</p>
                <button type="button" onClick={addCustomPlant}>
                  <Plus size={17} />
                  Add first label
                </button>
              </div>
            ) : (
              <div className="plant-list">
                {state.plants.map((plant) => (
                  <button
                    className={plant.id === selectedPlant?.id ? "active" : ""}
                    type="button"
                    key={plant.id}
                    onClick={() => setState((current) => ({ ...current, selectedPlantId: plant.id }))}
                  >
                    <span>
                      <strong>{plant.plantName || "Untitled plant"}</strong>
                      <small>{plant.variety || plant.type}</small>
                    </span>
                    <em>{plant.quantity}</em>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="panel editor-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Label editor</p>
                <h2>{selectedPlant ? getPlantTitle(selectedPlant) : "Select a plant"}</h2>
              </div>
              <div className="segmented-actions">
                <button type="button" onClick={duplicateSelectedPlant} disabled={!selectedPlant}>
                  <Copy size={16} />
                </button>
                <button type="button" onClick={deleteSelectedPlant} disabled={!selectedPlant}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {!selectedPlant ? (
              <div className="empty-state">
                <Sparkles size={34} />
                <h3>Pick a crop to start</h3>
                <p>The starter library includes vegetables, herbs, flowers, and general native-plant examples.</p>
              </div>
            ) : (
              <>
                <div className="form-grid">
                  <label>
                    Plant name
                    <input
                      value={selectedPlant.plantName}
                      placeholder="Tomato"
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, plantName: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Variety
                    <input
                      value={selectedPlant.variety}
                      placeholder="Cherry mix"
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, variety: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Type
                    <select
                      value={selectedPlant.type}
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, type: event.target.value as PlantRecord["type"] }))
                      }
                    >
                      {plantTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Quantity
                    <input
                      type="number"
                      min="1"
                      value={selectedPlant.quantity}
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, quantity: Number(event.target.value || 1) }))
                      }
                    />
                  </label>
                  <label>
                    Sun
                    <select
                      value={selectedPlant.sun}
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, sun: event.target.value as PlantRecord["sun"] }))
                      }
                    >
                      {sunOptions.map((sun) => (
                        <option key={sun}>{sun}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Water
                    <select
                      value={selectedPlant.water}
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({
                          ...plant,
                          water: event.target.value as PlantRecord["water"]
                        }))
                      }
                    >
                      {waterOptions.map((water) => (
                        <option key={water}>{water}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Spacing
                    <input
                      value={selectedPlant.spacing}
                      placeholder="18-24 in"
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, spacing: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Price or donation
                    <input
                      value={selectedPlant.priceDonation}
                      placeholder="$3 donation"
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, priceDonation: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Days to maturity
                    <input
                      value={selectedPlant.daysToMaturity}
                      placeholder="65 days"
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, daysToMaturity: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Care URL
                    <input
                      value={selectedPlant.careUrl}
                      placeholder="/care/tomato"
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, careUrl: event.target.value }))
                      }
                    />
                  </label>
                  <label className="span-2">
                    Sow and transplant notes
                    <textarea
                      value={selectedPlant.sowTransplantNotes}
                      onChange={(event) =>
                        updateSelectedPlant((plant) => ({ ...plant, sowTransplantNotes: event.target.value }))
                      }
                    />
                  </label>
                </div>

                <div className="task-editor">
                  <div className="panel-heading mini">
                    <div>
                      <p className="eyebrow">Crop offsets</p>
                      <h3>Calendar tasks</h3>
                    </div>
                    <button type="button" onClick={addTaskOffset}>
                      <Plus size={16} />
                      Task
                    </button>
                  </div>
                  {selectedPlant.taskOffsets.length === 0 && (
                    <div className="empty-inline">Add at least one offset to include this crop in the calendar.</div>
                  )}
                  {selectedPlant.taskOffsets.map((task) => (
                    <div className="task-row" key={task.id}>
                      <input
                        value={task.label}
                        aria-label="Task label"
                        onChange={(event) => updateTask(task.id, { label: event.target.value })}
                      />
                      <input
                        type="number"
                        aria-label="Days from last frost"
                        value={task.daysFromLastFrost}
                        onChange={(event) => updateTask(task.id, { daysFromLastFrost: Number(event.target.value) })}
                      />
                      <select
                        value={task.phase}
                        aria-label="Task phase"
                        onChange={(event) => updateTask(task.id, { phase: event.target.value as TaskPhase })}
                      >
                        {taskPhases.map((phase) => (
                          <option key={phase}>{phase}</option>
                        ))}
                      </select>
                      <button type="button" onClick={() => removeTaskOffset(task.id)} aria-label="Remove task">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </section>

        <section className="right-rail">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Files</p>
                <h2>Import/export</h2>
              </div>
            </div>
            <div className="file-actions">
              <button type="button" onClick={exportCsv}>
                <Download size={17} />
                CSV
              </button>
              <button type="button" onClick={exportJson}>
                <FileJson size={17} />
                JSON
              </button>
              <button type="button" onClick={() => csvImportRef.current?.click()}>
                <Upload size={17} />
                Import CSV
              </button>
              <button type="button" onClick={() => jsonImportRef.current?.click()}>
                <Upload size={17} />
                Import JSON
              </button>
              <input ref={csvImportRef} className="visually-hidden" type="file" accept=".csv,text/csv" onChange={importCsv} />
              <input
                ref={jsonImportRef}
                className="visually-hidden"
                type="file"
                accept=".json,application/json"
                onChange={importJson}
              />
            </div>
            <p className="notice">{notice}</p>
          </section>

          <CalendarPanel event={state.event} tasks={tasks} onDownloadIcs={exportIcs} />

          <section className="panel preview-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Print templates</p>
                <h2>{getTemplateLabel(state.selectedTemplate)}</h2>
              </div>
              <button type="button" onClick={() => window.print()}>
                <Printer size={17} />
                Print
              </button>
            </div>
            <div className="template-tabs" role="tablist" aria-label="Print template">
              {printTemplates.map((template) => (
                <button
                  className={template === state.selectedTemplate ? "active" : ""}
                  type="button"
                  key={template}
                  onClick={() => setState((current) => ({ ...current, selectedTemplate: template }))}
                >
                  {getTemplateLabel(template)}
                </button>
              ))}
            </div>
            <div className="print-preview-frame">
              <PrintTemplates event={state.event} plants={state.plants} template={state.selectedTemplate} />
            </div>
          </section>
        </section>
      </main>

      <div className="print-only">
        <PrintTemplates event={state.event} plants={state.plants} template={state.selectedTemplate} />
      </div>
    </div>
  );
}

export default App;
