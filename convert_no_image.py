from pathlib import Path
import re

path = Path("index.html")
html = path.read_text(encoding="utf-8")

replacements = {
    "assets/images/logo/logo.png": "ITI",
    "assets/images/hero/hero-main.png": "ITI",
    "assets/images/company/company1.jpg": "IT",
    "assets/images/services/services-banner.jpg": "AI",
    "assets/images/portfolio/project1.jpg": "ERP",
    "assets/images/portfolio/project2.jpg": "WEB",
    "assets/images/portfolio/project3.jpg": "APP",
    "assets/images/portfolio/project4.jpg": "AI",
    "assets/images/client/client1.png": "01",
    "assets/images/client/client2.png": "02",
    "assets/images/client/client3.png": "03",
    "assets/images/client/client4.png": "04",
    "assets/images/client/client5.png": "05",
    "assets/images/client/client6.png": "06",
    "assets/images/client/client7.png": "07",
    "assets/images/client/client8.png": "08",
}

for src, text in replacements.items():
    pattern = rf'<img\b[^>]*src=["\']{re.escape(src)}["\'][^>]*>'
    replacement = (
        f'<div class="iti-letter-visual" '
        f'role="img" aria-label="{text} visual">'
        f'<span>{text}</span></div>'
    )
    html = re.sub(pattern, replacement, html, flags=re.IGNORECASE)

style = """
<style id="iti-no-image-style">
/* =========================================
   ITI LETTER-BASED VISUAL SYSTEM
   No external images required
   ========================================= */

.iti-letter-visual {
    position: relative;
    width: 100%;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    isolation: isolate;
    background:
        radial-gradient(
            circle at 75% 25%,
            rgba(220, 38, 38, 0.22),
            transparent 34%
        ),
        linear-gradient(
            135deg,
            #090909 0%,
            #171717 55%,
            #250707 100%
        );
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
}

.iti-letter-visual::before {
    content: "";
    position: absolute;
    width: 60%;
    aspect-ratio: 1;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    transform: translate(40%, -35%);
}

.iti-letter-visual::after {
    content: "INVESTMENT TECHNOLOGY INDONESIA";
    position: absolute;
    left: 24px;
    bottom: 18px;
    color: rgba(255, 255, 255, 0.38);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
}

.iti-letter-visual > span {
    position: relative;
    z-index: 2;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(4rem, 11vw, 9rem);
    font-weight: 900;
    line-height: 0.8;
    letter-spacing: -0.12em;
    text-transform: uppercase;
    transform: skew(-8deg);
    text-shadow:
        8px 8px 0 rgba(220, 38, 38, 0.55),
        16px 16px 40px rgba(0, 0, 0, 0.45);
}

/* Logo replacements */
header .iti-letter-visual,
nav .iti-letter-visual,
footer .iti-letter-visual {
    width: 52px;
    min-width: 52px;
    height: 52px;
    min-height: 52px;
    border-radius: 12px;
}

header .iti-letter-visual::after,
nav .iti-letter-visual::after,
footer .iti-letter-visual::after {
    display: none;
}

header .iti-letter-visual > span,
nav .iti-letter-visual > span,
footer .iti-letter-visual > span {
    font-size: 21px;
    letter-spacing: -0.15em;
    text-shadow: 3px 3px 0 rgba(220, 38, 38, 0.75);
}

/* Client letter marks */
.iti-letter-visual:has(> span:first-child:last-child) {
    transition:
        transform 0.25s ease,
        border-color 0.25s ease;
}

.iti-letter-visual:hover {
    transform: translateY(-4px);
    border-color: rgba(220, 38, 38, 0.55);
}

@media (max-width: 768px) {
    .iti-letter-visual {
        min-height: 180px;
        border-radius: 18px;
    }

    .iti-letter-visual::after {
        left: 16px;
        bottom: 14px;
        font-size: 8px;
    }
}
</style>
"""

if 'id="iti-no-image-style"' not in html:
    html = html.replace("</head>", style + "\n</head>", 1)

path.write_text(html, encoding="utf-8")

print("Selesai: semua image utama telah diganti dengan visual huruf.")
