"""Optimize only visually reviewed photos in the second friend-list batch."""

import json
from datetime import date
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PROGRESS = ROOT / "catalog/intake/friend-second100-progress.json"
MANIFEST = ROOT / "catalog/photos.json"
SOURCE = ROOT / "catalog/intake/photos"
TARGET = ROOT / "public/photos"

progress = json.loads(PROGRESS.read_text(encoding="utf-8"))
manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
prepared = []
for item in progress["items"]:
    dish_id = item["id"]
    source = SOURCE / f"{dish_id}.png"
    if not source.is_file():
        continue
    if all((TARGET / f"{dish_id}-{size}.webp").is_file() for size in (600, 1200)) and manifest.get(dish_id, {}).get("status") == "reviewed":
        continue
    if "reviewed-photo" not in item["status"] and "photo-ready" not in item["status"]:
        raise RuntimeError(f"Photo exists without visual-review status: {dish_id}")
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        source_width, source_height = image.size
        if source_width < 900 or source_height < 600:
            raise RuntimeError(f"Image too small: {dish_id}")
        dimensions = {}
        for size, quality in ((1200, 88), (600, 84)):
            target = TARGET / f"{dish_id}-{size}.webp"
            if target.exists():
                raise RuntimeError(f"Refusing to overwrite existing photo: {target}")
            resized = image.copy()
            resized.thumbnail((size, size), Image.Resampling.LANCZOS)
            resized.save(target, "WEBP", quality=quality, method=6)
            dimensions[size] = resized.size
    manifest[dish_id] = {
        "name": item["name"],
        "src": f"/photos/{dish_id}-1200.webp",
        "small": f"/photos/{dish_id}-600.webp",
        "width": dimensions[1200][0],
        "height": dimensions[1200][1],
        "alt": f"{item['name']} served ready to eat",
        "kind": "generated",
        "title": item["name"],
        "author": "OpenAI image generation",
        "changes": "AI-generated realistic dish photo, visually reviewed, resized and converted to WebP.",
        "status": "reviewed",
        "sourceWidth": source_width,
        "sourceHeight": source_height,
        "reviewedAt": date.today().isoformat(),
    }
    prepared.append(dish_id)

MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Prepared {len(prepared)} reviewed second-batch photos: {', '.join(prepared)}")
