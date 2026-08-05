# -*- coding: utf-8 -*-
import re

PLAYRES_X, PLAYRES_Y = 1440, 2560
CENTER_X, CENTER_Y = 720, 1500

PINK = "&H00782DFF"   # BGR: hot pink FF2D78
YELLOW = "&H0000C4FF"  # BGR: golden yellow FFC400
LIME = "&H003CFFC8"    # BGR: lime C8FF3C (lead/trail)

def fmt_t(t):
    h = int(t // 3600)
    m = int((t % 3600) // 60)
    s = t % 60
    return f"{h:d}:{m:02d}:{s:05.2f}"

# card = dict(start, end, lead=None, highlight=None, color=None)
cards = [
    dict(start=0.00, end=0.76, lead="Esto no es"),
    dict(start=0.76, end=1.50, highlight="UN TATUAJE", color=PINK),
    dict(start=1.50, end=1.80, lead="es el"),
    dict(start=1.80, end=2.44, highlight="MODELO 3D", color=YELLOW),
    dict(start=2.44, end=3.06, lead="de un diseño que"),
    dict(start=3.06, end=3.42, highlight="TATUÉ", color=YELLOW),
    dict(start=3.42, end=3.82, lead="hace poco"),
    dict(start=3.82, end=4.42, lead="y si quieres ver"),
    dict(start=4.42, end=5.12, lead="cómo quedó en piel"),
    dict(start=5.12, end=5.56, highlight="QUÉDATE", color=PINK),
    dict(start=5.56, end=6.40, lead="hasta el final del vídeo"),
    dict(start=6.50, end=6.84, lead="Lo bueno del"),
    dict(start=6.84, end=7.24, highlight="3D", color=YELLOW),
    dict(start=7.24, end=8.56, lead="es que he decidido exactamente"),
    dict(start=8.56, end=9.44, lead="la iluminación y el ángulo"),
    dict(start=9.44, end=9.90, lead="que quiero"),
    dict(start=9.90, end=11.12, lead="y así con el mismo modelo"),
    dict(start=11.12, end=11.62, lead="puedo sacar"),
    dict(start=11.62, end=12.46, highlight="DISEÑOS DISTINTOS", color=YELLOW),
    dict(start=12.46, end=13.46, lead="y este aún está"),
    dict(start=13.46, end=14.02, highlight="DISPONIBLE", color=PINK),
    dict(start=14.02, end=15.04, lead="así que si te interés"),
    dict(start=15.04, end=15.92, lead="o tienes otra idea de"),
    dict(start=15.92, end=16.34, highlight="TATUAMIENTO", color=YELLOW),
    dict(start=16.34, end=17.14, lead="no dudes en"),
    dict(start=17.14, end=17.56, highlight="ESCRIBIRME", color=PINK),
    dict(start=17.56, end=18.04, lead="por", highlight="INSTAGRAM", color=PINK),
    dict(start=18.04, end=19.22, lead="y este sería el resultado"),
    dict(start=19.22, end=19.72, highlight="FILOSO", color=YELLOW),
    dict(start=19.72, end=20.36, lead="y", highlight="CAOS REALM", color=YELLOW),
    dict(start=20.36, end=21.40, lead="y me puedes encontrar en el"),
    dict(start=21.40, end=22.54, highlight="GOLDEN CAT DESPLUGAS", color=PINK),
]

header = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {PLAYRES_X}
PlayResY: {PLAYRES_Y}
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Lead,Arial Black,88,{LIME},&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,8,0,5,60,60,60,1
Style: Highlight,Arial Black,150,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,10,0,5,60,60,60,1
Style: Plain,Arial Black,92,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,8,0,5,60,60,60,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

lines = [header]

for c in cards:
    start, end = c["start"], c["end"]
    lead = c.get("lead")
    hl = c.get("highlight")
    color = c.get("color")

    if hl and not lead:
        # highlight-only card, single centered big row
        pop = r"{\fad(40,70)\t(0,90,\fscx122\fscy122)\t(90,180,\fscx100\fscy100)}"
        override = r"{\pos(%d,%d)\c%s}" % (CENTER_X, CENTER_Y, color)
        lines.append(f"Dialogue: 0,{fmt_t(start)},{fmt_t(end)},Highlight,,0,0,0,,{override}{pop}{hl}")
    elif hl and lead:
        # lead (small, above) + highlight (big, center) two rows
        pop_lead = r"{\fad(30,60)\t(0,60,\fscx108\fscy108)\t(60,140,\fscx100\fscy100)}"
        pop_hl = r"{\fad(40,70)\t(0,90,\fscx122\fscy122)\t(90,180,\fscx100\fscy100)}"
        lead_pos = r"{\pos(%d,%d)}" % (CENTER_X - 180, CENTER_Y - 230)
        hl_pos = r"{\pos(%d,%d)\c%s}" % (CENTER_X + 20, CENTER_Y + 40, color)
        lines.append(f"Dialogue: 0,{fmt_t(start)},{fmt_t(end)},Lead,,0,0,0,,{lead_pos}{pop_lead}{lead}")
        lines.append(f"Dialogue: 1,{fmt_t(start)},{fmt_t(end)},Highlight,,0,0,0,,{hl_pos}{pop_hl}{hl}")
    else:
        # plain phrase card, single centered medium row
        pop = r"{\fad(30,60)\t(0,60,\fscx106\fscy106)\t(60,140,\fscx100\fscy100)}"
        pos = r"{\pos(%d,%d)}" % (CENTER_X, CENTER_Y)
        lines.append(f"Dialogue: 0,{fmt_t(start)},{fmt_t(end)},Plain,,0,0,0,,{pos}{pop}{lead}")

out_path = r"C:\3D DOCUMENTS\TATTOO\AI_REEL_EDITOR\VIDEO_REELS\subs_work\subs_final.ass"
with open(out_path, "w", encoding="utf-8-sig") as f:
    f.write("\n".join(lines) + "\n")

print("cards:", len(cards), "highlighted:", sum(1 for c in cards if c.get("highlight")))
print("written", out_path)
