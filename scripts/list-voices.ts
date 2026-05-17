/**
 * Lists every ElevenLabs voice your API key can access, grouped by category.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk_... pnpm audio:voices
 */

const API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY) {
  console.error('Missing ELEVENLABS_API_KEY.');
  process.exit(1);
}

interface Voice {
  voice_id: string;
  name: string;
  category?: string;
  labels?: Record<string, string>;
}

async function main() {
  const res = await fetch('https://api.elevenlabs.io/v1/voices', {
    headers: { 'xi-api-key': API_KEY as string },
  });
  if (!res.ok) {
    console.error(`Failed (${res.status}): ${await res.text()}`);
    process.exit(1);
  }
  const { voices } = (await res.json()) as { voices: Voice[] };

  const byCategory = new Map<string, Voice[]>();
  for (const v of voices) {
    const cat = v.category ?? 'unknown';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(v);
  }

  for (const [cat, list] of byCategory) {
    console.log(`\n${cat}  (${list.length})`);
    for (const v of list) {
      const tags = v.labels
        ? Object.entries(v.labels)
            .map(([k, val]) => `${k}=${val}`)
            .join(', ')
        : '';
      console.log(`  ${v.voice_id.padEnd(22)} ${v.name.padEnd(20)} ${tags}`);
    }
  }

  console.log(
    '\nTo use a voice:  ELEVENLABS_VOICE_ID=<voice_id> pnpm audio:build',
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
