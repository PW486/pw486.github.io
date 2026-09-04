#!/usr/bin/env python3
"""Convert travel gallery originals to WebP for public/images/.

Usage:
    python3 scripts/convert-images.py <src-dir> [--width 1000] [--quality 80] [--out public/images]

Reads JPEG/JPG/HEIC originals from <src-dir> and writes `<name>.webp` files
to the output dir (default: public/images/). Each image is resized to the
target width (downscale only, aspect ratio preserved), metadata (EXIF/GPS)
is stripped, and files are saved with quality=80, method=6.

Requires: Pillow (and pillow-heif for .heic files).
    pip install Pillow pillow-heif
"""

import argparse
import sys
from pathlib import Path

from PIL import Image
from PIL.ImageOps import exif_transpose

SRC_EXTS = {".jpg", ".jpeg", ".heic"}


def convert(src_dir: Path, out_dir: Path, width: int, quality: int) -> list[tuple[str, str]]:
    try:
        from pillow_heif import register_heif_opener

        register_heif_opener()
    except ImportError:
        pass  # Pillow alone handles JPEG; .heic files will fail with a hint below

    out_dir.mkdir(parents=True, exist_ok=True)
    done: list[tuple[str, str]] = []
    for f in sorted(src_dir.iterdir()):
        if f.name.startswith(".") or not f.is_file():
            continue
        if f.suffix.lower() not in SRC_EXTS:
            print(f"SKIP {f.name} (unsupported extension)")
            continue
        out = out_dir / (f.stem + ".webp")
        try:
            im = Image.open(f)
        except Exception as e:
            if f.suffix.lower() == ".heic":
                sys.exit("ERROR: cannot read .heic — install pillow-heif (`pip install pillow-heif`).")
            print(f"FAIL {f.name}: {e}")
            continue
        im = exif_transpose(im)
        w, h = im.size
        if w > width:
            im = im.resize((width, round(h * width / w)), Image.LANCZOS)
        if im.mode != "RGB":
            im = im.convert("RGB")
        # no exif/icc_profile passed -> metadata stripped
        im.save(out, "WEBP", quality=quality, method=6)
        done.append((f.name, f"{w}x{h} -> {im.size[0]}x{im.size[1]} {out.stat().st_size // 1024}KB"))
        print(f"{f.name} {w}x{h} -> {out.name} {im.size[0]}x{im.size[1]} {out.stat().st_size // 1024}KB")
    return done


def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent
    parser = argparse.ArgumentParser(description="Convert travel originals to WebP (width 1000px).")
    parser.add_argument("src_dir", help="folder with original JPEG/HEIC files")
    parser.add_argument("--width", type=int, default=1000, help="target width in px (downscale only)")
    parser.add_argument("--quality", type=int, default=80, help="webp quality")
    parser.add_argument("--out", default="public/images", help="output dir, relative to repo root")
    args = parser.parse_args()

    src_dir = Path(args.src_dir).expanduser()
    if not src_dir.is_dir():
        sys.exit(f"ERROR: not a directory: {src_dir}")
    out_dir = repo_root / args.out if not Path(args.out).is_absolute() else Path(args.out)

    done = convert(src_dir, out_dir, args.width, args.quality)
    print(f"\ndone: {len(done)} files -> {out_dir}")
    print("next: point journey.json gallery entries at the new .webp files, then `npm run build`.")


if __name__ == "__main__":
    main()
