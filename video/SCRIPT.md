# EasiAbroad launch video — script

**Length:** about 56 seconds · **Format:** 1920×1080, 30 fps · **Voice:** calm, warm, confident (≈ 2.2 words a second)

Times are where each line starts in the video. The visuals are already cut to these times, so record each line within its window. Pauses between lines are fine.

| # | Time | Scene | Voiceover | On screen |
|---|------|-------|-----------|-----------|
| 1 | 0:00 – 0:05 | Hook | "You've got the grades. You've got the dream of studying abroad." | Serif headline writes in. A paper plane draws a dotted flight path. |
| 2 | 0:05 – 0:16 | Pain points | "But where do you even start? Which universities fit your CGPA? Which professors are taking students? When do scholarships close? And… are you even ready?" | Browser tabs, spreadsheets, sticky notes and red deadline circles pile up. Each question takes the centre. |
| 3 | 0:16 – 0:20 | Reveal | "Meet EasiAbroad — your whole study-abroad journey, in one place." | The clutter is pulled into one point. The wordmark draws its flight path, and the five features orbit it. |
| 4 | 0:20 – 0:26 | 01 · Study Abroad Readiness | "Answer five quick questions to see how ready you are — and get a clear to-do list." | A score ring counts up, area bars fill and to-do items tick off. |
| 5 | 0:26 – 0:32 | 02 · University Finder | "Find universities that match your CGPA, major and budget — across 30 countries." | Filter chips set, then matching university cards slide in with fit rings. |
| 6 | 0:32 – 0:38 | 03 · Find your Professor | "Discover professors who are taking students, with honest reviews from their labs." | A professor profile card builds: "Accepting students", rating, research tags, a review. |
| 7 | 0:38 – 0:44 | 04 · Scholarship Calendar | "Track every scholarship deadline, so you never miss one again." | A month calendar fills with deadline pills. Chevening pulses red and a "closes in 12 days" reminder pops up. |
| 8 | 0:44 – 0:49 | 05 · Conference Calendar | "And find research conferences to build your profile." | Conference cards line up on a timeline with paper deadlines. |
| 9 | 0:49 – 0:56 | Close | "Stop guessing. Start planning. EasiAbroad — study abroad, made easy." | A boarding pass (DAC → Abroad) slides in and "Check my readiness" is clicked. Ends on the logo and "Study abroad, made easy." |

**Total:** about 122 words.

## Recording notes
- Record one clean take per line (or one continuous take), as WAV or MP3.
- Leave about half a second of silence at the start and end of each file.
- The final voiceover (ElevenLabs, Lucan Rook) lives at `public/voiceover.mp3`. `VOICE` in `src/timeline.ts` cuts it into one clip per scene at the pauses, and each scene's length follows its clip. The rendered cut runs 53.6 seconds, so the times in the table above are approximate.

## Preview and render
Run these inside `video/`:

- `npm run studio` opens Remotion Studio to scrub the timeline.
- `npm run render` writes `out/easiabroad-launch.mp4`. On this Mac the bundled headless Chrome crashes, so add `-- --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --chrome-mode=chrome-for-testing`.
