/* ╔══════════════════════════════════════════════════════════════════╗
   ║  JAVASCRIPT DEL PORTAFOLIO  (solo lo usa portafolio.html)        ║
   ╠══════════════════════════════════════════════════════════════════╣
   ║  Este archivo hace 3 cosas:                                      ║
   ║    · crea las tarjetas del mosaico a partir de una lista         ║
   ║    · hace funcionar los botones de filtro                        ║
   ║    · abre y controla el visor al hacer clic en un trabajo        ║
   ║                                                                  ║
   ║  ÍNDICE                                                          ║
   ║    PARTE A: DATOS (lo único que normalmente se edita)            ║
   ║      A1. Lista de proyectos                                      ║
   ║      A2. Lista de categorías (botones de filtro)                 ║
   ║                                                                  ║
   ║    PARTE B: FUNCIONAMIENTO (no hace falta tocarlo)               ║
   ║      B1. Preparación                                             ║
   ║      B2. Funciones de ayuda                                      ║
   ║      B3. Crear las tarjetas                                      ║
   ║      B4. Animación al hacer scroll                               ║
   ║      B5. Filtros                                                 ║
   ║      B6. Visor: abrir, cambiar de imagen y cerrar                ║
   ║      B7. Visor: botones, teclado y deslizar en celular           ║
   ╚══════════════════════════════════════════════════════════════════╝ */


/* ##################################################################
   PARTE A: DATOS
   ################################################################## */

/* ==================================================================
   A1. LISTA DE PROYECTOS
   Cada bloque { ... } es un trabajo del portafolio. Aparecen en la
   página en el mismo orden que aquí.

   CÓMO AGREGAR UN TRABAJO
   1. Guarda sus imágenes en la carpeta images/portafolio/ así:
        <slug>-01.webp         imagen grande (unos 1800px)
        <slug>-01-thumb.webp   miniatura (unos 800px de ancho)
      y si tiene más imágenes: <slug>-02.webp, <slug>-02-thumb.webp...
   2. Copia un bloque de abajo, pégalo donde quieras que aparezca
      y cambia los datos. No olvides la coma entre bloques.

   QUÉ ES CADA DATO
     slug        nombre corto de las imágenes, sin espacios ni acentos
                 (ej. 'san-angel' → san-angel-01.webp)
     titulo      nombre grande de la tarjeta.
                 OJO: la fuente Cocogoose de prueba no trae números,
                 así que no pongas números en el título.
     tipo        qué es el trabajo (va en la etiqueta blanca)
     categorias  en qué filtros aparece. Usa los nombres exactos de
                 la lista CATEGORIAS (A2). Puede tener varias.
     descripcion texto que se lee en el visor
     fotos       cuántas imágenes tiene (01, 02, 03...)
     ancha       (opcional) true si la imagen es muy horizontal, como
                 una lona; en la tarjeta se recorta a 16:9
   ================================================================== */
var PROYECTOS = [
  {
    slug: 'parousa',
    titulo: 'Parousa Aletheia',
    tipo: 'Manual de identidad',
    categorias: ['Branding', 'Diseño gráfico'],
    descripcion: 'Identidad visual completa para la editorial Parousa Aletheia: logotipo y sus variaciones, tipografía, paleta de color, elementos gráficos, fotografía y aplicaciones de la marca.',
    fotos: 29
  },
  {
    slug: 'san-angel',
    titulo: 'Café San Ángel',
    tipo: 'Vinil para vitrina',
    categorias: ['Impresión'],
    descripcion: 'Ilustraciones en vinil blanco para los ventanales de la cafetería, pensadas para verse desde la calle.',
    fotos: 1
  },
  {
    slug: 'happy-birthday',
    titulo: 'Happy Birthday Mario',
    tipo: 'Playera personalizada',
    categorias: ['Estampado textil'],
    descripcion: 'Diseño y estampado de playera para celebración de cumpleaños.',
    fotos: 1
  },
  {
    slug: 'dogos-sonora',
    titulo: 'Dogos Estilo Sonora',
    tipo: 'Post para redes',
    categorias: ['Redes sociales'],
    descripcion: 'Publicación promocional con precio destacado para redes sociales.',
    fotos: 1
  },
  {
    slug: 'flavors',
    titulo: 'Flavors That Tell a Story',
    tipo: 'Menú',
    categorias: ['Diseño gráfico', 'Impresión'],
    descripcion: 'Menú completo de restaurante: desayunos, tacos, tortas, antojitos, especiales de fin de semana y menú infantil.',
    fotos: 1
  },
  {
    slug: 'el-divo',
    titulo: 'El Divo',
    tipo: 'Colaboración · Playera',
    categorias: ['Estampado textil'],
    descripcion: 'Playera de edición especial creada en colaboración.',
    fotos: 1
  },
  {
    slug: 'rincon-amado',
    titulo: 'Rincón Amado',
    tipo: 'Lona de gran formato',
    categorias: ['Impresión'],
    descripcion: 'Lona para cafetería con café, postres y bebidas.',
    fotos: 1
  },
  {
    slug: 'invitacion-boda',
    titulo: 'Invitación de boda',
    tipo: 'Papelería',
    categorias: ['Diseño gráfico', 'Impresión'],
    descripcion: 'Invitación elegante con caligrafía y detalles de la ceremonia y la recepción.',
    fotos: 1
  },
  {
    slug: 'dentalcore',
    titulo: 'DentalCore',
    tipo: 'Recetario',
    categorias: ['Diseño gráfico', 'Impresión'],
    descripcion: 'Diseño e impresión de recetario médico para consultorio de endodoncia.',
    fotos: 1
  },
  {
    slug: 'mural-vinil',
    titulo: 'Diseñando Historias',
    tipo: 'Mural en vinil · 208 × 240 cm',
    categorias: ['Impresión', 'Branding'],
    descripcion: 'Mural para nuestro propio espacio: el proceso creativo de One Idea contado en una pared.',
    fotos: 1
  },
  {
    slug: 'el-guayabo',
    titulo: 'El Guayabo',
    tipo: 'Logotipo aplicado',
    categorias: ['Branding'],
    descripcion: 'Logotipo aplicado en la barra del negocio.',
    fotos: 1
  },
  {
    slug: 'panchitos',
    titulo: 'Panchitos Burritos',
    tipo: 'Contenido digital',
    categorias: ['Redes sociales'],
    descripcion: 'Contenido digital para la marca.',
    fotos: 1
  },
  {
    slug: 'menu-hotdogs',
    titulo: 'Hamburguesas & Hot-Dogs',
    tipo: 'Menú en vinil · 76 × 101 cm',
    categorias: ['Diseño gráfico', 'Impresión'],
    descripcion: 'Menú de gran formato impreso en vinil para colocarse en el local.',
    fotos: 1
  },
  {
    slug: 'tarjetas-one-idea',
    titulo: 'One Idea',
    tipo: 'Tarjetas de presentación',
    categorias: ['Branding', 'Impresión'],
    descripcion: 'Nuestras propias tarjetas: frente y reverso.',
    fotos: 2
  },
  {
    slug: 'bolsa-taqueria',
    titulo: 'Bolsa Oficial de Sabor', // sin números en el título: el "70" va en el tipo
    tipo: 'Bolsa de papel · Taquería 70',
    categorias: ['Branding', 'Impresión'],
    descripcion: 'Bolsa oficial de la taquería con su identidad impresa.',
    fotos: 1
  },
  {
    slug: 'volantes',
    titulo: 'Volantes One Idea',
    tipo: 'Volante · ¼ de carta',
    categorias: ['Diseño gráfico', 'Impresión'],
    descripcion: 'Volantes promocionales de nuestros servicios: microperforado, serigrafía y lonas.',
    fotos: 1
  },
  {
    slug: 'microperforado',
    titulo: 'One Idea en Nuevo México',
    tipo: 'Microperforado para vitrinas',
    categorias: ['Impresión', 'Redes sociales'],
    descripcion: 'Instalación de microperforado en los ventanales de un local en Nuevo México.',
    fotos: 1
  },
  {
    slug: 'lona-desayunos',
    titulo: 'San Ángel Desayunos',
    tipo: 'Lona de gran formato',
    categorias: ['Impresión'],
    descripcion: 'Lona horizontal de gran formato con los platillos del menú de desayunos.',
    fotos: 1,
    ancha: true // imagen muy horizontal: en la tarjeta se recorta a 16:9
  }
];


/* ==================================================================
   A2. LISTA DE CATEGORÍAS
   Son los botones de filtro, en este orden. El botón "Todos" se
   agrega solo al principio. Si agregas una categoría aquí, úsala
   con el mismo nombre exacto en los proyectos.
   ================================================================== */
var CATEGORIAS = ['Branding', 'Diseño gráfico', 'Impresión', 'Redes sociales', 'Estampado textil'];


/* ##################################################################
   PARTE B: FUNCIONAMIENTO
   De aquí para abajo no hace falta tocar nada para agregar o
   cambiar trabajos.

   Todo va dentro de (function () { ... })(); para que sus variables
   no choquen con las de otros scripts de la página (como webflow.js).
   ################################################################## */
(function () {

  /* ================================================================
     B1. PREPARACIÓN
     Se guardan en variables los elementos vacíos del HTML que este
     script va a llenar (sección 3 de portafolio.html).
     ================================================================ */
  var RUTA = 'images/portafolio/'; // carpeta donde están las imágenes

  var grid = document.getElementById('pf-grid');          // mosaico
  var filtrosEl = document.getElementById('pf-filters');  // botones de filtro
  var contadorEl = document.getElementById('pf-count');   // texto "18 proyectos"
  var vacioEl = document.getElementById('pf-empty');      // mensaje "no hay proyectos"
  if (!grid) return; // si la página no tiene mosaico, no se hace nada


  /* ================================================================
     B2. FUNCIONES DE AYUDA
     Funciones chiquitas que se usan muchas veces más abajo.
     ================================================================ */

  // num(3) → "03"  (agrega un cero a la izquierda)
  function num(n) { return n < 10 ? '0' + n : String(n); }

  // arma la ruta de una imagen:
  //   img(proyecto, 2)       → images/portafolio/parousa-02.webp
  //   img(proyecto, 2, true) → images/portafolio/parousa-02-thumb.webp
  function img(p, i, thumb) { return RUTA + p.slug + '-' + num(i) + (thumb ? '-thumb' : '') + '.webp'; }

  // crea un elemento HTML con su clase y su texto:
  //   el('h3', 'caps', 'Hola') → <h3 class="caps">Hola</h3>
  function el(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto != null) e.textContent = texto;
    return e;
  }


  /* ================================================================
     B3. CREAR LAS TARJETAS
     Recorre la lista PROYECTOS y por cada uno arma esta estructura
     dentro del mosaico:

       <article class="pf-card">
         <button class="pf-card-link">          ← al hacer clic abre el visor
           <div class="pf-card-image">
             <img>                              ← miniatura
             <span class="pf-card-view">ver</span>
             <span class="pf-card-count">29 imágenes</span>  (si tiene varias)
           </div>
           <div class="pf-card-text">
             <h3>Título</h3>
             <div class="pf-card-badges"> etiquetas </div>
           </div>
         </button>
       </article>

     Las tarjetas creadas se guardan en "tarjetas" para poder
     filtrarlas después.
     ================================================================ */
  var tarjetas = PROYECTOS.map(function (p, idx) {
    var card = el('article', 'pf-card');
    // se guardan las categorías en la tarjeta para que el filtro las lea
    card.dataset.categorias = p.categorias.join('|');

    var btn = el('button', 'pf-card-link');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Ver ' + p.titulo + ' — ' + p.tipo);

    // --- imagen ---
    var imgWrap = el('div', 'pf-card-image' + (p.ancha ? ' is-wide' : ''));
    var foto = el('img');
    foto.src = img(p, 1, true);
    foto.alt = p.tipo + ' para ' + p.titulo;
    foto.loading = idx < 3 ? 'eager' : 'lazy'; // las 3 primeras cargan de inmediato, las demás al acercarse
    foto.decoding = 'async';
    imgWrap.appendChild(foto);
    imgWrap.appendChild(el('span', 'pf-card-view', 'ver'));
    if (p.fotos > 1) imgWrap.appendChild(el('span', 'pf-card-count', p.fotos + ' imágenes'));

    // --- texto: título + etiquetas ---
    var texto = el('div', 'pf-card-text');
    texto.appendChild(el('h3', 'caps pf-card-title', p.titulo));
    var badges = el('div', 'pf-card-badges');
    // primera etiqueta (rellena): el tipo de trabajo
    var b1 = el('div', 'works-badge'); b1.appendChild(el('h5', null, p.tipo)); badges.appendChild(b1);
    // demás etiquetas (solo borde): las categorías
    p.categorias.forEach(function (c) {
      var b = el('div', 'works-badge is-outline'); b.appendChild(el('h5', null, c)); badges.appendChild(b);
    });
    texto.appendChild(badges);

    // --- se junta todo y se agrega al mosaico ---
    btn.appendChild(imgWrap);
    btn.appendChild(texto);
    btn.addEventListener('click', function () { abrir(idx, 1); }); // abre el visor en la imagen 1
    card.appendChild(btn);
    grid.appendChild(card);
    return card;
  });


  /* ================================================================
     B4. ANIMACIÓN AL HACER SCROLL
     Las tarjetas empiezan invisibles (ver CSS, sección 4). Un
     "IntersectionObserver" vigila cuándo cada tarjeta entra en la
     pantalla y entonces le pone la clase "is-visible" para que
     aparezca subiendo. Si el navegador es muy viejo y no lo
     soporta, se muestran todas de una vez.
     ================================================================ */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' }) : null; // -8%: aparece un poco después de asomarse

  // empieza a vigilar las tarjetas que se ven y aún no aparecieron
  function observar() {
    tarjetas.forEach(function (c) {
      if (c.hidden || c.classList.contains('is-visible')) return;
      if (io) io.observe(c); else c.classList.add('is-visible');
    });
  }


  /* ================================================================
     B5. FILTROS
     1) Crea un botón por cada categoría, más "Todos" al principio.
     2) Al hacer clic en uno, marca ese botón como activo y esconde
        las tarjetas que no tienen esa categoría.
     3) Actualiza el contador y, si no queda ninguna tarjeta,
        muestra el mensaje "Aún no hay proyectos...".
     ================================================================ */

  // 1) crear los botones
  ['Todos'].concat(CATEGORIAS).forEach(function (cat, i) {
    var b = el('button', 'pf-filter' + (i === 0 ? ' is-active' : ''), cat);
    b.type = 'button';
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function () { filtrar(cat, b); });
    filtrosEl.appendChild(b);
  });

  // 2) y 3) filtrar
  function filtrar(cat, boton) {
    // marcar solo el botón presionado
    Array.prototype.forEach.call(filtrosEl.children, function (b) {
      var activo = b === boton;
      b.classList.toggle('is-active', activo);
      b.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });

    // mostrar u ocultar cada tarjeta
    var visibles = 0;
    tarjetas.forEach(function (c) {
      var mostrar = cat === 'Todos' || c.dataset.categorias.split('|').indexOf(cat) !== -1;
      c.hidden = !mostrar;
      if (mostrar) visibles++;
    });

    contadorEl.textContent = visibles + (visibles === 1 ? ' proyecto' : ' proyectos');
    vacioEl.hidden = visibles !== 0;
    observar(); // las tarjetas que reaparecen también se animan
  }

  // estado inicial al cargar la página
  contadorEl.textContent = PROYECTOS.length + ' proyectos';
  observar();


  /* ================================================================
     B6. VISOR: ABRIR, CAMBIAR DE IMAGEN Y CERRAR
     El visor es la ventana del HTML (sección 6 de portafolio.html).
     Primero se guardan sus partes en variables y luego vienen las
     tres funciones principales:
       abrir(proyecto, imagen) → llena el visor y lo muestra
       mostrar(imagen)         → cambia la imagen grande
       cerrar()                → lo esconde
     ================================================================ */
  var lb = document.getElementById('pf-lightbox');
  var lbImg = document.getElementById('pf-lb-img');
  var lbTipo = document.getElementById('pf-lb-tipo');
  var lbTitulo = document.getElementById('pf-lb-titulo');
  var lbDesc = document.getElementById('pf-lb-desc');
  var lbCats = document.getElementById('pf-lb-cats');
  var lbContador = document.getElementById('pf-lb-contador');
  var lbThumbs = document.getElementById('pf-lb-thumbs');
  var btnPrev = lb.querySelector('.pf-lb-prev');
  var btnNext = lb.querySelector('.pf-lb-next');
  var btnClose = lb.querySelector('.pf-lb-close');

  var actual = null;     // proyecto que se está viendo
  var foto = 1;          // número de imagen que se está viendo
  var ultimoFoco = null; // tarjeta que se clicó (para regresar ahí al cerrar)

  // --- abrir ---
  function abrir(idx, n) {
    actual = PROYECTOS[idx];
    ultimoFoco = document.activeElement;

    // textos del panel de información
    lbTipo.textContent = actual.tipo;
    lbTitulo.textContent = actual.titulo;
    lbDesc.textContent = actual.descripcion;
    lbCats.innerHTML = '';
    actual.categorias.forEach(function (c) {
      var b = el('div', 'works-badge is-outline'); b.appendChild(el('h5', null, c)); lbCats.appendChild(b);
    });

    // miniaturas (solo si hay más de una imagen)
    lbThumbs.innerHTML = '';
    lbThumbs.hidden = actual.fotos < 2;
    for (var i = 1; i <= actual.fotos; i++) {
      (function (i) {
        var t = el('button', 'pf-lb-thumb');
        t.type = 'button';
        t.setAttribute('aria-label', 'Imagen ' + i);
        var ti = el('img'); ti.src = img(actual, i, true); ti.alt = ''; ti.loading = 'lazy';
        t.appendChild(ti);
        t.addEventListener('click', function () { mostrar(i); });
        lbThumbs.appendChild(t);
      })(i);
    }

    // flechas: solo si hay más de una imagen
    btnPrev.hidden = btnNext.hidden = actual.fotos < 2;
    mostrar(n);

    // mostrar el visor y bloquear el scroll de la página de atrás
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pf-no-scroll');
    btnClose.focus();
  }

  // --- cambiar de imagen ---
  function mostrar(n) {
    var total = actual.fotos;
    // da la vuelta: después de la última sigue la primera, y al revés
    foto = ((n - 1 + total) % total) + 1;

    // cambiar la imagen grande (se desvanece mientras carga)
    lbImg.classList.add('is-loading');
    lbImg.onload = function () { lbImg.classList.remove('is-loading'); };
    lbImg.src = img(actual, foto, false);
    lbImg.alt = actual.tipo + ' para ' + actual.titulo + (total > 1 ? ' — imagen ' + foto + ' de ' + total : '');
    lbContador.textContent = num(foto) + ' / ' + num(total);

    // marcar la miniatura activa y deslizar la tira para que se vea
    Array.prototype.forEach.call(lbThumbs.children, function (t, i) {
      var activa = i + 1 === foto;
      t.classList.toggle('is-active', activa);
      if (activa) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });

    // precarga la siguiente imagen para que el cambio sea instantáneo
    if (total > 1) (new Image()).src = img(actual, (foto % total) + 1, false);
  }

  // --- cerrar ---
  function cerrar() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('pf-no-scroll');
    if (ultimoFoco) ultimoFoco.focus(); // regresa a la tarjeta que se había abierto
  }


  /* ================================================================
     B7. VISOR: BOTONES, TECLADO Y DESLIZAR EN CELULAR
     Conecta las acciones de la persona con las funciones de B6.
     ================================================================ */

  // botones anterior / siguiente / cerrar
  btnPrev.addEventListener('click', function () { mostrar(foto - 1); });
  btnNext.addEventListener('click', function () { mostrar(foto + 1); });
  btnClose.addEventListener('click', cerrar);

  // clic en el fondo oscuro (fuera de la imagen) también cierra
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('pf-lb-figure')) cerrar();
  });

  // teclado:
  //   Esc       → cerrar
  //   ← y →     → imagen anterior / siguiente
  //   Tab       → se mueve solo entre los botones del visor
  //               (no se escapa a la página de atrás)
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') cerrar();
    else if (e.key === 'ArrowLeft' && actual.fotos > 1) mostrar(foto - 1);
    else if (e.key === 'ArrowRight' && actual.fotos > 1) mostrar(foto + 1);
    else if (e.key === 'Tab') {
      var focos = Array.prototype.filter.call(lb.querySelectorAll('button'), function (b) {
        return !b.hidden && b.offsetParent !== null;
      });
      var primero = focos[0], ultimo = focos[focos.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });

  // celular: deslizar el dedo sobre la imagen cambia de imagen
  // (se mide cuánto se movió el dedo; más de 40px cuenta como deslizar)
  var x0 = null;
  lbImg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lbImg.addEventListener('touchend', function (e) {
    if (x0 === null || actual.fotos < 2) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) mostrar(dx < 0 ? foto + 1 : foto - 1);
    x0 = null;
  });

})();
