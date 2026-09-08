/* usage.js — registro de uso, solo para estudiar la interfaz con datos
   reales en vez de suposiciones.

   TODO SE QUEDA EN ESTE APARATO. No hay red, no hay servidor, no hay
   cuenta. Se guarda en localStorage y no sale de aqui nunca.

   NO registra: imagenes, video, nombres de fichero, texto de subtitulos,
   el tema del reel, contenido de disenos, ni ninguna clave.
   Registra: que accion se toco, cuando, y numeros sueltos (duracion del
   reel, cuantos clips, cuanto tardo una exportacion).

   Para leerlo:  usageReport()   en la consola del navegador
   Para borrarlo: usageClear()
*/
(function () {
  'use strict';
  var KEY = 'kaos-usage-v1';
  var MAX = 3000;              // se descartan los mas viejos
  var buf = [];

  try { buf = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { buf = []; }
  if (!Array.isArray(buf)) buf = [];

  var pend = false;
  function flush() {
    pend = false;
    try {
      if (buf.length > MAX) buf = buf.slice(buf.length - MAX);
      localStorage.setItem(KEY, JSON.stringify(buf));
    } catch (e) { /* cuota llena: se deja de registrar, la app sigue igual */ }
  }
  function save() {
    if (pend) return;
    pend = true;
    setTimeout(flush, 800);
  }

  /* solo se dejan pasar numeros, booleanos y palabras cortas sin espacios;
     asi es imposible que se cuele texto que ella haya escrito */
  function clean(data) {
    if (!data || typeof data !== 'object') return null;
    var out = null;
    for (var k in data) {
      if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
      var v = data[k];
      var ok = null;
      if (typeof v === 'number' && isFinite(v)) ok = Math.round(v * 100) / 100;
      else if (typeof v === 'boolean') ok = v;
      else if (typeof v === 'string' && v.length <= 40) ok = v.slice(0, 40);
      if (ok !== null) { out = out || {}; out[k.slice(0, 20)] = ok; }
    }
    return out;
  }

  function track(ev, data) {
    if (typeof ev !== 'string') return;
    var row = { e: ev.slice(0, 30), t: Date.now() };
    var d = clean(data);
    if (d) row.d = d;
    buf.push(row);
    save();
  }

  /* contexto de la sesion: nada identificativo */
  track('sesion', {
    ancho: window.innerWidth,
    alto: window.innerHeight,
    dpr: window.devicePixelRatio || 1,
    instalada: !!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
      || !!window.navigator.standalone,
    tactil: (navigator.maxTouchPoints || 0) > 0
  });

  /* que se toca. Se guarda el id o la primera clase, nunca el texto */
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest
      ? e.target.closest('button,[role=switch],summary,.pill,.tpl,.blk,.swatch')
      : null;
    if (!el) return;
    var cls = (typeof el.className === 'string' ? el.className : '').split(' ')[0] || '';
    track('tap', { id: el.id || '', cls: cls });
  }, true);

  var t0 = Date.now();
  window.addEventListener('pagehide', function () {
    track('fin', { seg: Math.round((Date.now() - t0) / 1000) });
    flush();
  });

  window.usageTrack = track;

  window.usageClear = function () {
    buf = [];
    try { localStorage.removeItem(KEY); } catch (e) {}
    return 'registro de uso borrado';
  };

  window.usageReport = function () {
    var porEvento = {}, porBoton = {}, exp = [], i, r;
    for (i = 0; i < buf.length; i++) {
      r = buf[i];
      porEvento[r.e] = (porEvento[r.e] || 0) + 1;
      if (r.e === 'tap' && r.d) {
        var k = r.d.id || r.d.cls || '?';
        porBoton[k] = (porBoton[k] || 0) + 1;
      }
      if (r.e === 'export_ok' && r.d) exp.push(r.d);
    }
    var orden = Object.keys(porBoton).sort(function (a, b) { return porBoton[b] - porBoton[a]; });
    var top = {};
    for (i = 0; i < Math.min(15, orden.length); i++) top[orden[i]] = porBoton[orden[i]];
    return {
      registros: buf.length,
      desde: buf.length ? new Date(buf[0].t).toLocaleString('es-ES') : null,
      eventos: porEvento,
      masTocado: top,
      exportaciones: exp
    };
  };

  window.usageExport = function () {
    return JSON.stringify(buf);
  };
})();
