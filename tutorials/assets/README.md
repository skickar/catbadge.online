# Tutorial images

Screenshots and photos for the guides live here. Reference them relatively from a guide,
e.g. `<img src="assets/i2c-qwiic-wiring.jpg" alt="...">`. Keep files web-sized (≤ ~300 KB).

Until an image exists, guides use a `<figure class="shot"><div class="frame">[ describe ]</div></figure>`
placeholder so the layout is correct and it's clear what to capture.

## Images the Bus Pirate guide (bus-pirate-lora-i2c.html) still needs
- `i2c-qwiic-wiring.jpg` — BME280 wired to the badge's QWIIC/I2C connector (photo provided by Retia).
- `cli-banner.png` — the Bus Pirate banner + `help` output in the serial console.
- `i2c-scan-tft.jpg` — the on-screen I2C scan result on the badge TFT.
- `lora-badge-to-badge.jpg` — two badges, one sending, one showing the received line + RSSI.
- `meshtastic-received.png` — the badge's text arriving on a Meshtastic phone/app.

Once a file is here, swap the guide's placeholder `<div class="frame">…</div>` for
`<img src="assets/<name>" alt="…">`.
