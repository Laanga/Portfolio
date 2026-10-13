# Ilustraciones — «El oficio de Dédalo»

Narrativa: cada sección es un capítulo del mito de Dédalo, el artesano e inventor griego.

| Sección | Ilustración | Obra original | Licencia |
|---|---|---|---|
| Hero | Ícaro | Hendrick Goltzius, *Icarus* (serie *Los cuatro deshonrados*), 1588 — Rijksmuseum | CC0 — [Commons](https://commons.wikimedia.org/wiki/File:Icarus_De_vier_vallers_(serietitel),_RP-P-OB-10.363.jpg) |
| Sobre mí | Dédalo | *Daedalus leert Icarus hoe te vliegen* — Rijksmuseum (RP-P-2007-270) | CC0 — [Commons](https://commons.wikimedia.org/wiki/File:Daedalus_leert_Icarus_hoe_te_vliegen,_RP-P-2007-270.jpg) |
| Experiencia | La fragua de Vulcano (Hefesto, dios de los artesanos) | Francesco Primaticcio, *Vulcan's Forge* — The Met | CC0 — [Commons](https://commons.wikimedia.org/wiki/File:Vulcan%27s_Forge_MET_DP824217.jpg) |
| Pantalla de carga | Las manos de *La creación de Adán* (se acercan mientras sube el contador) | Miguel Ángel, Capilla Sixtina, c. 1512 | Dominio público — [Commons](https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg) |
| Footer | Apolo | Vaciado de la cabeza del Apolo de Belvedere — Statens Museum for Kunst | Dominio público — [Commons](https://commons.wikimedia.org/wiki/File:Ubekendt,_Hoved_fra_statuen_Apollo_Belvedere,_,_KAS2181,_Statens_Museum_for_Kunst.jpg) |

## Regenerar o añadir una ilustración

1. Descarga el original (≥1800 px) en `scripts/illustrations/sources/` (ignorado por git).
2. Añade o ajusta la entrada en `scripts/illustrations/jobs.json` (`crop` en fracciones, `hi`/`lo` = percentiles de nivel, `mode: "ink"` para grabados de líneas, `"light"` para grabados oscuros y fotos de escultura; `flatten` elimina halos de fondo, `warm` aísla tonos de piel en pinturas).
3. Ejecuta con Pillow y NumPy instalados:

```bash
python3 scripts/illustrations/treat.py scripts/illustrations/jobs.json
```

4. Registra la imagen en `src/components/MythArt.tsx` y su texto alternativo en `translations.ts` (`myth.art`, ES y EN).
