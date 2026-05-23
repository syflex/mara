<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Behavioral tunables live in `src/lib/config.ts`

When you add a `setTimeout`, `setInterval`, `playbackRate`, audio rate, recording cap, or any pedagogical knob someone might want to tune without diving into a component — check `src/lib/config.ts` first. Add it there if it isn't already, then import.

Exception: animation durations or sizes that are intrinsically tied to *one* transition or component layout (an SVG circle's radius, a single fade duration) stay inline. The test is whether changing the value elsewhere would make sense in isolation — if no, keep it local.
