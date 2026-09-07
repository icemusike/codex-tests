#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
TOOLS="$(cd ../sdk35 && pwd)";PLATFORM="$TOOLS/android.jar"
mkdir -p build/testclasses build/testdex tests/assets
cp ../solutions.json tests/assets/
javac -encoding UTF-8 -source 8 -target 8 -classpath "$PLATFORM" -d build/testclasses tests/UpdateTests.java
jar cf build/testclasses.jar -C build/testclasses .
java -cp "$TOOLS/lib/d8.jar" com.android.tools.r8.D8 --lib "$PLATFORM" --min-api 26 --output build/testdex build/testclasses.jar
"$TOOLS/aapt" package -f -M tests/AndroidManifest.xml -A tests/assets -I "$PLATFORM" -F build/testunsigned.apk
(cd build/testdex && zip -q ../testunsigned.apk classes.dex)
"$TOOLS/zipalign" -f -p 4 build/testunsigned.apk build/testaligned.apk
java -jar "$TOOLS/lib/apksigner.jar" sign --ks ../private/luna-plus.p12 --ks-key-alias bloom-luna-plus --ks-pass file:../private/keystore-password.txt --out ../release/Block-Bloom-Luna-Plus-Tests.apk build/testaligned.apk
