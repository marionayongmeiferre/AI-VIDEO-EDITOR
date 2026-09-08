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

## `plantillas.html` — montaje por plantilla, sin código

Alternativa al flujo de Remotion para los reels de siempre. Es un único HTML: se abre en el navegador y no necesita instalar nada.

Se elige una plantilla (**Top**, Frase viral, Humor, Proceso, Emocional, Sorteo), que ya trae los cortes y su duración, y solo hay que soltar los vídeos en cada hueco. Los huecos vacíos salen en negro, así que el reel se ve entero antes de tener todo grabado — la misma idea que los recuadros de Remotion.

**Dos pistas independientes.** Los cortes de imagen y los subtítulos van por separado: una frase puede aguantar 2 o 3 cortes seguidos, que es como se leen los reels de verdad. Se arrastran en la línea de tiempo y hacen *snap* a los cortes.

**Subtítulos karaoke** en el verde lima y el magenta de la cuenta, palabra por palabra, con el handle siempre debajo. Una palabra entre asteriscos —`Los *3* tatuajes`— se dibuja más grande y más pesada.

Publicado también como artifact, que es donde funcionan la escritura de subtítulos con IA y la descarga del vídeo exportado:
https://claude.ai/code/artifact/2bfaceac-4dc3-47d4-8d2d-3eb82f8e3eab

## `docs/` — la misma herramienta, instalada en el movil

Version web de `plantillas.html`, pensada para usarla como app de edicion en el iPhone.
Se publica con GitHub Pages y se anade a la pantalla de inicio: icono propio, pantalla
completa y funciona sin cobertura.

**Exporta en MP4, no en WebM.** Safari del iPhone no implementa `canvas.captureStream()`,
asi que el metodo de grabar en tiempo real no existe ahi. En su lugar usa **WebCodecs**:
recorre el reel fotograma a fotograma, lo codifica en H.264 y le pega el audio en AAC con
`mp4-muxer`. Sale mas rapido que el tiempo real y en un formato que Instagram traga mejor.
Si el aparato no tiene WebCodecs, cae a MediaRecorder y saca WebM.

El audio se monta aparte: se decodifica el de cada clip, se mezcla sobre la linea de tiempo
con un `OfflineAudioContext` y se codifica entero al final.

Para guardarlo en el carrete usa la hoja de compartir de iOS (`navigator.share`), que ofrece
**Guardar en Fotos**. Sin el tope de 16 MB que tiene la version artifact.

La seccion **Exportar** lleva un diagnostico que dice, en el aparato que sea, que motor va a
usar, si habra audio y como se va a guardar. Si algo no funciona en el movil, eso lo aclara.

### Publicarlo

En GitHub: **Settings → Pages → Source: Deploy from a branch**, rama `main`, carpeta `/docs`.
Queda en `https://marionayongmeiferre.github.io/AI-VIDEO-EDITOR/`.

### Ficheros

| | |
|---|---|
| `index.html` | la app entera |
| `mp4-muxer.js` | empaqueta el MP4 (32 KB, sin dependencias) |
| `usage.js` | registro de uso local para estudiar la interfaz |
| `sw.js` | cache para que abra sin internet |
| `manifest.webmanifest` + iconos | lo que la convierte en app instalable |

`usage.js` no manda nada a ningun sitio: se queda en localStorage del propio movil, y no
guarda imagenes, nombres de fichero ni el texto de los subtitulos. Solo que se toca y
cuanto tarda una exportacion. Se lee con `usageReport()` y se borra con `usageClear()`.

## Decisiones de formato

- **1080x1920 a 30 fps**: lo que aceptan Instagram y TikTok sin reconvertir.
- **Márgenes de seguridad** (`src/theme.ts`): Instagram tapa la parte de abajo y la derecha del reel con su propia interfaz, así que todo lo que hay que leer se queda dentro de esos márgenes.
- **Las animaciones duran unos 8 fotogramas**, con curva de salida y sin rebotes: lo justo para que no parezca un corte seco, lo bastante rápido para que el texto se lea casi al instante.

## Licencia de Remotion

Remotion **no es software libre del todo**: es gratis para particulares y para empresas de hasta tres personas, pero una empresa mayor necesita licencia de pago. Como tatuadora autónoma entras en el uso gratuito. Si algún día montas un estudio con plantilla, habría que revisarlo: https://remotion.dev/license
