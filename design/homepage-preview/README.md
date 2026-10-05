# Homepage preview: a design reference, not site code

A static rendering of the homepage specified in [`WEBSITE-DESIGN-PLAN.md`](../../WEBSITE-DESIGN-PLAN.md) §7, with the figures V1, P1, F1, M1, F2 and O1 from [`DIAGRAM-PLAN.md`](../../DIAGRAM-PLAN.md). It has two jobs: to let the design be reviewed visually before implementation, and to give implementation sessions an exact visual target.

This is **version 2**. It follows the owner's review of version 1:
- less text;
- diagrams in place of paragraphs;
- an animated memory map;
- the "your memory, not your agent's" section.

| Path | What it is |
|---|---|
| `home.html` | Open it directly in a browser; the fonts load from `fonts/`. The desktop composition is used at 768 px and wider, the mobile composition below that (resize the window to see both). |
| `screenshots/` | Rendered with Chromium at 1440 px (desktop, 2×) and 390 px (mobile, 2×). The static screenshots use reduced motion, so the memory map shows every event at once. |
| `screenshots/memory-map-storyboard.png` | Six moments from the memory map's 16-second animation. |
| `fonts/` | Newsreader (variable) and IBM Plex Mono, under the SIL Open Font License 1.1. The licences are included. |

**Not part of the Next.js app.** Nothing in this folder is imported, built or deployed.

**What it shows:**
- **State A.** The repository is not yet public, so the nav call to action is `Contact` and the closing section reads "The repository opens soon."
- **Example content.** The conclusions, confidence values and links are illustrative. The confidence values come from Reverie's update rules (see `DIAGRAM-PLAN.md` §6).
- **The memory map animation (M1).**
  - It loops every 16 seconds and has a pause button.
  - With reduced motion it shows a static, annotated map.
  - The production component must also pause while the map is off screen (see `IMPLEMENTATION-TASKS.md`, T4).
- **Draft copy**, pending owner approval.

**Using it during implementation.** Port the design tokens, measurements, SVG geometry and keyframes from `home.html` into React components; don't copy the file wholesale. Where its wording differs from the plan, this preview is newer.
