/**
 * Loads `.env.local` into `process.env` for tsx-run scripts.
 *
 * Next.js loads `.env.local` automatically at runtime; scripts in `scripts/`
 * are plain Node processes and don't get that for free. Call `loadEnvLocal()`
 * once at the top of any script that depends on `.env.local` secrets
 * (anything reading `ELEVENLABS_API_KEY`, etc).
 *
 * Existing shell values are NOT overwritten — matches `node --env-file=` and
 * dotenv behaviour. Tiny on-disk format: `KEY=value`, `#` comments, blank
 * lines, optional surrounding quotes.
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadEnvLocal(
  path = join(process.cwd(), '.env.local'),
): void {
  if (!existsSync(path)) return;
  const raw = readFileSync(path, 'utf8');
  for (const rawLine of raw.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
