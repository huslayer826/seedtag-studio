import { QrCodeImage } from "./QrCode";
import { formatReadableDate } from "../lib/date";
import { getCareUrlDisplay, getPlantTitle, summarizeBatch } from "../lib/core";
import type { EventProfile, PlantRecord, PrintTemplate } from "../lib/types";

interface PrintTemplatesProps {
  event: EventProfile;
  plants: PlantRecord[];
  template: PrintTemplate;
}

function repeatedPlants(plants: PlantRecord[]): PlantRecord[] {
  return plants.flatMap((plant) =>
    Array.from({ length: Math.max(1, plant.quantity) }, (_, index) => ({
      ...plant,
      id: `${plant.id}-copy-${index}`
    }))
  );
}

function LabelMeta({ plant }: { plant: PlantRecord }) {
  return (
    <dl className="label-meta">
      <div>
        <dt>Sun</dt>
        <dd>{plant.sun}</dd>
      </div>
      <div>
        <dt>Water</dt>
        <dd>{plant.water}</dd>
      </div>
      <div>
        <dt>Spacing</dt>
        <dd>{plant.spacing || "Ask table host"}</dd>
      </div>
    </dl>
  );
}

function PlantTags({ plants }: { plants: PlantRecord[] }) {
  const labels = repeatedPlants(plants);
  return (
    <div className="plant-tag-grid">
      {labels.map((plant) => (
        <article className="plant-tag" key={plant.id}>
          <div>
            <p className="label-type">{plant.type}</p>
            <h3>{plant.plantName || "Plant name"}</h3>
            <p className="label-variety">{plant.variety || "Variety"}</p>
          </div>
          <LabelMeta plant={plant} />
          <p className="label-note">{plant.sowTransplantNotes || "Add sowing or transplant notes."}</p>
          <footer>
            <span>{plant.priceDonation || "Free swap"}</span>
            <QrCodeImage value={plant.careUrl} label={getPlantTitle(plant)} size={56} />
          </footer>
        </article>
      ))}
    </div>
  );
}

function SeedPacketLabels({ plants, event }: { plants: PlantRecord[]; event: EventProfile }) {
  const labels = repeatedPlants(plants);
  return (
    <div className="seed-packet-grid">
      {labels.map((plant) => (
        <article className="seed-label" key={plant.id}>
          <header>
            <div>
              <p>{plant.type}</p>
              <h3>{plant.plantName || "Seed name"}</h3>
            </div>
            <span>{plant.priceDonation || "Swap"}</span>
          </header>
          <p className="label-variety">{plant.variety || "Open pollinated"}</p>
          <p>{plant.sowTransplantNotes || "Add seed starting notes before printing."}</p>
          <dl className="packet-facts">
            <div>
              <dt>Sun</dt>
              <dd>{plant.sun}</dd>
            </div>
            <div>
              <dt>Spacing</dt>
              <dd>{plant.spacing || "See care notes"}</dd>
            </div>
            <div>
              <dt>Ready</dt>
              <dd>{plant.daysToMaturity || "Varies"}</dd>
            </div>
          </dl>
          <footer>
            <span>{event.hostName || "Seed library"}</span>
            <span>{getCareUrlDisplay(plant.careUrl)}</span>
          </footer>
        </article>
      ))}
    </div>
  );
}

function CareCards({ plants, event }: { plants: PlantRecord[]; event: EventProfile }) {
  return (
    <div className="care-card-stack">
      {plants.map((plant) => (
        <article className="care-card" key={plant.id}>
          <header>
            <div>
              <p className="label-type">{plant.type} care card</p>
              <h2>{getPlantTitle(plant)}</h2>
            </div>
            <QrCodeImage value={plant.careUrl} label={getPlantTitle(plant)} size={92} />
          </header>
          <LabelMeta plant={plant} />
          <div className="care-notes">
            <h3>Sowing and transplanting</h3>
            <p>{plant.sowTransplantNotes || "Add notes for seed depth, transplant timing, or hardening off."}</p>
          </div>
          <footer>
            <span>{plant.daysToMaturity || "Days to maturity varies"}</span>
            <span>{event.hostName || "Garden club"}</span>
          </footer>
        </article>
      ))}
    </div>
  );
}

function SaleSign({ plants, event }: { plants: PlantRecord[]; event: EventProfile }) {
  const summary = summarizeBatch(plants);
  const featured = plants.slice(0, 10);

  return (
    <article className="sale-sign">
      <p className="label-type">{event.hostName || "Garden club"}</p>
      <h1>{event.eventName || "Seed & Plant Sale"}</h1>
      <div className="sale-sign-details">
        <strong>{formatReadableDate(event.saleDate)}</strong>
        <span>{event.pickupWindow || "Local pickup"}</span>
        <span>{event.location || "Community table"}</span>
      </div>
      <section>
        <h2>Today&apos;s table</h2>
        <ul>
          {featured.map((plant) => (
            <li key={plant.id}>
              <span>{getPlantTitle(plant)}</span>
              <strong>{plant.priceDonation || "Swap"}</strong>
            </li>
          ))}
        </ul>
      </section>
      <footer>
        <div>
          <strong>{summary.labelCount}</strong>
          <span>labels in batch</span>
        </div>
        <div>
          <strong>{summary.plantCount}</strong>
          <span>plant records</span>
        </div>
        <div>
          <strong>{event.contactUrl || "Add contact link"}</strong>
          <span>care notes and club info</span>
        </div>
      </footer>
    </article>
  );
}

export function PrintTemplates({ event, plants, template }: PrintTemplatesProps) {
  if (plants.length === 0) {
    return (
      <section className="print-sheet empty-print">
        <h2>No labels yet</h2>
        <p>Add a starter crop or custom plant to preview print templates.</p>
      </section>
    );
  }

  return (
    <section className={`print-sheet ${template}`}>
      {template === "plant-tags" && <PlantTags plants={plants} />}
      {template === "seed-packets" && <SeedPacketLabels plants={plants} event={event} />}
      {template === "care-cards" && <CareCards plants={plants} event={event} />}
      {template === "sale-sign" && <SaleSign plants={plants} event={event} />}
    </section>
  );
}

