import type { SyncMode } from '@/components/SyncActionProvider';

export const SENTRY_DSN =
  "https://fa9d710195c2565a103aad3fd04bed54@o4511832287674368.ingest.us.sentry.io/4511832294817792"

export const NEON_AUTH_URL: string =
  "https://ep-red-morning-awzkc1lp.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth";
export const NEON_DATA_URL: string =
  "https://ep-red-morning-awzkc1lp.apirest.c-12.us-east-1.aws.neon.tech/neondb/rest/v1";

export const SYNC_MODE: SyncMode =
  "main-loop";

export const ENABLE_SERVICE_WORKER: boolean =
  false

export const AUTH_GUARD: boolean =
  false
