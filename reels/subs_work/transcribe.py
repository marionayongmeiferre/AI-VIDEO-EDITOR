import json
from faster_whisper import WhisperModel

video = r"C:\3D DOCUMENTS\TATTOO\reels\reels\REEL_3D.mp4"
model = WhisperModel("small", device="cpu", compute_type="int8")

segments, info = model.transcribe(video, word_timestamps=True, language=None)
print("Detected language:", info.language)

words = []
full_text = []
for seg in segments:
    full_text.append(seg.text)
    for w in seg.words:
        words.append({"word": w.word.strip(), "start": w.start, "end": w.end})

out = {"language": info.language, "text": "".join(full_text), "words": words}
with open(r"C:\3D DOCUMENTS\TATTOO\reels\reels\subs_work\transcript.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

print("WORDS:", len(words))
print(out["text"])
