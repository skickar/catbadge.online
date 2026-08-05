# Submitting a community image

The Community BINs flasher lets anyone flash community-built badge images. They're served the same
way as the main catalog, but they are **untested and unverified** — the page says so and gates every
flash. Here's how to get yours listed.

## What you need

- **Project name**
- **Link to source** — a public repository for the code
- **What it does** — a sentence or two (and say so if it can transmit or attack: Wi-Fi/BLE/RF)
- A **merged `factory.bin`** for the ESP32-S3 badge, flashable at **`0x0`** — bootloader + partition
  table + app in one file, not an app-only image.

### Building a merged factory image
If your build produces separate `bootloader.bin` / `partition-table.bin` / `app.bin`, merge them:
```bash
esptool --chip esp32s3 merge_bin -o my-project.factory.bin \
  --flash_mode dio --flash_freq 80m --flash_size 8MB \
  0x0 bootloader.bin 0x8000 partition-table.bin 0x10000 my-project.bin
```
(PlatformIO/ESP-IDF often emit a `*.factory.bin` already — use that.)

## Submit by pull request

1. **Propose it first** (optional): open the [community image form](https://github.com/skickar/catbadge.online/issues/new?template=community-image.yml).
2. **Fork** `skickar/catbadge.online`.
3. Drop your file at `community/firmware/<slug>.factory.bin`.
4. Add an entry to `community/community.json` under `images`:
   ```json
   {
     "id": "my-project",
     "name": "My Project",
     "author": "@you",
     "source": "https://github.com/you/my-project",
     "desc": "One or two sentences on what it does.",
     "file": "my-project.factory.bin",
     "url": "firmware/my-project.factory.bin",
     "addr": 0,
     "sha256": "<shasum -a 256 of the .bin>",
     "submitted": "YYYY-MM-DD"
   }
   ```
   Get the hash with `shasum -a 256 community/firmware/my-project.factory.bin`.
5. Open a PR using the **community-image** template. A maintainer validates the image (magic byte,
   that it's a real merged factory image, size, and that the hash matches) and merges it. It appears
   in the flasher on the next build — still labelled untested.

## Ground rules

- **It stays untested.** Community images are never moved into the main hardware-verified catalog
  without real verification.
- **Source required.** No source link, no listing.
- **Be honest about capability.** If it can deauth/spoof/jam or transmit on RF, say so — it flashes
  behind the same "you own this and accept the risk" gate, but users deserve to know.
- **Your badge, your risk.** Don't submit something you wouldn't flash on your own badge.

_Maintainers: process submissions with the `catbadge-community-image` skill._
