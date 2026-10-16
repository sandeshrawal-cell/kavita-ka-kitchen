"""Build contact sheets for manual fifth-batch photo review."""

import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ITEMS = json.loads((ROOT / "catalog/intake/friend-popular200-progress.json").read_text(encoding="utf-8"))["items"]
SOURCE = ROOT / "catalog/intake/photos"
OUTPUT = ROOT / "catalog/intake/photo-review-popular200"
OUTPUT.mkdir(exist_ok=True)

font = ImageFont.truetype("arial.ttf", 16)
for page in range(8):
    items = ITEMS[page * 25 : (page + 1) * 25]
    sheet = Image.new("RGB", (5 * 256, 5 * 284), "#f5f2ec")
    draw = ImageDraw.Draw(sheet)
    for index, item in enumerate(items):
        source = SOURCE / f"{item['id']}.png"
        col, row = index % 5, index // 5
        x, y = col * 256 + 8, row * 284 + 8
        if source.exists():
            with Image.open(source) as image:
                tile = ImageOps.fit(image.convert("RGB"), (240, 240))
                sheet.paste(tile, (x, y))
        else:
            draw.rectangle((x, y, x + 239, y + 239), fill="#dddddd")
        draw.text((x, y + 245), f"{page * 25 + index + 1}. {item['name'][:24]}", fill="#172920", font=font)
    path = OUTPUT / f"contact-{page + 1}.jpg"
    sheet.save(path, quality=88)
    print(path)
