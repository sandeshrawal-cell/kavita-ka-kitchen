"""Publish visually reviewed intake photographs at the site's two standard sizes."""

import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
intake_path = ROOT / "catalog/intake/friend-dishes.json"
photos_path = ROOT / "catalog/photos.json"
source_dir = ROOT / "catalog/intake/photos"
target_dir = ROOT / "public/photos"
target_dir.mkdir(parents=True, exist_ok=True)

intake = json.loads(intake_path.read_text(encoding="utf-8"))
manifest = json.loads(photos_path.read_text(encoding="utf-8"))
for candidate in intake["candidates"][:100]:
    dish_id = candidate["id"]
    source = source_dir / f"{dish_id}.png"
    if not source.is_file():
        raise RuntimeError(f"Missing reviewed image: {dish_id}")
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        source_width, source_height = image.size
        if source_width < 900 or source_height < 600:
            raise RuntimeError(f"Image too small: {dish_id}")
        dimensions = {}
        for size, quality in ((1200, 88), (600, 84)):
            resized = image.copy()
            resized.thumbnail((size, size), Image.Resampling.LANCZOS)
            resized.save(target_dir / f"{dish_id}-{size}.webp", "WEBP", quality=quality, method=6)
            dimensions[size] = resized.size
    manifest[dish_id] = {
        "name": candidate["name"],
        "src": f"/photos/{dish_id}-1200.webp",
        "small": f"/photos/{dish_id}-600.webp",
        "width": dimensions[1200][0],
        "height": dimensions[1200][1],
        "alt": f"{candidate['name']} served ready to eat",
        "kind": "generated",
        "title": candidate["name"],
        "author": "OpenAI image generation",
        "changes": "AI-generated dish image, visually reviewed, resized and converted to WebP.",
        "status": "reviewed",
        "sourceWidth": source_width,
        "sourceHeight": source_height,
        "reviewedAt": "2026-09-27",
    }

photos_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Prepared {len(intake['candidates'][:100])} reviewed photos")
