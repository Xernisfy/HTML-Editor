(function () {
  'use strict';
  var d = document,
    ht = d.documentElement,
    tp = 'transparent',
    ov = 'focus mouseover',
    lv = 'blur mouseleave',
    fg = '#000000',
    bg = '#ffffff';
  function cr(t) {
    return d.createElement(t);
  }
  function s(o, s) {
    function t(p, v) {
      for (let k in v) {
        if (v[k].constructor.name === 'Object') {
          t(p[k], v[k]);
        } else {
          p[k] = v[k];
        };
      };
    }
    t(o, s);
  }
  function a(p, c) {
    p.appendChild(c);
  }
  function px(n = 0) {
    return n + 'px';
  }
  function nm(n) {
    return parseInt(n.replace('px', ''));
  }
  function p(n) {
    return (n ? n : 100) + '% ';
  }
  function ael(t, e, f) {
    var l = e.split(' ');
    for (let el of l) {
      t.addEventListener(el, f);
    };
  }
  function rel(t, e, f) {
    t.removeEventListener(e, f);
  }
  function bd(c) {
    return px(1) + ' solid ' + c;
  }
  function ly() {
    var d = cr('div');
    s(d, {
      style: {
        top: px(),
        display: 'none',
        position: 'fixed',
        height: p(),
        width: p()
      }
    });
    return d;
  }
  function rh(w, c) {
    var o = cr('div'),
      l = ly(),
      dh = 0,
      dl = 0,
      dt = 0,
      dw = 0,
      dx = 0,
      dy = 0;
    a(d.body, l);
    if (c === 'ew') {
      o.style.height = p();
    } else {
      o.style.height = px(8);
    };
    if (c === 'ns') {
      o.style.width = p();
    } else {
      o.style.width = px(8);
    };
    s(o, {
      draggable: 'true',
      style: {
        position: 'absolute',
        cursor: c + '-resize',
        backgroundColor: tp,
        MozUserSelect: 'none'
      }
    });
    function resize(e) {
      if (c.includes('n') || c.includes('s')) {
        if (dt + (dh / 2) > dy) {
          w.style.height = px(Math.min(dh + dt, Math.max(9 * 20 - 2, dh - (e.clientY - dy))));
          w.style.top = px(Math.min(dh + dt - (9 * 20 - 2), Math.max(0, dt + (e.clientY - dy))));
        } else {
          w.style.height = px(Math.min(innerHeight - dt - 2, Math.max(9 * 20 - 2, dh + (e.clientY - dy))));
        };
      };
      if (c.includes('e') || c.includes('w')) {
        if (dl + (dw / 2) > dx) {
          w.style.width = px(Math.min(dw + dl, Math.max(16 * 20 - 2, dw - (e.clientX - dx))));
          w.style.left = px(Math.min(dw + dl - (16 * 20 - 2), Math.max(0, dl + (e.clientX - dx))));
        } else {
          w.style.width = px(Math.min(innerWidth - dl - 2, Math.max(16 * 20 - 2, dw + (e.clientX - dx))));
        };
      };
    }
    ael(o, 'mousedown', function (e) {
      dh = nm(w.style.height);
      dl = nm(w.style.left);
      dt = nm(w.style.top);
      dw = nm(w.style.width);
      dx = e.clientX;
      dy = e.clientY;
      l.style.display = 'block';
      ael(d, 'mousemove', resize);
    });
    ael(d, 'mouseup', function () {
      l.style.display = 'none';
      rel(d, 'mousemove', resize);
    });
    a(w, o);
    return o;
  }
  function ch(w) {
    var o = {
      top: rh(w, 'ns'),
      topRight: rh(w, 'nesw'),
      right: rh(w, 'ew'),
      bottomRight: rh(w, 'nwse'),
      bottom: rh(w, 'ns'),
      bottomLeft: rh(w, 'nesw'),
      left: rh(w, 'ew'),
      topLeft: rh(w, 'nwse')
    };
    s(o, {
      top: { style: { top: px(-8) } },
      topRight: { style: { top: px(-8), right: px(-8) } },
      right: { style: { right: px(-8) } },
      bottomRight: { style: { bottom: px(-8), right: px(-8) } },
      bottom: { style: { bottom: px(-8) } },
      bottomLeft: { style: { bottom: px(-8), left: px(-8) } },
      left: { style: { left: px(-8) } },
      topLeft: { style: { top: px(-8), left: px(-8) } }
    });
    return o;
  }
  function tb(t, n = true) {
    var v = cr('button');
    s(v, {
      innerHTML: t,
      style: {
        float: 'left',
        display: 'block',
        height: p(),
        width: px(56),
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: '9pt'
      }
    });
    if (n) {
      s(v, {
        style: {
          color: fg + 'a0',
          border: bd('#dadbdc'),
          borderBottom: 'none'
        }
      });
    };
    return v;
  }
  function tf(t, p, f) {
    ael(t, ov, function () {
      s(t, {
        style: {
          border: bd('#dadbdc'),
          borderBottom: 'none'
        }
      });
    });
    ael(t, lv, function () {
      if (p.style.display === 'none') {
        s(t, {
          style: {
            border: bd(tp),
            borderBottom: 'none'
          }
        });
      };
    });
    ael(t, 'click', f);
  }
  function pl() {
    var v = cr('textarea');
    s(v, {
      style: {
        display: 'none',
        height: p(),
        width: p(),
        fontFamily: 'monospace',
        color: fg,
        backgroundColor: bg,
        whiteSpace: 'pre'
      }
    });
    return v;
  }
  function ub(p) {
    var b = cr('button'),
      c = cr('canvas'),
      cx = c.getContext('2d');
    a(p, b);
    a(b, c);
    b.style.height = px(29);
    b.style.width = px(45);
    b.style.border = 'none';
    b.style.padding = px();
    b.style.backgroundColor = '#ffffff';
    c.height = '29';
    c.width = '45';
    c.style.backgroundColor = tp;
    return { 'b': b, 'c': c, 'cx': cx };
  }
  ael(d, 'DOMContentLoaded', function () {
    var dx = 0,
      dy = 0,
      ratio = 40,
      l = ly(),
      o = cr('iframe'),
      w = cr('div'),
      rh = ch(w),
      t = cr('nav'),
      i = cr('img'),
      b = cr('div'),
      mi = ub(b),
      ma = ub(b),
      cl = ub(b),
      m = cr('nav'),
      f = tb('Datei', false),
      tx = cr('div'),
      xh = pl(),
      xj = pl(),
      xc = pl(),
      xr = pl(),
      h = tb('html'),
      j = tb('js'),
      c = tb('css'),
      r = tb('raw');
    a(d.body, o);
    a(d.body, l);
    a(d.body, w);
    a(w, t);
    a(t, i);
    a(t, b);
    a(w, m);
    a(m, f);
    a(m, h);
    a(m, j);
    a(m, c);
    a(m, r);
    a(w, tx);
    a(tx, xh);
    a(tx, xj);
    a(tx, xc);
    a(tx, xr);
    s(ht, {
      style: {
        height: p(),
        width: p()
      }
    });
    s(d, {
      body: {
        style: {
          height: p(),
          width: p(),
          overflow: 'hidden'
        }
      }
    });
    s(o, {
      style: {
        height: p(),
        width: p()
      }
    });
    ael(o, 'load', function () {
      var cd = o.contentDocument;
      if (cd) {
        d.title = cd.title;
      };
    });
    s(w, {
      style: {
        height: px(9 * ratio - 2),
        width: px(16 * ratio - 2),
        top: px(9 * 8),
        left: px(16 * 8),
        position: 'absolute',
        border: bd('#000000' + '55')
      }
    });
    ael(w, 'mouseover', function () {
      w.style.border = bd('#000000' + 'a0');
    });
    ael(w, 'mouseleave', function () {
      w.style.border = bd('#000000' + '55');
    });
    ael(self, 'resize', function () {
      if (nm(w.style.left) + nm(w.style.width) + 2 > innerWidth) {
        w.style.left = px(Math.max(0, innerWidth - nm(w.style.width) - 2));
      };
      if (nm(w.style.top) + nm(w.style.height) + 2 > innerHeight) {
        w.style.top = px(Math.max(0, innerHeight - nm(w.style.height) - 2));
      };
    });
    s(t, {
      draggable: 'true',
      style: {
        MozUserSelect: 'none',
        display: 'block',
        backgroundColor: '#ffffff',
        height: px(30),
        width: p()
      }
    });
    function move(e) {
      w.style.left = px(Math.min(innerWidth - nm(w.style.width) - 2, Math.max(0, e.clientX - dx)));
      w.style.top = px(Math.min(innerHeight - nm(w.style.height) - 2, Math.max(0, e.clientY - dy)));
    }
    ael(t, 'mousedown', function (e) {
      dx = e.clientX - nm(w.style.left);
      dy = e.clientY - nm(w.style.top);
      l.style.display = 'block';
      ael(d, 'mousemove', move);
    });
    ael(d, 'mouseup', function () {
      l.style.display = 'none';
      rel(d, 'mousemove', move);
    });
    s(i, {
      src: 'png/icon.png',
      ondragstart: function () { return false; },
      style: {
        margin: px(6) + ' ' + px(6) + ' ' + px(8) + ' ' + px(8)
      }
    });
    s(b, {
      style: {
        position: 'absolute',
        display: 'block',
        top: 0,
        right: 0
      }
    });
    mi.cx.translate(0, 0.5);
    mi.cx.beginPath();
    mi.cx.moveTo(18, 14);
    mi.cx.lineTo(28, 14);
    mi.cx.stroke();
    ael(mi.b, ov, function () {
      mi.b.style.backgroundColor = '#e5e5e5';
    });
    ael(mi.b, lv, function () {
      mi.b.style.backgroundColor = '#ffffff';
    });
    ma.b.style.margin = px() + ' ' + px(1);
    ma.cx.translate(0.5, 0.5);
    ma.cx.beginPath();
    ma.cx.moveTo(17, 9);
    ma.cx.lineTo(26, 9);
    ma.cx.lineTo(26, 18);
    ma.cx.lineTo(17, 18);
    ma.cx.lineTo(17, 9);
    ma.cx.lineTo(26, 9);
    ma.cx.stroke();
    ael(ma.b, ov, function () {
      ma.b.style.backgroundColor = '#e5e5e5';
    });
    ael(ma.b, lv, function () {
      ma.b.style.backgroundColor = '#ffffff';
    });
    function drawX(c) {
      cl.cx.clearRect(0, 0, cl.c.width, cl.c.height);
      cl.cx.beginPath();
      cl.cx.moveTo(17, 9);
      cl.cx.lineTo(27, 19);
      cl.cx.strokeStyle = c;
      cl.cx.stroke();
      cl.cx.beginPath();
      cl.cx.moveTo(17, 19);
      cl.cx.lineTo(27, 9);
      cl.cx.strokeStyle = c;
      cl.cx.stroke();
    }
    drawX('#000000');
    ael(cl.b, ov, function () {
      cl.b.style.backgroundColor = '#e81123';
      drawX('#ffffff');
    });
    ael(cl.b, lv, function () {
      cl.b.style.backgroundColor = '#ffffff';
      drawX('#000000');
    });
    s(m, {
      style: {
        MozUserSelect: 'none',
        display: 'block',
        height: px(23),
        width: p(),
        backgroundColor: '#ffffff',
        borderBottom: bd('#dadbdc')
      }
    });
    s(f, {
      style: {
        height: px(22),
        color: '#ffffff',
        backgroundColor: '#1979ca',
        border:bd(tp)
      }
    });
    ael(f, ov, function () {
      f.style.backgroundColor = '#298ce1';
    });
    ael(f, lv, function () {
      f.style.backgroundColor = '#1979ca';
    });
    s(tx, {
      style: {
        position: 'absolute',
        display: 'block',
        top: px(nm(t.style.height) + nm(m.style.height) + 1),
        height: 'calc(100% - ' + px(nm(t.style.height) + nm(m.style.height) + 1) + ')',
        width:'100%'
      }
    });
    function refresh() {
      var doc = xh.value;
      if (xj.value) {
        var scr = document.createElement('script');
        scr.type = 'text/javascript';
        scr.innerHTML = xj.value;
        doc += '\n' + scr.outerHTML;
      };
      if (xc.value) {
        var sty = document.createElement('style');
        sty.type = 'text/css';
        sty.innerHTML = xc.value;
        doc += '\n' + sty.outerHTML;
      };
      console.clear();
      console.time('DOMContentLoaded');
      o.srcdoc = doc;
      o.contentWindow.addEventListener('load', function() {
        o.contentDocument.addEventListener('DOMContentLoaded', function() {
          console.timeEnd('DOMContentLoaded');
        })
      })
      xr.innerHTML = doc;
    }
    function key(e, o) {
      switch (e.key) {
        case "Tab":
          e.preventDefault();
          var str = o.selectionStart;
          var end = o.selectionEnd;
          var tab = "";
          if (o.value.substring(Math.max(0, o.value.substring(0, str).lastIndexOf('\n') + 1), str).length % 2 === 0) {
            tab = "  ";
          } else {
            tab = " ";
          };
          o.value = o.value.substring(0, str) + tab + o.value.substring(end, o.value.length);
          o.selectionStart = str + tab.length;
          o.selectionEnd = str + tab.length;
          refresh();
          break;
        case "Enter":
          e.preventDefault();
          var str = o.selectionStart;
          var end = o.selectionEnd;
          var linebreak = "\n";
          o.value = o.value.substring(0, str) + linebreak + o.value.substring(end, o.value.length);
          o.selectionStart = str + linebreak.length;
          o.selectionEnd = str + linebreak.length;
          refresh();
          break;
        default:
          break;
      };
    };
    xh.innerHTML = '<!doctype html>\n<html>\n  <head>\n    <title>HTML - Editor</title>\n    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>\n  </head>\n  <body></body>\n</html>';
    ael(xh, 'input', refresh);
    ael(xh, 'keydown', function (e) {
      key(e, xh);
    });
    xj.innerHTML = '(function () {\n  \'use strict\';\n  document.addEventListener(\'DOMContentLoaded\',function () {\n    \n  });\n}());';
    ael(xj, 'input', refresh);
    ael(xj, 'keydown', function (e) {
      key(e, xj);
    });
    xc.innerHTML = '* {\n  \n}';
    ael(xc, 'input', refresh);
    ael(xc, 'keydown', function (e) {
      key(e, xc);
    });
    xr.readonly = 'readonly';
    refresh();
    function activate(e1, e2) {
      e1.style.display = 'block';
      e1.focus();
      e2.style.backgroundColor = bg;
    }
    function deactivate(e1, e2) {
      e1.style.display = 'none';
      e2.style.backgroundColor = bg + '00';
      e2.style.border = bd(tp);
      e2.style.borderBottom = 'none';
    }
    tf(h, xh, function () {
      activate(xh, h);
      deactivate(xj, j);
      deactivate(xc, c);
      deactivate(xr, r);
    });
    tf(j, xj, function () {
      deactivate(xh, h);
      activate(xj, j);
      deactivate(xc, c);
      deactivate(xr, r);
    });
    tf(c, xc, function () {
      deactivate(xh, h);
      deactivate(xj, j);
      activate(xc, c);
      deactivate(xr, r);
    });
    tf(r, xr, function () {
      deactivate(xh, h);
      deactivate(xj, j);
      deactivate(xc, c);
      activate(xr, r);
      xr.selectionStart = 0;
      xr.selectionEnd = xr.value.length;
    });
    activate(xh, h);
    deactivate(xj, j);
    deactivate(xc, c);
    deactivate(xr, r);
  });
}());
