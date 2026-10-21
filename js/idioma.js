/* ==============================================================
   Selector de idioma ES / EN
   --------------------------------------------------------------
   Cómo funciona:
   - Cada texto traducible tiene un atributo con una "clave":
       data-i18n="clave"              -> cambia el texto del elemento
       data-i18n-placeholder="clave"  -> cambia el placeholder
       data-i18n-value="clave"        -> cambia el value (botón enviar)
       data-i18n-wait="clave"         -> cambia el data-wait (texto "Enviando...")
   - Los textos están en el objeto TEXTOS de abajo (es / en).
   - El idioma elegido se guarda en el navegador del visitante.
   Para traducir otra página: agrega los atributos data-i18n a sus
   textos, agrega sus claves aquí y carga este archivo en esa página.
   ============================================================== */
(function () {
  var TEXTOS = {
    es: {
      'page.title': 'Contacto | One Idea',
      'hero.title': 'Contacto',
      'hero.subtitle': 'Escríbenos.',

      'form.name': 'Nombre',
      'form.name.ph': 'Ej. Juan Pérez',
      'form.company': 'Empresa',
      'form.optional': '(opcional)',
      'form.company.ph': 'Ej. Taquería El Guayabo',
      'form.email': 'Email',
      'form.email.ph': 'Ej. juanperez@email.com',
      'form.phone': 'Teléfono',
      'form.phone.ph': 'Ej. 656 123 4567',
      'form.product': 'Producto',
      'form.product.ph': 'Selecciona un producto',
      'form.info': 'Información adicional',
      'form.info.ph': 'Medidas, cantidad, fecha de entrega o cualquier detalle de tu proyecto',
      'form.submit': 'Mandar mensaje',
      'form.sending': 'Enviando...',
      'form.success': '¡Gracias! Recibimos tu mensaje y te contactaremos pronto.',
      'form.error': 'Ocurrió un error al enviar el formulario. Inténtalo de nuevo.',

      'p.lona': 'Lona',
      'p.vinil': 'Vinil',
      'p.stickers': 'Stickers',
      'p.micro': 'Microperforados',
      'p.sublimado': 'Sublimado',
      'p.viniltextil': 'Vinil textil',
      'p.serigrafia': 'Serigrafía',
      'p.dtf': 'DTF',
      'p.dtfv': 'DTF V',
      'p.lienzo': 'Lienzo',
      'p.posters': 'Posters',
      'p.caballete': 'Caballete',
      'p.pvc': 'PVC',
      'p.aranas': 'Arañas',
      'p.coroplast': 'Coroplast',
      'p.otros': 'Otros',
      'form.other': '¿Qué producto necesitas?',
      'form.other.ph': 'Ej. Tazas personalizadas',

      'faq.title': 'Preguntas frecuentes',
      'faq.subtitle': 'Resolvemos tus dudas más comunes.',
      'faq.q1': '¿Qué tipos de servicios ofrecen?',
      'faq.q2': '¿Qué necesitan de mí para empezar un proyecto?',
      'faq.q3': '¿Cuánto tiempo tarda un proyecto?',
      'faq.q4': '¿Cuál es el costo de sus servicios?',
      'faq.q5': '¿Ofrecen revisiones?',

      'footer.tagline': 'Diseñando Historias.',
      'footer.main': 'Principal',
      'footer.pages': 'Páginas'
    },
    en: {
      'page.title': 'Contact | One Idea',
      'hero.title': 'Contact',
      'hero.subtitle': 'Write to us.',

      'form.name': 'Name',
      'form.name.ph': 'e.g. John Smith',
      'form.company': 'Company',
      'form.optional': '(optional)',
      'form.company.ph': 'e.g. Acme Inc.',
      'form.email': 'Email',
      'form.email.ph': 'e.g. john@email.com',
      'form.phone': 'Phone',
      'form.phone.ph': 'e.g. 656 123 4567',
      'form.product': 'Product',
      'form.product.ph': 'Select a product',
      'form.info': 'Additional information',
      'form.info.ph': 'Size, quantity, deadline or any other details about your project',
      'form.submit': 'Send message',
      'form.sending': 'Sending...',
      'form.success': 'Thank you! We received your message and will get back to you soon.',
      'form.error': 'Something went wrong while sending the form. Please try again.',

      'p.lona': 'Banner',
      'p.vinil': 'Vinyl',
      'p.stickers': 'Stickers',
      'p.micro': 'Perforated window film',
      'p.sublimado': 'Sublimation',
      'p.viniltextil': 'Heat transfer vinyl',
      'p.serigrafia': 'Screen printing',
      'p.dtf': 'DTF',
      'p.dtfv': 'DTF V',
      'p.lienzo': 'Canvas',
      'p.posters': 'Posters',
      'p.caballete': 'A-frame sign',
      'p.pvc': 'PVC',
      'p.aranas': 'X-banner stand',
      'p.coroplast': 'Coroplast',
      'p.otros': 'Other',
      'form.other': 'Which product do you need?',
      'form.other.ph': 'e.g. Custom mugs',

      'faq.title': 'FAQ',
      'faq.subtitle': 'Answers to the most common questions.',
      'faq.q1': 'What types of services do you offer?',
      'faq.q2': 'What do you need from me to start a project?',
      'faq.q3': 'How long does it take to complete a project?',
      'faq.q4': 'What is the cost of your services?',
      'faq.q5': 'Do you offer revisions?',

      'footer.tagline': 'Designing Stories.',
      'footer.main': 'Main',
      'footer.pages': 'Pages'
    }
  };

  var CLAVE_GUARDADO = 'oneidea-idioma';
  var IDIOMA_DEFAULT = 'es';

  function leerGuardado() {
    try { return localStorage.getItem(CLAVE_GUARDADO); } catch (e) { return null; }
  }

  function guardar(idioma) {
    try { localStorage.setItem(CLAVE_GUARDADO, idioma); } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }

  function aplicar(idioma) {
    var t = TEXTOS[idioma] || TEXTOS[IDIOMA_DEFAULT];
    document.documentElement.lang = idioma;

    function cada(attr, fn) {
      var els = document.querySelectorAll('[' + attr + ']');
      for (var i = 0; i < els.length; i++) {
        var clave = els[i].getAttribute(attr);
        if (t[clave] !== undefined) fn(els[i], t[clave]);
      }
    }

    cada('data-i18n', function (el, txt) { el.textContent = txt; });
    cada('data-i18n-placeholder', function (el, txt) { el.setAttribute('placeholder', txt); });
    cada('data-i18n-value', function (el, txt) { el.value = txt; });
    cada('data-i18n-wait', function (el, txt) { el.setAttribute('data-wait', txt); });

    var botones = document.querySelectorAll('.lang-option');
    for (var j = 0; j < botones.length; j++) {
      var activo = botones[j].getAttribute('data-lang') === idioma;
      botones[j].classList.toggle('is-active', activo);
      botones[j].setAttribute('aria-pressed', activo ? 'true' : 'false');
    }
  }

  /* Campo libre que aparece al elegir "Otros" en Producto.
     Cuando está oculto se desactiva, así no se envía ni es obligatorio. */
  function iniciarOtros() {
    var select = document.getElementById('producto');
    var wrapper = document.getElementById('producto-otro-wrapper');
    var campo = document.getElementById('producto_otro');
    if (!select || !wrapper || !campo) return;

    function actualizar() {
      var esOtro = select.value === 'Otros';
      wrapper.hidden = !esOtro;
      campo.disabled = !esOtro;
      campo.required = esOtro;
      if (!esOtro) campo.value = '';
    }

    select.addEventListener('change', function () {
      actualizar();
      if (select.value === 'Otros') campo.focus();
    });
    actualizar();
  }

  function iniciar() {
    iniciarOtros();
    var idioma = leerGuardado();
    if (!TEXTOS[idioma]) idioma = IDIOMA_DEFAULT;
    aplicar(idioma);

    var botones = document.querySelectorAll('.lang-option');
    for (var i = 0; i < botones.length; i++) {
      botones[i].addEventListener('click', function () {
        var nuevo = this.getAttribute('data-lang');
        guardar(nuevo);
        aplicar(nuevo);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
