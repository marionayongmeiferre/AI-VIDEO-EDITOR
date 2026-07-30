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

## Cómo se escribe un reel

Un archivo por reel en `src/scripts/`. Ver `corazon3d.ts` como ejemplo. La estructura:

- **`hook`**: los tres primeros segundos, literales. Es la parte que decide el alcance, por eso tiene su propia sección y va siempre primero.
- **`beats`**: cada momento del vídeo, con su texto en pantalla, su duración en segundos y su plano.
- **`cta`**: lo que se le pide al espectador al final.

Después hay que añadirlo a la lista `SCRIPTS` de `src/Root.tsx`.

## Grabar después de montar, no antes

Un beat sin `clip` no rompe nada: dibuja un recuadro con el plano que falta por grabar. Eso permite **ver el reel entero, con sus tiempos reales, antes de grabar nada**, y cada recuadro dice exactamente qué falta.

Cuando el clip esté grabado, se guarda en `public/clips/` y se añade al beat:

```ts
{
  text: "Lo monto en el ordenador y lo giro",
  clip: "clips/modelado.mp4",
  clipStart: 2,        // opcional: desde qué segundo del clip empezar
  seconds: 4,
}
```

## Decisiones de formato

- **1080x1920 a 30 fps**: lo que aceptan Instagram y TikTok sin reconvertir.
- **Márgenes de seguridad** (`src/theme.ts`): Instagram tapa la parte de abajo y la derecha del reel con su propia interfaz, así que todo lo que hay que leer se queda dentro de esos márgenes.
- **Las animaciones duran unos 8 fotogramas**, con curva de salida y sin rebotes: lo justo para que no parezca un corte seco, lo bastante rápido para que el texto se lea casi al instante.

## Licencia de Remotion

Remotion **no es software libre del todo**: es gratis para particulares y para empresas de hasta tres personas, pero una empresa mayor necesita licencia de pago. Como tatuadora autónoma entras en el uso gratuito. Si algún día montas un estudio con plantilla, habría que revisarlo: https://remotion.dev/license
