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
    { src: 'images/01.jpg', title: 'El elefante en el pueblo' },
    { src: 'images/02.jpg', title: 'El elefante en el pueblo' },
    { src: 'images/03.jpg', title: 'El elefante en el pueblo' },
    { src: 'images/04.jpg', title: 'El elefante en el pueblo' },
    { src: 'images/05.jpg', title: 'El elefante en el pueblo' },
    { src: 'images/06.jpg', title: 'El callejón del gato y el mar' },
    { src: 'images/07.jpg', title: 'El callejón del gato y el mar' },
    { src: 'images/08.jpg', title: 'El callejón del gato y el mar' },
    { src: 'images/09.jpg', title: 'El callejón del gato y el mar' },
    { src: 'images/10.jpg', title: 'El niño en la piedra' },
    { src: 'images/11.jpg', title: 'El niño en la piedra' },
    { src: 'images/12.jpg', title: 'El globo y el árbol' },
    { src: 'images/13.jpg', title: 'El ombú' },
    { src: 'images/14.jpg', title: 'El ombú' },
    { src: 'images/15.jpg', title: 'El ombú' },
    { src: 'images/16.jpg', title: 'La estación Charlin' },
    { src: 'images/17.jpg', title: 'La estación Charlin' },
    { src: 'images/18.jpg', title: 'La estación Charlin' },
    { src: 'images/19.jpg', title: 'La estación Charlin' },
    { src: 'images/20.jpg', title: 'El camino de niebla' },
    { src: 'images/21.jpg', title: 'El camino de niebla' },
    { src: 'images/22.jpg', title: 'El vuelo sobre la llanura' },
    { src: 'images/23.jpg', title: 'El vuelo sobre la llanura' },
    { src: 'images/24.jpg', title: 'La mañana en la cocina' },
    { src: 'images/25.jpg', title: 'La mañana en la cocina' },
    { src: 'images/26.jpg', title: 'La mañana en la cocina' },
    { src: 'images/27.jpg', title: 'La mañana en la cocina' },
    { src: 'images/28.jpg', title: 'La mañana en la cocina' },
    { src: 'images/29.jpg', title: 'El gallo y el pichón' },
    { src: 'images/30.jpg', title: 'El gallo y el pichón' },
    { src: 'images/31.jpg', title: 'El gallo y el pichón' },
    { src: 'images/32.jpg', title: 'La cierva y su cría' },
    { src: 'images/33.jpg', title: 'La cierva y su cría' },
    { src: 'images/34.jpg', title: 'El corredor hacia el mar' },
    { src: 'images/35.jpg', title: 'El corredor hacia el mar' },
    { src: 'images/36.jpg', title: 'El corredor hacia el mar' },
    { src: 'images/37.jpg', title: 'El caballo en la sala' },
    { src: 'images/38.jpg', title: 'El caballo en la sala' },
    { src: 'images/39.jpg', title: 'El caballo en la sala' },
    { src: 'images/40.jpg', title: 'Otoño en el camino' },
    { src: 'images/41.jpg', title: 'Otoño en el camino' },
    { src: 'images/42.jpg', title: 'El cervatillo en el bosque' },
    { src: 'images/43.jpg', title: 'El cervatillo en el bosque' },
    { src: 'images/44.jpg', title: 'El oso polar en el desierto' },
    { src: 'images/45.jpg', title: 'El oso polar en el desierto' },
    { src: 'images/46.jpg', title: 'El oso polar en el desierto' },
    { src: 'images/47.jpg', title: 'El patio de los gallos' },
    { src: 'images/48.jpg', title: 'El patio de los gallos' },
    { src: 'images/49.jpg', title: 'La estancia' },
    { src: 'images/50.jpg', title: 'La estancia' },
    { src: 'images/51.jpg', title: 'La estancia' },
    { src: 'images/52.jpg', title: 'La estancia' },
    { src: 'images/53.jpg', title: 'Girasoles' },
    { src: 'images/54.jpg', title: 'Girasoles' },
    { src: 'images/55.jpg', title: 'Girasoles' },
    { src: 'images/56.jpg', title: 'Girasoles' },
    { src: 'images/57.jpg', title: 'Girasoles' },
    { src: 'images/58.jpg', title: 'Girasoles' },
    { src: 'images/59.jpg', title: 'Retrato de perro' },
    { src: 'images/60.jpg', title: 'El gaucho en la tormenta' },
    { src: 'images/61.jpg', title: 'El gaucho en la tormenta' },
    { src: 'images/62.jpg', title: 'El gaucho en la tormenta' },
  ],

};

// No toques nada de acá para abajo
const PAINTINGS = SITE.galeria;
