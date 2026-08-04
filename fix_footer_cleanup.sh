#!/bin/bash

set -e

echo "=== FOOTER CLEANUP ACTIVE PAGES ==="

PAGES=(
index.html
about.html
services.html
portfolio.html
contact.html
founder.html
blog.html
faq.html
investment.html
privacy.html
terms.html
404.html
)

python3 <<'PY'
from pathlib import Path
import re

pages=[
"index.html",
"about.html",
"services.html",
"portfolio.html",
"contact.html",
"founder.html",
"blog.html",
"faq.html",
"investment.html",
"privacy.html",
"terms.html",
"404.html"
]

footer = """
<footer class="site-footer">

<div class="footer-content">

<h3>Transformasi Digital Untuk Indonesia Maju</h3>

<p>
Powered By Investment Technology Indonesia
</p>

<p>
SMS +6285283397198<br>
Email alma.budsteddy88@gmail.com
</p>

<p class="footer-copy">
© 2026 StudioIT. All rights reserved.
</p>

</div>

</footer>
"""

for file in pages:

    p=Path(file)

    if not p.exists():
        continue

    html=p.read_text()

    # hapus semua footer lama
    html=re.sub(
        r'<footer[\s\S]*?</footer>',
        '',
        html,
        flags=re.I
    )

    # hapus teks lama
    html=re.sub(
        r'Designed\s*&\s*Developed\s*by[\s\S]*?</div>',
        '',
        html,
        flags=re.I
    )

    # masukkan satu footer sebelum body
    html=html.replace(
        "</body>",
        footer+"\n</body>"
    )

    p.write_text(html)

    print("fixed",file)

PY


echo "=== CLEAN DUPLICATE FOOTER CSS ==="

cat > assets/css/footer.css <<'CSS'
.site-footer{
    width:100%;
    background:#050505;
    color:white;
    padding:60px 20px 30px;
    text-align:center;
    box-sizing:border-box;
}

.footer-content{
    max-width:900px;
    margin:auto;
}

.footer-content h3{
    font-size:32px;
    font-weight:700;
    margin-bottom:20px;
}

.footer-content p{
    font-size:16px;
    line-height:1.8;
    margin:10px 0;
}

.footer-copy{
    opacity:.7;
    margin-top:25px;
}


@media(max-width:768px){

.site-footer{
    padding:40px 15px 25px;
}

.footer-content h3{
    font-size:22px;
}

.footer-content p{
    font-size:14px;
}

}
CSS


echo "=== CHECK FOOTER COUNT ==="

for page in "${PAGES[@]}"
do
echo "$page : $(grep -ic '<footer' $page)"
done


echo "=== GIT PUSH ==="

git add index.html about.html services.html portfolio.html contact.html founder.html blog.html faq.html investment.html privacy.html terms.html 404.html assets/css/footer.css

git commit -m "Fix duplicate footer and responsive footer design" || true

git push origin main


echo "=== FIREBASE DEPLOY ==="

firebase deploy --project investment-tech-indonesia --only hosting


echo "=== DONE ==="
