#!/usr/bin/env python3
"""Shrink the profile-link logos in img/ to the size they are actually shown at.

The badges render at 36x36 CSS px (object-fit: contain), so 72px on the long
edge is enough even on a 2x display. Source logos are often 10-50x larger than
that, which is most of the page's weight.

Run after adding a new badge image:

    python tools/optimize-images.py            # report only
    python tools/optimize-images.py --write    # actually rewrite the files

Files already at or below the target are left untouched, so re-running is safe
and does not re-compress anything.

The avatar (img/avatar.webp + img/avatar.jpg) and the full-size
img/Photograph.jpeg used as the og:image are not handled here; see README.
"""

import argparse
import os
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("build: Pillow is required (pip install pillow)")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "img")
BADGE_MAX = 72
# Not badges: the avatar sources, the social-preview image and the app icons.
SKIP = {"Photograph.jpeg", "avatar.jpg", "avatar.webp",
        "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"}


def save_png(im, path):
    """Write the smaller of a plain RGBA PNG and a palette-quantised one."""
    im.save(path, "PNG", optimize=True)
    plain = os.path.getsize(path)
    tmp = path + ".q"
    try:
        im.quantize(colors=256, method=Image.Quantize.FASTOCTREE).save(tmp, "PNG", optimize=True)
        if os.path.getsize(tmp) < plain:
            os.replace(tmp, path)
        else:
            os.remove(tmp)
    except Exception:
        if os.path.exists(tmp):
            os.remove(tmp)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true", help="rewrite the files instead of reporting")
    args = ap.parse_args()

    saved = 0
    for name in sorted(os.listdir(IMG)):
        path = os.path.join(IMG, name)
        if name in SKIP or name.lower().endswith(".svg") or not os.path.isfile(path):
            continue
        try:
            im = Image.open(path)
        except Exception:
            continue
        w, h = im.size
        if max(w, h) <= BADGE_MAX:
            continue

        before = os.path.getsize(path)
        scale = BADGE_MAX / max(w, h)
        size = (max(1, round(w * scale)), max(1, round(h * scale)))
        if not args.write:
            print("%-46s %dx%d -> %dx%d  (%.1f KB)" % (name[:46], w, h, size[0], size[1], before / 1024))
            continue

        is_png = name.lower().endswith(".png")
        out = im.convert("RGBA" if is_png else "RGB").resize(size, Image.LANCZOS)
        if is_png:
            save_png(out, path)
        else:
            out.save(path, "JPEG", quality=88, optimize=True, progressive=True)
        after = os.path.getsize(path)
        saved += before - after
        print("%-46s %dx%d -> %dx%d  %.1f KB -> %.1f KB" % (
            name[:46], w, h, size[0], size[1], before / 1024, after / 1024))

    if args.write:
        print("saved %.1f KB" % (saved / 1024.0))
    else:
        print("(nothing written; pass --write)")


if __name__ == "__main__":
    main()
