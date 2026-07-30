// Explicit .ts extensions: this file is run directly by Node, which strips types but
// does not resolve extensionless paths.
import { corazon3d } from "./scripts/corazon3d.ts";
import { speechSeconds, totalFrames, FPS, type ReelScript } from "./types.ts";

/**
 * Checks each line against the time it is given, so a section that can't physically be
 * narrated in its slot is caught before filming rather than in the edit.
 *
 * Run with:  npm run timing
 */
function report(script: ReelScript) {
  console.log(`\n${script.id}  ·  ${(totalFrames(script) / FPS).toFixed(0)} segundos en total\n`);

  let elapsed = 0;
  let problems = 0;

  for (const section of script.sections) {
    const from = elapsed;
    elapsed += section.seconds;

    const range = `${from}-${elapsed}s`.padEnd(9);
    const label = section.label.padEnd(34);

    if (!section.voiceover) {
      console.log(`${range} ${label} sin voz`);
      continue;
    }

    const needed = speechSeconds(section.voiceover);
    const fits = needed <= section.seconds;
    if (!fits) problems++;

    console.log(
      `${range} ${label} ${fits ? "OK  " : "NO  "} hablar ${needed.toFixed(1)}s de ${section.seconds}s`
    );
  }

  console.log(
    problems === 0
      ? "\nTodas las frases caben en su tramo.\n"
      : `\n${problems} tramo(s) con la frase más larga que el tiempo disponible.\n`
  );
}

report(corazon3d);
