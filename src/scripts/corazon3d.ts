import type { ReelScript } from "../types";

/**
 * Narrativa escrita por Mariona. Se respeta su estructura y sus tiempos tal cual:
 * gancho, dos beneficios separados, disponibilidad, CTA en medio, reveal al final y loop.
 */
export const corazon3d: ReelScript = {
  id: "corazon-3d",

  sections: [
    {
      label: "HOOK",
      seconds: 3,
      voiceover:
        "Esto no es un tatuaje, es el modelo 3D de un diseño que tatué hace poco. Resultado al final del video.",
      text: "Esto no es un tatuaje",
      shot: "Corazón 3D rotando sobre piel, luego corte a claramente 3D",
    },
    {
      label: "BENEFICIO 1 · Iluminación y ángulo",
      seconds: 7,
      voiceover: "Lo bueno del 3D es que decido exactamente la iluminación y el ángulo que quiero.",
      text: "Decido la luz y el ángulo exactos",
      shot: "Render del corazón con cambios de iluminación y rotaciones",
    },
    {
      label: "BENEFICIO 2 · Reutilización",
      seconds: 8,
      voiceover: "Y con el mismo modelo, saco varios diseños distintos.",
      text: "Con el mismo modelo, varios diseños",
      shot: "Mini-montaje rápido de 3 o 4 ángulos y variaciones del mismo modelo",
    },
    {
      label: "DISPONIBILIDAD",
      seconds: 10,
      voiceover: "Estos son los diseños que saqué. Este de aquí, por cierto, aún está disponible.",
      text: "Este todavía está disponible",
      shot: "Grid de los diseños sacados, y close-up del que sigue libre",
    },
    {
      label: "CTA",
      seconds: 7,
      voiceover:
        "Si te interesa un proyecto así de personalizado, escríbeme por Instagram contándome tu idea y la zona del cuerpo.",
      text: "Escríbeme con tu idea y la zona",
      shot: "Tú a cámara, mirando directo",
    },
    {
      label: "REVEAL FINAL",
      seconds: 15,
      // Sin voz en off: solo el impacto visual.
      shot: "Tatuaje terminado con buena luz, zoom lento",
    },
    {
      label: "LOOP",
      seconds: 2,
      shot: "Vuelve al frame inicial del hook: corazón tatuado en la misma pose del render",
    },
  ],
};
