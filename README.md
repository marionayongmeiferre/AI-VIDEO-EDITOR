# Reels de @kaos.realm

Los reels se montan escribiendo el guion como datos, no arrastrando clips en una línea de tiempo. El mismo guion que hay en la app de contenido se convierte en vídeo sin rehacer el trabajo.

## Los tres comandos

```bash
npm run studio
```

Abre el editor visual en el navegador. Se ve el reel entero, se puede mover por él fotograma a fotograma y los cambios en el código aparecen al momento. Es donde se ajustan los tiempos.

```bash
npm run render -- src/index.ts corazon-3d out/corazon-3d.mp4
```

Genera el MP4 final, listo para subir a Instagram y a TikTok.

```bash
npm run compositions -- src/index.ts
```

Lista los reels disponibles con su duración.

```bash
npm run timing
```

Comprueba, tramo por tramo, si lo que hay que decir cabe en el tiempo que tiene. Calcula a 2,8 palabras por segundo, que es un ritmo natural en castellano. Sirve para detectar antes de grabar que una frase no entra, en lugar de descubrirlo montando.

## Cómo se escribe un reel

Un archivo por reel en `src/scripts/`. Ver `corazon3d.ts` como ejemplo.

Un reel es una lista de secciones en el orden que tú decidas, sin molde fijo. En el del corazón 3D, por ejemplo, el CTA va en medio y el reveal cierra el vídeo. Cada sección lleva:

- **`label`**: el nombre de la sección en tu guion, como "HOOK" o "REVEAL FINAL".
- **`voiceover`**: lo que dices, palabra por palabra. Se omite en las secciones sin voz.
- **`text`**: el rótulo que va quemado en la imagen. Los reels se ven sin sonido, así que suele ser la misma frase acortada.
- **`shot`**: el plano que hay que grabar.
- **`seconds`**: cuánto dura la sección.

Después hay que añadirlo a la lista `SCRIPTS` de `src/Root.tsx`.

## Grabar después de montar, no antes

Una sección sin `clip` no rompe nada: dibuja un recuadro con el plano que falta por grabar y la frase que hay que decir. Eso permite **ver el reel entero, con sus tiempos reales, antes de grabar nada**, y cada recuadro funciona como guion de rodaje.

Cuando el clip esté grabado, se guarda en `public/clips/` y se añade a la sección:

```ts
{
  label: "BENEFICIO 1 · Iluminación y ángulo",
  voiceover: "Lo bueno del 3D es que decido exactamente la iluminación y el ángulo que quiero.",
  text: "Decido la luz y el ángulo exactos",
  clip: "clips/render.mp4",
  clipStart: 2,        // opcional: desde qué segundo del clip empezar
  seconds: 7,
}
```

## Decisiones de formato

- **1080x1920 a 30 fps**: lo que aceptan Instagram y TikTok sin reconvertir.
- **Márgenes de seguridad** (`src/theme.ts`): Instagram tapa la parte de abajo y la derecha del reel con su propia interfaz, así que todo lo que hay que leer se queda dentro de esos márgenes.
- **Las animaciones duran unos 8 fotogramas**, con curva de salida y sin rebotes: lo justo para que no parezca un corte seco, lo bastante rápido para que el texto se lea casi al instante.

## Licencia de Remotion

Remotion **no es software libre del todo**: es gratis para particulares y para empresas de hasta tres personas, pero una empresa mayor necesita licencia de pago. Como tatuadora autónoma entras en el uso gratuito. Si algún día montas un estudio con plantilla, habría que revisarlo: https://remotion.dev/license
