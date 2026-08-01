import json, re

with open(r"C:\3D DOCUMENTS\TATTOO\reels\reels\subs_work\transcript.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]

HIGHLIGHT = {
    "no", "tatuaje", "3d", "tatué", "quédate", "final",
    "exactamente", "disponible", "dudes", "escribirme", "instagram",
    "filoso", "caos", "realm", "golden", "cat", "desplugas",
}

def clean(w):
    return re.sub(r"[^\wáéíóúñü]", "", w.lower())

def fmt_t(t):
    h = int(t // 3600)
    m = int((t % 3600) // 60)
    s = t % 60
    return f"{h:d}:{m:02d}:{s:05.2f}"

PLAYRES_X, PLAYRES_Y = 1440, 2560
CENTER_Y = 1500

header = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {PLAYRES_X}
PlayResY: {PLAYRES_Y}
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Normal,Arial Black,88,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,7,0,5,60,60,{PLAYRES_Y - CENTER_Y},1
Style: Highlight,Arial Black,130,&H0000E5FF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,9,0,5,60,60,{PLAYRES_Y - CENTER_Y},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

lines = [header]

GAP_MERGE = 0.35  # if next word starts within this, extend end to avoid flicker

for i, w in enumerate(words):
    raw = w["word"]
    start = w["start"]
    end = w["end"]
    if i + 1 < len(words):
        nxt_start = words[i + 1]["start"]
        if nxt_start - end < GAP_MERGE:
            end = nxt_start
        else:
            end = min(end + 0.15, nxt_start)
    else:
        end = end + 0.3

    key = clean(raw)
    is_hl = key in HIGHLIGHT

    if is_hl:
        style = "Highlight"
        text = raw.upper()
        pop = r"{\fad(40,60)\t(0,80,\fscx118\fscy118)\t(80,160,\fscx100\fscy100)}"
    else:
        style = "Normal"
        text = raw
        pop = r"{\fad(30,60)\t(0,60,\fscx108\fscy108)\t(60,140,\fscx100\fscy100)}"

    text = text.rstrip(",.;:")

    lines.append(
        f"Dialogue: 0,{fmt_t(start)},{fmt_t(end)},{style},,0,0,0,,{pop}{text}"
    )

out_path = r"C:\3D DOCUMENTS\TATTOO\reels\reels\subs_work\subs.ass"
with open(out_path, "w", encoding="utf-8-sig") as f:
    f.write("\n".join(lines) + "\n")

print("Written", out_path, "events:", len(words))
