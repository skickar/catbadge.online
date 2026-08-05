<!-- Use this template for a Community BINs submission.
     Open it with: ?template=community-image.md appended to the compare URL. -->

## Community image submission

- **Project name:**
- **Link to source:**
- **What it does:**
- **Author / credit:**
- **License:**
- **Transmit/attack-capable?** (Wi-Fi/BLE/RF deauth, spoof, jam, TX): yes / no — if yes, describe.

### What's in this PR
- [ ] `community/firmware/<slug>.factory.bin` — a **merged factory image** for the ESP32-S3 badge,
      flashable at `0x0` (not an app-only image).
- [ ] An entry in `community/community.json` with the file's `sha256`
      (`shasum -a 256 community/firmware/<slug>.factory.bin`).

### Confirmations
- [ ] The source link is public and the code matches this build.
- [ ] I own the rights / license to share this, and it's noted above.
- [ ] I understand this is listed as **untested / unverified** and is not moved into the main
      hardware-verified catalog.

---
_Maintainers: validate and add with the `catbadge-community-image` skill before merging
(magic byte, merged-vs-app-only check, size, sha256, source sanity)._
