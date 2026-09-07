# Block Bloom Luna+ 2.0

An update of Adrian's working Luna-method Block Bloom build. The successful Android
architecture is preserved: API 35 (minimum API 26), plain Java Activity + offline
WebView, aapt -> d8 -> zipalign -p 4 -> apksigner. No Gradle, Android 16 window-insets
controller code, native libraries, runtime permissions, accounts, or telemetry.

## Changes

- High scores and active puzzles are checkpointed together after every move.
  The Android adapter uses synchronous SharedPreferences.commit on WebView's Java
  bridge worker, not the UI thread. The call returns a success flag. A secondary
  WebView-local copy remains available; native checkpoints are authoritative after
  process restart. Both adapters refuse to lower existing personal records.
- A prior checkpoint is retained as a corruption fallback. Disk-write failures show
  a warning, not a false 'saved' state. No save system can survive uninstalling or
  clearing the entire application's data; export a backup first.
- 24 Adventure missions now have unique line targets: level n needs n+2 lines.
  Required lines rise from 3 to 26. Allowed moves per line decrease at every level.
  Board prefill and the shape pool grow, utility allowances reduce from 3 to 1, and
  later missions additionally require a combo or particular color-block count.
- All 24 levels have saved winning routes in solutions.json, replayed by tests.
  That proves a winning route exists; not every arbitrary placement remains viable.
- Prism is a 40-move score attack without a timer: 48 shapes, free rotation, and a
  score multiplier growing every five cleared lines, capped at 5x. Classic and Cozy
  remain available. Classic introduces the expanded pool above 5,000 points.
- 18 additional connected polyomino designs (48 total) and a shape gallery.
- Five block palettes: Pastel, Neon, Ocean, Sunset, Berry. Three background themes
  remain unchanged. Settings apply immediately and persist.
- Settings > Scores & backup includes manual recovery of a self-reported old record
  and a BB2: progress export/import code containing the current puzzle, records,
  stars, and settings. An imported lower best never decreases the existing best.
- English and Romanian labels for the new features.

## App identity and updates

Package: ro.blockbloom.lunaplus
Version: 2.0-luna-plus / versionCode 200
Installed label: Block Bloom Luna+

The original working ro.blockbloom.game build generated a temporary signing key on
an ephemeral GitHub runner and did not save it. It therefore cannot be updated
in-place with a newly generated key. This release installs alongside it, without
uninstalling or overwriting the user's currently working game. Its private signing
credentials are retained separately in the owner-only backup. ALL future builds
must keep this package and signing key and increment versionCode. Never generate
another key as part of a routine update. Never put credentials in public GitHub.

## Build

Install Android SDK packages platforms;android-35 and build-tools;35.0.0, Java, zip.
The supplied build.sh accepts a compact tools layout via BLOOM_SDK35. That directory
must contain android.jar from platforms/android-35, aapt, zipalign, lib/d8.jar,
lib/apksigner.jar, and lib64/libc++.so from build-tools/35.0.0.

    BLOOM_SDK35=/path/to/sdk35 \
    BLOOM_KEYSTORE=/private/path/luna-plus.p12 \
    BLOOM_PASS_FILE=/private/path/keystore-password.txt \
    bash android/build.sh

Build scripts do NOT regenerate signing keys. Create release/ before building.
The private owner backup contains the matching key and password; the public source
archive deliberately excludes them and the Android SDK binaries.

## Tests

    node tests-engine.js

Includes 2,000 valid simulated Cozy placements, all 24 winning Adventure routes,
progressive goal/budget checks, shape uniqueness/connectivity, Prism rotation,
40-move finish, multipliers, score monotonicity, native adapter restart, and failures.

The browser UI test uses a deterministic Storage test double because the local
Chromium environment does not allow HTTP navigation. These UI checks are not proof
of disk durability. The separate Android instrumentation test exercises the REAL
native persistent store, real touch events, process termination, whole-device
reboot with WebView localStorage cleared, and a same-key reinstall.

The tests APK is for CI only. Do not ask end users to install it.
An Android 16 x86_64 Pixel Tablet emulator is used for runtime testing. No physical
Lenovo TB336FU test or Google Play review has been performed.
