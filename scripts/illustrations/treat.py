"""Turn public-domain artworks into 1-bit dithered, transparent PNGs in the portfolio palette."""
import sys, json
import numpy as np
from PIL import Image, ImageOps, ImageFilter

BAYER = np.array([[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]]) / 16.0

def treat(src, out, crop=None, width=900, pixel=2, mode="ink", color=(0,0,242),
          gamma=1.0, lo=2, hi=98, scan=True, circle=False, blur=0, flatten=0, warm=None):
    rgb = Image.open(src).convert("RGB")
    if crop:  # fractions: left, top, right, bottom
        w, h = rgb.size; rgb = rgb.crop((int(crop[0]*w), int(crop[1]*h), int(crop[2]*w), int(crop[3]*h)))
    small_w = width // pixel
    rgb = rgb.resize((small_w, round(rgb.height * small_w / rgb.width)), Image.LANCZOS)
    im = rgb.convert("L")
    mask = None
    if warm:  # keep only warm (skin-toned) areas: [red-minus-blue low, high]
        c = np.asarray(rgb.filter(ImageFilter.GaussianBlur(1.5)), dtype=np.float32)
        mask = np.clip((c[..., 0] - c[..., 2] - warm[0]) / (warm[1] - warm[0]), 0, 1)
    if blur: im = im.filter(ImageFilter.GaussianBlur(blur))
    a = np.asarray(im, dtype=np.float32) / 255
    if flatten:  # remove soft background light (studio halos) by subtracting a heavy blur
        bg = np.asarray(im.filter(ImageFilter.GaussianBlur(flatten)), dtype=np.float32) / 255
        a = np.clip(a - 0.9 * bg, 0, 1)
    p_lo, p_hi = np.percentile(a, lo), np.percentile(a, hi)
    a = np.clip((a - p_lo) / max(p_hi - p_lo, 1e-3), 0, 1) ** gamma
    v = 1 - a if mode == "ink" else a          # "ink": dark lines become colour; "light": bright areas become colour
    if mask is not None: v = v * mask
    h, w = v.shape
    thr = np.tile(BAYER, (h // 4 + 1, w // 4 + 1))[:h, :w]
    on = v > thr
    if scan: on[2::4, :] &= (v[2::4, :] > 0.82)  # thin scanlines through mid-tones
    if circle:
        yy, xx = np.mgrid[:h, :w]; cy, cx = h / 2, w / 2
        on &= ((yy - cy) ** 2 / (h / 2) ** 2 + (xx - cx) ** 2 / (w / 2) ** 2) <= 1
    rgba = np.zeros((h, w, 4), np.uint8); rgba[on] = (*color, 255)
    img = Image.fromarray(rgba, "RGBA").resize((w * pixel, h * pixel), Image.NEAREST)
    img = img.quantize(colors=2, method=Image.FASTOCTREE)  # tiny palette PNG
    img.save(out, optimize=True)
    return img.size

if __name__ == "__main__":
    for job in json.load(open(sys.argv[1])):
        print(job["out"], treat(**job))
