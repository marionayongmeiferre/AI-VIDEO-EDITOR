import type { ReelScript } from "../types";

/**
 * Her 3D metallic heart idea. The trick comes first and unexplained: the rotating heart
 * on the leg cannot be understood at a glance, and that confusion is what holds people
 * past the third second.
 */
export const corazon3d: ReelScript = {
  id: "corazon-3d",
  hook: "Esto todavía no es un tatuaje",
  hookSeconds: 3,
  hookShot: "Pierna del cliente con el corazón 3D rotando encima, como si ya estuviera tatuado",

  beats: [
    {
      text: "Es un corazón metálico modelado en 3D",
      shot: "Mismo plano, quitando el efecto para romper la ilusión",
      seconds: 3,
    },
    {
      text: "Lo monto en el ordenador y lo giro",
      shot: "Time-lapse del modelado 3D, acelerado",
      seconds: 4,
    },
    {
      text: "Hasta que el metal parece metal de verdad",
      shot: "Detalle de pantalla: los reflejos cambiando",
      seconds: 3.5,
    },
    {
      text: "Así ves el resultado antes de tocarte la piel",
      shot: "Tú trabajando frente al ordenador, plano medio",
      seconds: 3.5,
    },
    {
      text: "Y solo entonces lo imprimo para tatuar",
      shot: "Diseño impreso en papel de tatuar, primer plano",
      seconds: 3,
    },
  ],

  cta: "¿Os enseño el resultado tatuado?\nDecídmelo en comentarios",
  ctaSeconds: 3,
};
