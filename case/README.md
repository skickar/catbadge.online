# 2024 DEF CON Badge - 3D Printed Case Design Kit

Generated 2026-07-30 from `2024_def_con_badge_v1.kicad_pcb` (KiCad 10).

## Files

| File | Purpose |
|---|---|
| `full_assembly.step` | Board + all components, CAD B-rep. **Primary reference** for Fusion 360 / FreeCAD / SolidWorks. |
| `full_assembly.stl` | Same assembly as mesh (mm, Z-up) for OpenSCAD / slicer sanity checks. |
| `full_assembly.glb` | Same assembly for quick viewing (macOS Quick Look, three.js, Blender). |
| `board_only_no_components.step` | Bare board solid (outline + holes), for boolean cavity work. |
| `board_outline.dxf` / `.svg` | Edge.Cuts outline (mm) for 2D sketch import. |
| `holes.csv` | Every through-hole: ref, type (PTH/NPTH), x/y, drill diameter. |
| `component_positions.csv` | KiCad pick-and-place: every footprint's origin, rotation, side. |
| `component_bboxes_step_frame.json` | Per-component 3D bounding boxes (mm, STEP frame) - handy for scripted/OpenSCAD case generation. |
| `render_top.png` / `render_bottom.png` / `render_persp.png` | Visual reference. |

## Coordinate systems

- **STEP / STL / GLB** share one frame, in mm: X right, Y up (front view), Z out of the board front. Board **back face is Z = 0**, **front face is Z = 1.6** (board thickness 1.6 mm). All tables below use this frame.
- **DXF / SVG / holes.csv / component_positions.csv** use KiCad sheet coordinates: same X, but **Y is negated** (y_kicad = -y_step) since KiCad's Y axis points down.

## Overall envelope

- Board outline (cat head shape): approx **142.4 x 81.0 mm** (X 78.8 .. 221.2, Y -141.1 .. -59.0).
- Total assembly height: **25.5 mm** (Z -15.2 .. +10.3).
- Front side max: **+10.3 mm** = top of display glass (8.7 mm above the front face).
- Back side max: **-15.2 mm** = battery holder with 2x AA cells (J9).
- Lanyard slot: oval cutout in the board top edge, between the ears (see DXF).

## Front-side features (case top must accommodate)

| Ref | What | Center (X, Y) | Size (mm) | Z range |
|---|---|---|---|---|
| U3 | 2.4" TFT module (module body) | (154.9, -108.0) | 77.4 x 43.0 | 1.6 .. 10.27 |
| U3 | **Screen window (active area)** | (154.9, -108.0) | 49.0 x 36.7 | glass top at 10.3 |
| SW8 | button A | (211.0, -97.0) | 8.4 x 6.6 | 1.59 .. 4.7 |
| SW7 | button B | (204.8, -109.7) | 8.4 x 6.6 | 1.59 .. 4.7 |
| SW5 | button DOWN | (97.0, -108.0) | 8.4 x 6.6 | 1.59 .. 4.7 |
| SW2 | button GPIO_0 | (181.2, -136.1) | 9.1 x 7.3 | 1.59 .. 4.7 |
| SW3 | button LEFT | (88.0, -100.0) | 8.4 x 6.6 | 1.59 .. 4.7 |
| SW1 | button RESET | (193.2, -134.1) | 9.1 x 7.3 | 1.59 .. 4.7 |
| SW6 | button RIGHT | (106.0, -100.0) | 8.4 x 6.6 | 1.59 .. 4.7 |
| SW4 | button UP | (97.0, -92.0) | 8.4 x 6.6 | 1.59 .. 4.7 |
| SW9 | power slide switch (ON/OFF) | (150.0, -135.5) | 9.0 x 6.2 | 0.09 .. 5.19 |
| LS1 | piezo buzzer (add sound holes) | (105.0, -124.0) | 12.0 x 12.0 | -13.4 .. 8.12 |
| J5 | SAO connector (2x3 socket) | (188.4, -70.3) | 8.7 x 9.1 | -1.51 .. 10.1 |
| J3 | SPI accessory header pins | (92.4, -129.7) | 13.5 x 10.7 | -1.41 .. 10.13 |
| D2-D14 | 10 NeoPixels around the ears (light pipes / window if desired) | various | 2 x 2 each | 1.6 .. 2.7 |

## Back-side features (case bottom must accommodate)

| Ref | What | Center (X, Y) | Size (mm) | Z range |
|---|---|---|---|---|
| J9 | battery holder, 2x AA (Keystone 2462) | (150.0, -110.0) | 32.9 x 59.5 | -15.19 .. 4.82 |
| U1 | ESP32-S3-WROOM module (antenna area: keep plastic thin / no metal) | (178.6, -100.2) | 18.0 x 25.5 | -3.34 .. -0.08 |
| U2 | RFM95W LoRa radio module | (105.0, -77.0) | 16.0 x 16.0 | -1.74 .. -0.09 |
| J7 | **USB-C port (side cutout in case wall)** | (216.1, -116.2) | 9.7 x 10.6 | -3.49 .. 1.01 |
| Card1 | **microSD card slot (side access cutout)** | (114.2, -133.0) | 13.8 x 13.3 | -2.08 .. -0.03 |
| J8 | NeoPixels JST-SH 4-pin connector | (85.4, -115.4) | 10.2 x 11.6 | -4.89 .. -0.08 |
| J4 | Qwiic/JST connector | (127.6, -83.3) | 6.6 x 4.7 | -4.02 .. 0.93 |
| J6 | Qwiic/JST connector | (169.5, -82.2) | 6.5 x 4.7 | -4.02 .. 0.93 |
| J1 | U.FL antenna connector | (106.8, -66.0) | 3.1 x 3.0 | -1.33 .. -0.08 |
| L1 | power inductor | (179.2, -131.2) | 4.2 x 4.4 | -1.91 .. -0.0 |
| L2 | power inductor | (190.1, -115.8) | 4.4 x 4.2 | -1.91 .. -0.0 |

## Mounting / registration holes

- 2x **3.3 mm NPTH** at (142.5, -110.0) and (157.5, -110.0) - battery holder alignment; these go all the way through and are the best candidates for case bosses/pegs (they are occupied by the battery holder pegs from the back, so front-side pegs only).
- Full hole list with drill sizes: `holes.csv` (KiCad Y sign).

## Gotchas / model accuracy notes

- **LS1 buzzer leads are modeled untrimmed** - they extend to Z -13.4 in the model. On the real badge they are clipped to ~2 mm. Do NOT size the back cavity around them; J9 (-15.2) is the true back-side maximum.
- U3 (display), U2 (LoRa radio), J3 are **DNP** in the PCB file (hand-assembled): KiCad's own 3D viewer hides them by default, but all exports in this folder INCLUDE them.
- The display module, RFM95W, and power-switch models are dimensionally-accurate authored stand-ins (the originals were never published). Treat +-0.5 mm and verify screen bezel against the physical module before committing to a tight screen window.
- USB-C (J7) and microSD (Card1) are back-mounted and enter from the board edge - their case cutouts are in the side wall, positioned per the Z ranges above.
- ESP32-S3 PCB antenna is the white-tipped end of U1 - avoid metal inserts/foil and thick walls directly over it.
