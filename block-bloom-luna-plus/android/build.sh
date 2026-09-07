#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
# Exact SDK/build-tool generation and packaging order used by Luna KeyQuest.
TOOLS="${BLOOM_SDK35:-../sdk35}"
TOOLS="$(cd "$TOOLS" && pwd)"
PLATFORM="$TOOLS/android.jar"
KEY="${BLOOM_KEYSTORE:-../private/luna-plus.p12}"
PASS_FILE="${BLOOM_PASS_FILE:-../private/keystore-password.txt}"
mkdir -p build/classes build/dex
javac -encoding UTF-8 -source 8 -target 8 -classpath "$PLATFORM" -d build/classes src/ro/blockbloom/lunaplus/MainActivity.java
jar cf build/classes.jar -C build/classes .
java -cp "$TOOLS/lib/d8.jar" com.android.tools.r8.D8 --lib "$PLATFORM" --min-api 26 --output build/dex build/classes.jar
"$TOOLS/aapt" package -f -M AndroidManifest.xml -S res -A assets -I "$PLATFORM" -F build/unsigned.apk
(cd build/dex && zip -q ../unsigned.apk classes.dex)
"$TOOLS/zipalign" -f -p 4 build/unsigned.apk build/aligned.apk
java -jar "$TOOLS/lib/apksigner.jar" sign --ks "$KEY" --ks-key-alias bloom-luna-plus --ks-pass "file:$PASS_FILE" --out ../release/Block-Bloom-Luna-Plus-2.0.apk build/aligned.apk
java -jar "$TOOLS/lib/apksigner.jar" verify --verbose --print-certs ../release/Block-Bloom-Luna-Plus-2.0.apk > ../release/signature.txt
"$TOOLS/zipalign" -c -v 4 ../release/Block-Bloom-Luna-Plus-2.0.apk > ../release/alignment.txt
"$TOOLS/aapt" dump badging ../release/Block-Bloom-Luna-Plus-2.0.apk > ../release/manifest.txt
