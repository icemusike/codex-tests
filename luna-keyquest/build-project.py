#!/usr/bin/env python3
"""Reconstruct readable web and Android source from a checksum-verified bundle."""
import base64
import gzip
import hashlib
import json
from pathlib import Path
import cairosvg

root = Path(__file__).resolve().parent
bundle = json.loads((root / 'game.bundle').read_text())
html = gzip.decompress(base64.b64decode(bundle['gzip_base64'])).decode('utf-8')
assert hashlib.sha256(html.encode()).hexdigest() == bundle['sha256'], 'Source checksum mismatch'
out = root.parent / 'luna-dist'
web = out / 'web'
android = out / 'android'
web.mkdir(parents=True, exist_ok=True)
for folder in ['src/ro/lunakeyquest', 'res/drawable', 'res/values', 'assets']:
    (android / folder).mkdir(parents=True, exist_ok=True)
(web / 'index.html').write_text(html, encoding='utf-8')
(android / 'assets/index.html').write_text(html.replace('<!--NATIVE_FLAG-->', '<script>window.IS_ANDROID_APP=true;</script>'), encoding='utf-8')
manifest = {'id':'./','name':'Luna KeyQuest · Aventura tastelor','short_name':'Luna KeyQuest','lang':'ro','start_url':'./index.html','scope':'./','display':'standalone','background_color':'#141c38','theme_color':'#141c38','orientation':'any','icons':[{'src':f'icon-{s}.png','sizes':f'{s}x{s}','type':'image/png','purpose':'any maskable' if s == 512 else 'any'} for s in (192,512)]}
(web / 'manifest.webmanifest').write_text(json.dumps(manifest, ensure_ascii=False), encoding='utf-8')
(web / 'sw.js').write_text("""'use strict';
const CACHE='luna-keyquest-review-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('luna-keyquest-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())));});
""", encoding='utf-8')
icon = '''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#141c38"/><circle cx="256" cy="249" r="182" fill="#273556"/><circle cx="256" cy="249" r="163" fill="#354467" stroke="#a8d9d3" stroke-width="10"/><path d="M149 223 139 103q12-19 89 67h61q75-84 91-66l-14 126-109 140Z" fill="#efab79"/><path d="m162 129 15 84 34-40Zm190 1-20 85-31-40Z" fill="#9d6054"/><path d="M157 211q27-56 99-56 81 0 111 64l21 18q-23 114-130 140-89-10-135-139Z" fill="#ffb67f"/><path d="M133 237q57-4 124 52 66-55 118-52-35 112-118 140-88-28-124-140Z" fill="#fff1d8"/><g fill="none" stroke="#343b53" stroke-width="8"><circle cx="202" cy="242" r="37"/><circle cx="311" cy="242" r="37"/><path d="M239 239q17-14 35 0"/></g><g fill="#33334c"><ellipse cx="203" cy="240" rx="9" ry="14"/><ellipse cx="311" cy="240" rx="9" ry="14"/><path d="M242 289q14-12 29 0 4 10-15 20-18-10-14-20Z"/></g><g fill="white"><circle cx="206" cy="236" r="3"/><circle cx="314" cy="236" r="3"/></g><path d="M234 319q23 23 48 0" fill="none" stroke="#875951" stroke-width="5" stroke-linecap="round"/><path d="M136 361q121 85 240 0" fill="none" stroke="#c6e4df" stroke-width="24" stroke-linecap="round"/><path d="m388 78 8 19 20 4-16 14 1 21-18-12-20 7 6-20-12-17 21-1Z" fill="#ffe193"/></svg>'''
(web / 'icon.svg').write_text(icon)
for size in (192,512):
    cairosvg.svg2png(bytestring=icon.encode(),write_to=str(web / f'icon-{size}.png'),output_width=size,output_height=size)
cairosvg.svg2png(bytestring=icon.encode(),write_to=str(android / 'res/drawable/icon.png'),output_width=192,output_height=192)
(android / 'AndroidManifest.xml').write_text('''<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="ro.lunakeyquest" android:versionCode="1" android:versionName="1.0-review">
  <uses-sdk android:minSdkVersion="26" android:targetSdkVersion="35"/>
  <uses-feature android:name="android.hardware.touchscreen" android:required="false"/>
  <application android:label="Luna KeyQuest" android:icon="@drawable/icon" android:theme="@style/AppTheme" android:allowBackup="false" android:usesCleartextTraffic="false" android:supportsRtl="true" android:enableOnBackInvokedCallback="true">
    <activity android:name=".MainActivity" android:exported="true" android:configChanges="orientation|screenSize|keyboardHidden|keyboard" android:resizeableActivity="true">
      <intent-filter><action android:name="android.intent.action.MAIN"/><category android:name="android.intent.category.LAUNCHER"/></intent-filter>
    </activity>
  </application>
</manifest>
''')
(android / 'res/values/styles.xml').write_text('''<resources><style name="AppTheme" parent="android:style/Theme.Material.NoActionBar"><item name="android:fontFamily">sans</item><item name="android:windowActionModeOverlay">true</item><item name="android:windowLightStatusBar">false</item><item name="android:statusBarColor">#141c38</item><item name="android:navigationBarColor">#141c38</item><item name="android:windowBackground">#141c38</item><item name="android:colorAccent">#ffb077</item></style></resources>''')
(android / 'src/ro/lunakeyquest/MainActivity.java').write_text('''package ro.lunakeyquest;
import android.app.Activity;
import android.os.Bundle;
import android.os.Build;
import android.graphics.Color;
import android.view.WindowManager;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.widget.Toast;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

/** Offline-only wrapper: no JavaScript bridge, file access, or network permission. */
public final class MainActivity extends Activity {
    private WebView web;
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        getWindow().setStatusBarColor(Color.rgb(20,28,56));
        getWindow().setNavigationBarColor(Color.rgb(20,28,56));
        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(20,28,56));
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setBlockNetworkLoads(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setBuiltInZoomControls(false);
        settings.setSupportZoom(false);
        settings.setSafeBrowsingEnabled(true);
        web.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return true;
            }
        });
        web.setWebChromeClient(new WebChromeClient());
        setContentView(web);
        if (Build.VERSION.SDK_INT >= 33) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(0, this::handleBack);
        }
        try (InputStream in = getAssets().open("index.html")) {
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            byte[] data = new byte[8192];
            int count;
            while ((count = in.read(data)) != -1) buffer.write(data, 0, count);
            String html = new String(buffer.toByteArray(), StandardCharsets.UTF_8);
            web.loadDataWithBaseURL("https://appassets.androidplatform.net/", html, "text/html", "UTF-8", null);
        } catch (Exception ex) {
            Toast.makeText(this, "Jocul nu a putut fi deschis. Reinstalează aplicația.", Toast.LENGTH_LONG).show();
            finish();
        }
    }
    private void handleBack() {
        if (web == null) { finish(); return; }
        web.evaluateJavascript("Boolean(window.lunaBack && window.lunaBack())", handled -> {
            if (!"true".equals(handled)) finish();
        });
    }
    @Override public void onBackPressed() { handleBack(); }
    @Override protected void onPause() {
        if (web != null) {
            web.evaluateJavascript("window.lunaPause && window.lunaPause()", null);
            web.onPause();
        }
        super.onPause();
    }
    @Override protected void onResume() {
        super.onResume();
        if (web != null) web.onResume();
    }
    @Override protected void onDestroy() {
        if (web != null) { web.destroy(); web = null; }
        super.onDestroy();
    }
}
''', encoding='utf-8')
(android / 'build.sh').write_text('''#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
: "${ANDROID_HOME:?Set ANDROID_HOME to an installed Android SDK}"
TOOLS="$ANDROID_HOME/build-tools/35.0.0"
PLATFORM="$ANDROID_HOME/platforms/android-35/android.jar"
mkdir -p build/classes build/dex
javac -encoding UTF-8 -source 8 -target 8 -classpath "$PLATFORM" -d build/classes src/ro/lunakeyquest/MainActivity.java
jar cf build/classes.jar -C build/classes .
"$TOOLS/d8" --lib "$PLATFORM" --min-api 26 --output build/dex build/classes.jar
"$TOOLS/aapt" package -f -M AndroidManifest.xml -S res -A assets -I "$PLATFORM" -F build/unsigned.apk
(cd build/dex && zip -q ../unsigned.apk classes.dex)
"$TOOLS/zipalign" -f -p 4 build/unsigned.apk build/aligned.apk
if [ ! -f build/review-signing.jks ]; then
  keytool -genkeypair -keystore build/review-signing.jks -storepass android -keypass android -alias luna-review -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Luna KeyQuest Review,O=Family Review,C=RO" >/dev/null 2>&1
fi
"$TOOLS/apksigner" sign --ks build/review-signing.jks --ks-pass pass:android --key-pass pass:android --out build/Luna-KeyQuest.apk build/aligned.apk
"$TOOLS/apksigner" verify --verbose build/Luna-KeyQuest.apk
"$TOOLS/aapt" dump badging build/Luna-KeyQuest.apk | head -20
''')
(out / 'README.txt').write_text('''LUNA KEYQUEST - REVIEW BUILD
Web: open web/index.html in a current browser. Gameplay, artwork, and sounds are self-contained.
Android: the workflow generates android/build/Luna-KeyQuest.apk. Android 8+ and an up-to-date Android System WebView are required.
The offline Android wrapper requests no Internet, camera, microphone, or storage permissions.
This is a sideloaded review APK, not a Play Store release. Each CI build uses a fresh test signing key; a future review APK may require uninstalling the previous build, which deletes local progress.
Controls: touch the on-screen QWERTY keys or use a physical keyboard. Escape pauses. Android Back pauses or closes dialogs before exiting.
Progress is local and separate in the browser and Android app. No cloud sync.
Offline PWA support depends on the browser and host supporting service workers; the Android APK is self-contained.
The readable HTML/CSS/JavaScript and original vector artwork are in web/index.html. The transport bundle is checksum-verified before reconstruction.
Build: ANDROID_HOME=/path/to/sdk bash android/build.sh
SDK packages: platforms;android-35 and build-tools;35.0.0. Requires a JDK, zip, and keytool.
''')
print('Generated verified source:', out)
print('HTML SHA-256:', bundle['sha256'])
