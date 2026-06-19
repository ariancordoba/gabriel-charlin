/**
 * ╔══════════════════════════════════════════════════════════════╗
 *  GABRIEL CHARLIN — Configuración del sitio
 *  Editá este archivo para cambiar cualquier cosa del sitio.
 *  No hace falta tocar ningún otro archivo.
 * ╚══════════════════════════════════════════════════════════════╝
 */

const SITE = {

  // ──────────────────────────────────────────────────────────────
  //  HERO — lo que aparece al entrar al sitio
  // ──────────────────────────────────────────────────────────────
  hero: {
    nombre:   'Gabriel Charlin',
    subtitulo: 'Pintor · Argentina',
    video:    'videohero.mp4',   // ruta al video de fondo (en la misma carpeta)
  },

  // ──────────────────────────────────────────────────────────────
  //  SOBRE ÉL — texto de presentación
  // ──────────────────────────────────────────────────────────────
  sobre: `Gabriel Charlin tiene 67 años y pinta desde antes de que alguien le dijera que era posible.
De profesión hace radio, de alma es gaucho: el mate temprano, el campo, los gallos que cantan
antes de que salga el sol. Sus cuadros no necesitan explicación. Ya está todo dicho en el lienzo.`,

  // ──────────────────────────────────────────────────────────────
  //  FOOTER
  // ──────────────────────────────────────────────────────────────
  footer: {
    nombre: 'Gabriel Charlin',
    anio:   '2025',
  },

  // ──────────────────────────────────────────────────────────────
  //  GALERÍA — las obras
  //
  //  Cada obra tiene:
  //    src:   ruta a la imagen (dentro de la carpeta images/)
  //    title: nombre de la obra (dejá '' si no tiene nombre)
  //
  //  Para REORDENAR: mové las líneas de lugar
  //  Para OCULTAR una obra: poné // al inicio de la línea
  //  Para BORRAR: eliminá la línea entera
  // ──────────────────────────────────────────────────────────────
  galeria: [
    { src: 'images/01.jpg', title: '' },
    { src: 'images/02.jpg', title: '' },
    { src: 'images/03.jpg', title: '' },
    { src: 'images/04.jpg', title: '' },
    { src: 'images/05.jpg', title: '' },
    { src: 'images/06.jpg', title: '' },
    { src: 'images/07.jpg', title: '' },
    { src: 'images/08.jpg', title: '' },
    { src: 'images/09.jpg', title: '' },
    { src: 'images/10.jpg', title: '' },
    { src: 'images/11.jpg', title: '' },
    { src: 'images/12.jpg', title: '' },
    { src: 'images/13.jpg', title: '' },
    { src: 'images/14.jpg', title: '' },
    { src: 'images/15.jpg', title: '' },
    { src: 'images/16.jpg', title: '' },
    { src: 'images/17.jpg', title: '' },
    { src: 'images/18.jpg', title: '' },
    { src: 'images/19.jpg', title: '' },
    { src: 'images/20.jpg', title: '' },
    { src: 'images/21.jpg', title: '' },
    { src: 'images/22.jpg', title: '' },
    { src: 'images/23.jpg', title: '' },
    { src: 'images/24.jpg', title: '' },
    { src: 'images/25.jpg', title: '' },
    { src: 'images/26.jpg', title: '' },
    { src: 'images/27.jpg', title: '' },
    { src: 'images/28.jpg', title: '' },
    { src: 'images/29.jpg', title: '' },
    { src: 'images/30.jpg', title: '' },
    { src: 'images/31.jpg', title: '' },
    { src: 'images/32.jpg', title: '' },
    { src: 'images/33.jpg', title: '' },
    { src: 'images/34.jpg', title: '' },
    { src: 'images/35.jpg', title: '' },
    { src: 'images/36.jpg', title: '' },
    { src: 'images/37.jpg', title: '' },
    { src: 'images/38.jpg', title: '' },
    { src: 'images/39.jpg', title: '' },
    { src: 'images/40.jpg', title: '' },
    { src: 'images/41.jpg', title: '' },
    { src: 'images/42.jpg', title: '' },
    { src: 'images/43.jpg', title: '' },
    { src: 'images/44.jpg', title: '' },
    { src: 'images/45.jpg', title: '' },
    { src: 'images/46.jpg', title: '' },
    { src: 'images/47.jpg', title: '' },
    { src: 'images/48.jpg', title: '' },
    { src: 'images/49.jpg', title: '' },
    { src: 'images/50.jpg', title: '' },
    { src: 'images/51.jpg', title: '' },
    { src: 'images/52.jpg', title: '' },
    { src: 'images/53.jpg', title: '' },
    { src: 'images/54.jpg', title: '' },
    { src: 'images/55.jpg', title: '' },
    { src: 'images/56.jpg', title: '' },
    { src: 'images/57.jpg', title: '' },
    { src: 'images/58.jpg', title: '' },
    { src: 'images/59.jpg', title: '' },
    { src: 'images/60.jpg', title: '' },
    { src: 'images/61.jpg', title: '' },
    { src: 'images/62.jpg', title: '' },
  ],

};

// No toques nada de acá para abajo
const PAINTINGS = SITE.galeria;
