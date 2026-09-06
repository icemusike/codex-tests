# Luna KeyQuest 1.0

Original Romanian keyboard-learning game for a child and parent. Plays directly in a browser, installs as a PWA, and has an offline Android WebView host. No third-party game assets, fonts, analytics, advertising, accounts, camera, or microphone. No child's personal information is embedded in the source.

## Play
Open `web/index.html` directly for local play, or host `web/` over HTTPS for PWA installation and service-worker offline support. On Android Chrome use the browser menu → Install app / Add to Home screen. Load the hosted version online once and wait for the offline-ready message before using it offline.

## Features
- Original vector fox astronaut, animated starfield, planets, bubbles, musical feedback, particle effects.
- Touch QWERTY keyboard and case-insensitive physical-keyboard input. Holding a key does not auto-score.
- Seven missions: vowels, home row, alphabet, numbers, words, Romanian characters, mixed alphanumerics.
- Gentle timed play, untimed practice, parent/child pass-and-play (two sequential rounds, not network multiplayer).
- Optional luminous hints, lowercase mode, reduced motion, optional quiet music, 3 difficulty settings, 75/120/180-second rounds.
- Local scores, accuracy, letter-practice journal, and six earned badges. No lives, ads, purchases, or streak pressure.
- Pause, automatic pause when hidden, portrait/landscape responsive layout, offline app resources.

## Controls
Look at a falling bubble and press the matching keyboard key. Touching a bubble does not score. In words mode, type each letter in order. Escape pauses. In untimed mode a bubble stops and waits for the player. Stars represent the number of bubbles/words completed, while accuracy measures correct physical/touch keystrokes divided by all counted keystrokes.

## Build web
`python3 build_web.py` in the project directory. All web code is bundled inline so that the single HTML also works without hosting. Icon PNG generation uses CairoSVG, which is only a build dependency.

## Build Android APK
Use JDK 17+, Android SDK platform 35 and build tools, Gradle 8.11.1, and Android Gradle Plugin 8.9.2. Run `gradle -p android assembleDebug`.
The signed testing APK is `android/app/build/outputs/apk/debug/app-debug.apk`.
Android 8.0+ is the configured minimum. An up-to-date Android System WebView is recommended. The APK uses bundled local content and requests **no network or sensitive permissions**. It does not depend on the preview website.
This is a signed sideload testing build, not a Google Play listing or store-certified release. A persistent private release signing key should be configured before distributing long-term updates. Default debug keys may differ across build machines; an APK signed by another key requires uninstalling the old app, which deletes its saved data.

## Privacy and storage
Only an optional locally entered nickname and local game progress are saved. Nothing is sent by the game. Ordinary hosting access logs are controlled by the hosting provider. Browser/PWA and native Android saves are separate. Clearing browser/app data or uninstalling can erase progress. Progress does not sync across devices.

## Testing
Browser interaction tests cover touch, hardware keyboard, scoring, pause/resume, portrait resizing, word entry, and parent/child rounds. Physical Android-tablet testing remains necessary before calling the native release device-verified.
