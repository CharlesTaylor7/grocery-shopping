import type { SyncMode } from '@/islands/SyncActionProvider';

export const VITE_NEON_AUTH_URL: string =
  "https://ep-red-morning-awzkc1lp.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth";
export const VITE_NEON_DATA_URL: string =
  "https://ep-red-morning-awzkc1lp.apirest.c-12.us-east-1.aws.neon.tech/neondb/rest/v1";

export const SYNC_MODE: SyncMode =
  "web-worker";


export const ENABLE_SERVICE_WORKER: boolean =
  true
