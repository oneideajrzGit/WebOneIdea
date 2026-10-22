/* ==========================================================
   contacto.js — envía el formulario de contact.html a
   php/enviar.php (Hostinger) en lugar de a Webflow.
   ========================================================== */
(function () {
  var form = document.getElementById('email-form');
  if (!form) return;

  var wrapper = form.closest('.w-form');
  var done = wrapper.querySelector('.w-form-done');
  var fail = wrapper.querySelector('.w-form-fail');
  var boton = form.querySelector('[type="submit"]');
  var textoBoton = boton.value;
  var tiempo = form.querySelector('input[name="t"]');
  if (tiempo) tiempo.value = Date.now();

  // Mostrar el campo "¿Qué producto necesitas?" solo con "Otros"
  var producto = document.getElementById('producto');
  var otroWrap = document.getElementById('producto-otro-wrapper');
  var otro = document.getElementById('producto_otro');
  if (producto && otroWrap && otro) {
    producto.addEventListener('change', function () {
      var esOtro = producto.value === 'Otros';
      otroWrap.hidden = !esOtro;
      otro.disabled = !esOtro;
      otro.required = esOtro;
      if (esOtro) otro.focus();
    });
  }

  // Fase de captura: se ejecuta antes que Webflow y lo detiene
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    fail.style.display = 'none';
    boton.disabled = true;
    boton.value = boton.getAttribute('data-wait') || 'Enviando...';

    fetch(form.getAttribute('action'), {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.error || 'Error');
        form.style.display = 'none';
        done.style.display = 'block';
      })
      .catch(function () {
        fail.style.display = 'block';
      })
      .finally(function () {
        boton.disabled = false;
        boton.value = textoBoton;
      });
  }, true);
})();
