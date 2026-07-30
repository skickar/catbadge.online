# catbadge.online — ScriptKitty DEF CON Badge getting-started site

Single-page static site for the ScriptKitty DEF CON Badge (Retia LLC × IoT Village, DEF CON 2026):
getting started in 5 steps, the three mesh systems, an in-browser Web Serial flasher + serial
monitor, a manifest-driven firmware catalog, hardware specs + pinout, interactive 3D model, and
the case-design kit.

- No build step — plain HTML/CSS/JS, served straight from the repo root by GitHub Pages.
- `manifest.json` drives the firmware select + catalog; bins live in `firmware/` (same-origin so
  the browser flasher can fetch them — github raw URLs are CORS-blocked).
- `vendor/` holds pinned esptool-js@0.4.1 and @google/model-viewer@3.5.0 (no CDN dependency).
- Live at https://www.catbadge.online/ — sibling of https://scriptkitty.sh (RetiaLLC/scriptkitty.sh).
