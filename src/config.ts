
export const NEON_AUTH_URL: string =
  "https://ep-red-morning-awzkc1lp.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth";
export const NEON_DATA_URL: string =
  "https://ep-red-morning-awzkc1lp.apirest.c-12.us-east-1.aws.neon.tech/neondb/rest/v1";


export const ENABLE_SERVICE_WORKER: boolean = true;

export const SYNC_MODE: SyncMode = "immediate";

// immediate means publish to postgrest immediately and ignore indexeddb
// offline-sim means publish to indexed db and don't start any worker to process those events
// main-loop means use an effect loop to publish indexedb actions from the main ui loop
// web-worker means use a background web worker publish indexedb actions from the main ui loop

export type SyncMode = "immediate" | "offline-sim" | "main-loop" | "web-worker";
