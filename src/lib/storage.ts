import type { AppState } from "./types";

export const storageKey = "seedtag-studio-state-v1";

export function saveState(state: AppState, storage: Storage = window.localStorage): void {
  storage.setItem(storageKey, JSON.stringify(state));
}

export function loadState(storage: Storage = window.localStorage): AppState | null {
  const raw = storage.getItem(storageKey);
  if (!raw) {
    return null;
  }
  const parsed = JSON.parse(raw) as AppState;
  return parsed.version === 1 ? parsed : null;
}

export function clearState(storage: Storage = window.localStorage): void {
  storage.removeItem(storageKey);
}

