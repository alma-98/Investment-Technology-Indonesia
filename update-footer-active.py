from pathlib import Path
import re

pages = [
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

<p>
© 2026 StudioIT. All rights reserved.
</p>

</div>
</footer>
"""

for file in pages:
    p = Path(file)

    if not p.exists():
        continue

    html = p.read_text()

    html = re.sub(
        r'<footer[\s\S]*?</footer>',
        '',
        html,
        flags=re.I
    )

    html = html.replace(
        '</body>',
        footer + '\n</body>'
    )

    p.write_text(html)

    print("updated", file)

