#!/bin/bash
set -e

PHONE="+6285283397198"
BACKUP="backup_sms_$(date +%Y%m%d_%H%M%S)"

echo "== Backup =="
mkdir -p "$BACKUP"

find . \
-not -path "./.git/*" \
-not -path "./node_modules/*" \
-not -path "./dist/*" \
-type f \
\( \
-name "*.html" -o \
-name "*.css" -o \
-name "*.js" -o \
-name "*.json" \
\) | while read f
do
mkdir -p "$BACKUP/$(dirname "$f")"
cp "$f" "$BACKUP/$f"
done

echo "== Replace wa.me =="

find . \
-not -path "./.git/*" \
-not -path "./node_modules/*" \
-not -path "./dist/*" \
-type f \
\( \
-name "*.html" -o \
-name "*.css" -o \
-name "*.js" -o \
-name "*.json" \
\) \
-print0 | while IFS= read -r -d '' file
do

perl -0777 -i -pe '
s#https://wa\.me/\d+\?text=[^"\x27 <]*#sms:+6285283397198#g;
s#https://wa\.me/\d+#sms:+6285283397198#g;
s#https://api\.whatsapp\.com/send\?phone=\d+&text=[^"\x27 <]*#sms:+6285283397198#g;

s/Chat WhatsApp/Kirim SMS/g;
s/Contact via WhatsApp/Contact via SMS/g;
s/Via WhatsApp/Via SMS/g;
s/WhatsApp Business/SMS/g;
s/WhatsApp/SMS/g;

s/fa-whatsapp/fa-comment-sms/g;
s/fa-brands fa-whatsapp/fa-solid fa-comment-sms/g;
' "$file"

done

echo "== Search Remaining =="

grep -RniE \
"wa\.me|api\.whatsapp|WhatsApp" \
. \
--exclude-dir=node_modules \
--exclude-dir=.git \
--exclude-dir=dist || true

echo "== Git =="

git add .

git commit -m "Replace WhatsApp with SMS" || true

git push origin main

echo "== Firebase =="

firebase deploy

echo
echo "DONE."
