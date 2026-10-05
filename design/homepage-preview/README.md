# Homepage preview: a design reference, not site code

A static rendering of the homepage specified in [`WEBSITE-DESIGN-PLAN.md`](../../WEBSITE-DESIGN-PLAN.md) §7, together with the figures V1, F1 and F2 from [`DIAGRAM-PLAN.md`](../../DIAGRAM-PLAN.md). It exists for two reasons: so the design can be reviewed visually before implementation, and so implementation sessions have an exact visual target.

| Path | What it is |
|---|---|
| `home.html` | Open it directly in a browser; the fonts load from `fonts/`. It uses the desktop composition at 768 px and wider, and the mobile composition below that (resize the window to see both). |
| `screenshots/` | Rendered with Chromium at 1440 px (desktop, 2×) and 390 px (mobile, 2×). |
| `fonts/` | Newsreader (variable) and IBM Plex Mono, under the SIL Open Font License 1.1; licences included. |

**Not part of the Next.js app.** Nothing in this folder is imported, built or deployed.

**What it shows:**
- **State A**: the repository is not yet public, so the nav call to action is `Contact` and the closing section reads "The repository opens soon."
- **Example values** in the specimen and figures. These are computed with Reverie's update rules (see `DIAGRAM-PLAN.md` §6).
- **Draft copy**, pending owner approval.

**Using it during implementation.** Port the design tokens, measurements and SVG geometry from `home.html` into React components; don't copy the file wholesale. Where its wording differs from the plan, this preview is newer.
