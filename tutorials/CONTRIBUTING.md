# Adding a tutorial

The Tutorials section works like the firmware catalog: a JSON file lists the guides and the index
builds itself from it. You add a guide by dropping in one HTML file and adding one JSON entry.
There's no build step.

**Guides are contributed by pull request.** Fork `skickar/catbadge.online`, make your changes on a
branch, and open a PR. A maintainer reviews and merges; the guide goes live on the next build.
Nobody pushes straight to `main`.

## The three-step recipe

1. **Copy the template.** `cp _template.html <slug>.html` (slug = lowercase, hyphens, e.g.
   `wled-effects-on-the-ears.html`). Write your content. All styling comes from `tutorial.css` —
   use the classes shown in the template (`callout`, `figure.shot`, `ptable`, `pre > code` with
   `<span class="c">` for comments/prompts and `<span class="g">` for highlights).

2. **Add one entry** to `tutorials.json` under `tutorials`:
   ```json
   {
     "id": "wled-effects",
     "title": "Drive the ear NeoPixels with WLEDkitty",
     "summary": "One-to-two sentence teaser shown on the index card.",
     "tags": ["badge", "wledkitty"],
     "difficulty": "beginner",
     "minutes": 10,
     "updated": "2026-08-02",
     "author": "Retia",
     "url": "wled-effects-on-the-ears.html"
   }
   ```
   The index sorts newest-first by `updated` (use `YYYY-MM-DD`).

3. **Open a PR.** Commit `<slug>.html` and the `tutorials.json` change on a branch and open a pull
   request against `skickar/catbadge.online`. After a maintainer merges it, the index shows the new
   card on the next build.

## Tags — how guides connect to the rest of the site

Every tag must exist in the `tags` map at the top of `tutorials.json`. A tag entry:

```json
"bit-pirate": { "label": "Bit Pirate", "kind": "project", "color": "#d6008f",
                "firmware": "bitpirate", "section": null }
```

- `label` — what shows on the chip/pill.
- `kind` — `hardware`, `project`, or `topic` (organizational only; all filter the same way).
- `color` — the pill color. **Must match** the `style="background:…"` you hardcode on the tag
  pills in the guide's `<header>` (the index reads colors from JSON; the guide header inlines them).
  Guide-header tag pills link with `./?tag=<id>` (the `./` sends the reader to the index, not back
  to the same guide).
- `firmware` — the `id` of a firmware entry in the site's root `manifest.json`, or `null`. **This is
  the cross-link:** when a tag names a firmware id, that firmware's catalog row on the home page
  grows a `[guides]` link that filters the index to this tag. `bit-pirate → bitpirate` is why the
  ESP32 Bit Pirate row links here.
- `section` — a URL (e.g. `../#hardware`) or `null`. Reserved for linking a tag to a page section.

**Adding a new tag:** add it to the `tags` map (pick a color from the palette below), then use it
in a guide's `tags` array and header pills. If it should light up a firmware row on the home page,
set `firmware` to that entry's id.

### Tag color palette (from the site design tokens)
- green `#00a35f` · magenta `#d6008f` · amber `#c77d00` · teal `#2b8a9e` · violet `#7a5ea8`

## Images

Put screenshots/photos in `tutorials/assets/` and reference them relatively
(`<img src="assets/my-shot.png" alt="…">`). Until you have the real image, leave the
`<figure class="shot"><div class="frame">[ describe the shot ]</div></figure>` placeholder — it
renders as a labeled empty frame, so the layout is correct and you can see exactly what to capture.
Keep images web-sized (≤ ~300 KB); the site is static and every byte ships.

## Deep-linking a filtered view

`tutorials/?tag=lora` opens the index pre-filtered to a tag. Share those links, or point site copy
at them. `tutorials/` alone shows everything.

## Conventions

- Keep the shared `<nav class="t-nav">` and `<footer class="t-foot">` blocks unchanged so every
  guide has the same chrome and a path back to the badge + the index.
- Guides are prose in `.wrap-narrow` (820px) for readability; the index uses `.wrap` (1140px).
- Match the house voice from the main site — plain, practical, a little playful. Cat puns welcome.
- Safety/authorization callouts (`callout danger`) are required for any transmit- or attack-capable
  workflow, mirroring the flasher's authorization gate.
