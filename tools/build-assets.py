import os
from pathlib import Path
from PIL import Image, ImageFilter, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "assets" / "raw"
OUT_DIR = ROOT / "public" / "media"

EXPORT_WEBP_QUALITY = 88
EXPORT_JPEG_QUALITY = 90  # photographic fallback
EXPORT_PNG_OPTIMIZE = True

AVIF_ENABLED = False
try:
    import pillow_avif  # noqa: F401
    AVIF_ENABLED = True
except Exception:
    AVIF_ENABLED = False


def ensure_parent(path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)


def open_rgb(p: Path) -> Image.Image:
    if not p.exists():
        raise FileNotFoundError(f"Missing raw: {p}")
    img = Image.open(p)
    img = ImageOps.exif_transpose(img)  # avoid rotation issues
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")
    if img.mode == "RGBA":
        bg = Image.new("RGB", img.size, (0, 0, 0))
        bg.paste(img, mask=img.split()[-1])
        img = bg
    return img.convert("RGB")


def cover_resize(img: Image.Image, tw: int, th: int) -> Image.Image:
    iw, ih = img.size
    scale = max(tw / iw, th / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    r = img.resize((nw, nh), Image.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return r.crop((left, top, left + tw, top + th))


def contain_resize(img: Image.Image, tw: int, th: int) -> Image.Image:
    iw, ih = img.size
    scale = min(tw / iw, th / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    return img.resize((nw, nh), Image.LANCZOS)


def export_all(img: Image.Image, out_base: Path, fallback="jpg"):
    ensure_parent(out_base.with_suffix(".webp"))

    # Photographic fallback
    if fallback == "jpg":
        img.save(
            out_base.with_suffix(".jpg"),
            "JPEG",
            quality=EXPORT_JPEG_QUALITY,
            optimize=True,
            progressive=True,
        )
    else:
        img.save(out_base.with_suffix(".png"), "PNG", optimize=EXPORT_PNG_OPTIMIZE)

    img.save(out_base.with_suffix(".webp"), "WEBP", quality=EXPORT_WEBP_QUALITY, method=6)

    if AVIF_ENABLED:
        try:
            img.save(out_base.with_suffix(".avif"), "AVIF", quality=45, speed=6)
        except Exception:
            pass


MANIFEST = {
    # HERO
    "A1": {"src": "home/hero-bg-d_A1_.png", "out": "home/hero-bg-d", "size": (3840, 1646), "mode": "cover"},
    "A2": {"src": "home/hero-bg-m_A2_.png", "out": "home/hero-bg-m", "size": (1440, 2560), "mode": "cover"},

    # PANELS (Estado)
    "B1": {"src": "home/panel-estado-d_B1_.jpeg", "out": "home/panel-estado-d", "size": (2560, 1440), "mode": "cover"},
    "B2": {"src": "home/panel-estado-m_B2_.jpeg", "out": "home/panel-estado-m", "size": (1440, 2560), "mode": "cover"},

    # PANELS (Empresas)
    "B3": {"src": "home/panel-empresas-d_B3_.jpeg", "out": "home/panel-empresas-d", "size": (2560, 1440), "mode": "cover"},
    "B4": {"src": "home/panel-empresas-m_B4_.png",  "out": "home/panel-empresas-m", "size": (1440, 2560), "mode": "cover"},

    # PANELS (Sanitarios)
    "B5": {"src": "home/panel-sanitarios-d_B5_.png", "out": "home/panel-sanitarios-d", "size": (2560, 1440), "mode": "cover"},
    "B6": {"src": "home/panel-sanitarios-m_B6_.png", "out": "home/panel-sanitarios-m", "size": (1440, 2560), "mode": "cover"},

    # PANELS (Ejecutivo)
    "B7": {"src": "home/panel-ejecutivo-d_B7_.png", "out": "home/panel-ejecutivo-d", "size": (2560, 1440), "mode": "cover"},
    "B8": {"src": "home/panel-ejecutivo-m_B8_.png", "out": "home/panel-ejecutivo-m", "size": (1440, 2560), "mode": "cover"},

    # SERVICE SECONDARY IMAGES (2560x1440)
    "C1": {"src": "services/estado/secondary_C1_.png", "out": "services/estado/secondary", "size": (2560, 1440), "mode": "cover"},
    "C2": {"src": "services/empresas/secondary_C2_.png", "out": "services/empresas/secondary", "size": (2560, 1440), "mode": "cover"},
    "C3": {"src": "services/sanitarios/secondary_C3_.png", "out": "services/sanitarios/secondary", "size": (2560, 1440), "mode": "cover"},
    "C4": {"src": "services/ejecutivo/secondary_C4_.png", "out": "services/ejecutivo/secondary", "size": (2560, 1440), "mode": "cover"},

    # FLEET (square)
    "E1": {"src": "fleet/Atr42.jpeg",      "out": "fleet/atr42",      "size": (1200, 1200), "mode": "cover"},
    "E2": {"src": "fleet/Kingair200.png",  "out": "fleet/kingair200", "size": (1200, 1200), "mode": "cover"},
    "E3": {"src": "fleet/learjet50.png",   "out": "fleet/learjet50",  "size": (1200, 1200), "mode": "cover"},
    "E4": {"src": "fleet/citation.png",    "out": "fleet/citationv",  "size": (1200, 1200), "mode": "cover"},

    # VERTICALS (turismo hero)
    "V1": {"src": "verticals/turismo/hero-d.png", "out": "verticals/turismo/hero-d", "size": (2560, 1440), "mode": "cover"},
}


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    ok = 0
    for id_, spec in MANIFEST.items():
        out_base = OUT_DIR / spec["out"]
        tw, th = spec["size"]

        try:
            src_path = RAW_DIR / spec["src"]
            src = open_rgb(src_path)

            if spec["mode"] == "cover":
                out = cover_resize(src, tw, th)
            else:
                raise ValueError(f"Unknown mode: {spec['mode']}")

            export_all(out, out_base, fallback="jpg")
            ok += 1
            print(f"OK — {id_} -> {out_base} ({tw}x{th})")

        except Exception as e:
            print(f"FAIL — {id_}: {e}")

    print(f"\nDone: {ok}/{len(MANIFEST)} processed.")
    if AVIF_ENABLED:
        print("AVIF generation: ENABLED")
    else:
        print("AVIF generation: DISABLED (install pillow-avif for AVIF support)")


if __name__ == "__main__":
    main()
