from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1440, 2560
img = Image.open("frame_bg.png").convert("RGB").resize((W, H))
# darken a bit for text contrast
overlay = Image.new("RGB", (W, H), (0, 0, 0))
img = Image.blend(img, overlay, 0.28)
draw = ImageDraw.Draw(img)

FONT_PATH = r"C:\Windows\Fonts\ariblk.ttf"

def font(size):
    return ImageFont.truetype(FONT_PATH, size)

def draw_stroke_text(draw, pos, text, fnt, fill, stroke_fill=(0, 0, 0), stroke_width=10, anchor="mm"):
    x, y = pos
    draw.text((x, y), text, font=fnt, fill=fill, stroke_width=stroke_width,
               stroke_fill=stroke_fill, anchor=anchor)

CENTER_X, CENTER_Y = 720, 1500

# soft drop shadow pass (cheap glow) by drawing text slightly offset darker first is already covered by stroke.

# Row 1: lead-in, small, muted lime-white, upper-left offset
draw_stroke_text(draw, (CENTER_X - 200, CENTER_Y - 260), "Es el", font(70),
                  fill=(210, 255, 140), stroke_width=9, anchor="mm")

# Row 2: highlighted phrase, huge, hot pink, centered but slightly right, tiny rotation via separate layer
big_font = font(155)
txt = "MODELO 3D"
# render on transparent layer to allow rotation (generous canvas so stroke+rotation never clip)
tmp = Image.new("RGBA", (1300, 420), (0, 0, 0, 0))
tdraw = ImageDraw.Draw(tmp)
tdraw.text((650, 210), txt, font=big_font, fill=(255, 33, 110), stroke_width=14,
           stroke_fill=(0, 0, 0), anchor="mm")
tmp = tmp.rotate(-3, resample=Image.BICUBIC, expand=True)
paste_x = int(CENTER_X + 20 - tmp.width / 2)
paste_y = int(CENTER_Y - tmp.height / 2)
# clamp so it never overflows canvas edges
paste_x = max(10, min(paste_x, W - tmp.width - 10))
img.paste(tmp, (paste_x, paste_y), tmp)

# Row 3: trail, small, lime-white, lower-right offset
draw_stroke_text(draw, (CENTER_X + 220, CENTER_Y + 250), "de un diseño", font(66),
                  fill=(210, 255, 140), stroke_width=9, anchor="mm")

# safe-zone guides (subtle) to show TikTok/IG UI clearance -- optional, comment out for clean export
# top ui ~ 220px, bottom ui ~ 520px, right icon column ~ 220px
guide = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(guide)
gdraw.rectangle([0, 0, W, 220], fill=(255, 0, 0, 40))
gdraw.rectangle([0, H - 520, W, H], fill=(255, 0, 0, 40))
gdraw.rectangle([W - 220, 220, W, H - 520], fill=(255, 0, 0, 40))
img_guides = Image.alpha_composite(img.convert("RGBA"), guide).convert("RGB")

img.save("mockup_composition_clean.png")
img_guides.save("mockup_composition_with_safezones.png")
print("done")
