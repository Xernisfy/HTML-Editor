(function () {
  'use strict';
  var d = document,
    ht = d.documentElement,
    ov = 'focus mouseover',
    lv = 'blur mouseleave',
    color = {
      tp: 'transparent',
      fg: '#000000',
      bg: '#ffffff',
      tabBorder: '#dadbdc',
      windowBorder: '#000000',
      navButtonHover: '#e5e5e5',
      navButtonHoverX: '#e81123',
      menuFile: '#1979ca',
      menuFileHover: '#298ce1'
    };
  function a(p, c) {
    p.appendChild(c);
  }
  function s(o, s) {
    function t(p, v) {
      for (var k in v) {
        if (v[k].constructor.name === 'Object') {
          t(p[k], v[k]);
        } else {
          p[k] = v[k];
        }
      }
    }
    t(o, s);
  }
  function cr(t, pa, at) {
    var e = d.createElement(t);
    if (pa) {
      a(pa, e);
    }
    if (at) {
      s(e, at);
    }
    return e;
  }
  function px(n) {
    n = n || 0;
    return n + 'px';
  }
  function nm(n) {
    return parseInt(n.replace('px', ''));
  }
  function p(n) {
    n = n || 100;
    return n + '% ';
  }
  function ael(t, e, f) {
    var l = e.split(' ');
    for (var el in l) {
      t.addEventListener(l[el], f);
    }
  }
  function rel(t, e, f) {
    t.removeEventListener(e, f);
  }
  function bd(c) {
    c = c || color.tp;
    return px(1) + ' solid ' + c;
  }
  function ly(pa) {
    var d = cr('div', pa, {
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
  function rh(w, c, at) {
    var o = cr('div', false, {
      draggable: 'true',
      style: {
        position: 'absolute',
        cursor: c + '-resize',
        backgroundColor: color.tp,
        MozUserSelect: 'none'
      }
    }),
      l = ly(d.body),
      dh = 0,
      dl = 0,
      dt = 0,
      dw = 0,
      dx = 0,
      dy = 0;
    if (c === 'ew') {
      o.style.height = p();
    } else {
      o.style.height = px(8);
    }
    if (c === 'ns') {
      o.style.width = p();
    } else {
      o.style.width = px(8);
    }
    function resize(e) {
      if (c.includes('n') || c.includes('s')) {
        if (dt + (dh / 2) > dy) {
          w.style.height = px(Math.min(dh + dt, Math.max(9 * 20 - 2, dh - (e.clientY - dy))));
          w.style.top = px(Math.min(dh + dt - (9 * 20 - 2), Math.max(0, dt + (e.clientY - dy))));
        } else {
          w.style.height = px(Math.min(innerHeight - dt - 2, Math.max(9 * 20 - 2, dh + (e.clientY - dy))));
        }
      }
      if (c.includes('e') || c.includes('w')) {
        if (dl + (dw / 2) > dx) {
          w.style.width = px(Math.min(dw + dl, Math.max(16 * 20 - 2, dw - (e.clientX - dx))));
          w.style.left = px(Math.min(dw + dl - (16 * 20 - 2), Math.max(0, dl + (e.clientX - dx))));
        } else {
          w.style.width = px(Math.min(innerWidth - dl - 2, Math.max(16 * 20 - 2, dw + (e.clientX - dx))));
        }
      }
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
    s(o, at);
    return o;
  }
  function ch(w) {
    var o = {
      top: rh(w, 'ns', { style: { top: px(-8) } }),
      topRight: rh(w, 'nesw', { style: { top: px(-8), right: px(-8) } }),
      right: rh(w, 'ew', { style: { right: px(-8) } }),
      bottomRight: rh(w, 'nwse', { style: { bottom: px(-8), right: px(-8) } }),
      bottom: rh(w, 'ns', { style: { bottom: px(-8) } }),
      bottomLeft: rh(w, 'nesw', { style: { bottom: px(-8), left: px(-8) } }),
      left: rh(w, 'ew', { style: { left: px(-8) } }),
      topLeft: rh(w, 'nwse', { style: { top: px(-8), left: px(-8) } })
    };
    return o;
  }
  function tb(t, pa, n) {
    var v = cr('button', pa, {
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
          height: px(22),
          color: color.bg,
          backgroundColor: color.menuFile,
          border: bd()
        }
      });
    } else {
      s(v, {
        style: {
          color: color.fg + 'a0',
          border: bd(color.tabBorder),
          borderBottom: 'none'
        }
      });
    }
    return v;
  }
  function tf(t, p, f) {
    ael(t, ov, function () {
      s(t, {
        style: {
          border: bd(color.tabBorder),
          borderBottom: 'none'
        }
      });
    });
    ael(t, lv, function () {
      if (p.style.display === 'none') {
        s(t, {
          style: {
            border: bd(),
            borderBottom: 'none'
          }
        });
      }
    });
    ael(t, 'click', f);
  }
  function pl(pa) {
    var v = cr('textarea', pa, {
      style: {
        display: 'none',
        height: p(),
        width: p(),
        fontFamily: 'monospace',
        color: color.fg,
        backgroundColor: color.bg,
        whiteSpace: 'pre'
      }
    });
    return v;
  }
  function ub(pa) {
    var b = cr('button', pa, {
      style: {
        height: px(29),
        width: px(45),
        border: 'none',
        padding: px(),
        backgroundColor: color.bg
      }
    }),
      c = cr('canvas', b, {
        height: 29,
        width: 45,
        style: {
          backgroundColor: color.tp
        }
      }),
      cx = c.getContext('2d');
    return { b: b, c: c, cx: cx };
  }
  ael(d, 'DOMContentLoaded', function () {
    var dx = 0,
      dy = 0,
      ratio = 40,
      o = cr('iframe', d.body, {
        style: {
          height: p(),
          width: p()
        }
      }),
      l = ly(d.body),
      w = cr('div', d.body, {
        style: {
          height: px(9 * ratio - 2),
          width: px(16 * ratio - 2),
          top: px(9 * 8),
          left: px(16 * 8),
          position: 'absolute',
          border: bd(color.windowBorder + '55')
        }
      }),
      rh = ch(w),
      t = cr('nav', w, {
        draggable: 'true',
        style: {
          MozUserSelect: 'none',
          display: 'block',
          backgroundColor: color.bg,
          height: px(30),
          width: p()
        }
      }),
      i = cr('img', t, {
        src: 'png/icon.png',
        ondragstart: function () { return false; },
        style: {
          margin: px(6) + ' ' + px(6) + ' ' + px(8) + ' ' + px(8)
        }
      }),
      b = cr('div', t, {
        style: {
          position: 'absolute',
          display: 'block',
          top: 0,
          right: 0
        }
      }),
      mi = ub(b),
      ma = ub(b),
      cl = ub(b),
      m = cr('nav', w, {
        style: {
          MozUserSelect: 'none',
          display: 'block',
          height: px(23),
          width: p(),
          backgroundColor: color.bg,
          borderBottom: bd(color.tabBorder)
        }
      }),
      f = tb('File', m, true),
      tx = cr('div', w, {
        style: {
          position: 'absolute',
          display: 'block',
          top: px(nm(t.style.height) + nm(m.style.height) + 1),
          height: 'calc(100% - ' + px(nm(t.style.height) + nm(m.style.height) + 1) + ')',
          width: '100%'
        }
      }),
      xh = pl(tx),
      xj = pl(tx),
      xc = pl(tx),
      xr = pl(tx),
      h = tb('html', m),
      j = tb('js', m),
      c = tb('css', m),
      r = tb('raw', m);
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
    ael(o, 'load', function () {
      var cd = o.contentDocument;
      if (cd) {
        d.title = cd.title;
      }
    });
    ael(w, 'mouseover', function () {
      w.style.border = bd(color.windowBorder + 'a0');
    });
    ael(w, 'mouseleave', function () {
      w.style.border = bd(color.windowBorder + '55');
    });
    ael(self, 'resize', function () {
      if (nm(w.style.left) + nm(w.style.width) + 0 > innerWidth) {
        if (nm(w.style.left) > 0) {
          w.style.left = px(Math.max(0, innerWidth - nm(w.style.width) - 2));
        } else {
          w.style.width = px(Math.max(16 * 20 - 2, innerWidth));
        }
      }
      if (nm(w.style.top) + nm(w.style.height) + 0 > innerHeight) {
        if (nm(w.style.top) > 0) {
          w.style.top = px(Math.max(0, innerHeight - nm(w.style.height) - 2));
        } else {
          w.style.height = px(Math.max(9 * 20 - 2, innerHeight));
        }
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
    mi.cx.translate(0, 0.5);
    mi.cx.beginPath();
    mi.cx.moveTo(18, 14);
    mi.cx.lineTo(28, 14);
    mi.cx.stroke();
    ael(mi.b, ov, function () {
      mi.b.style.backgroundColor = color.navButtonHover;
    });
    ael(mi.b, lv, function () {
      mi.b.style.backgroundColor = color.bg;
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
      ma.b.style.backgroundColor = color.navButtonHover;
    });
    ael(ma.b, lv, function () {
      ma.b.style.backgroundColor = color.bg;
    });
    function drawX(c) {
      cl.cx.clearRect(0, 0, cl.c.width, cl.c.height);
      cl.cx.strokeStyle = c;
      cl.cx.beginPath();
      cl.cx.moveTo(17, 9);
      cl.cx.lineTo(27, 19);
      cl.cx.moveTo(17, 19);
      cl.cx.lineTo(27, 9);
      cl.cx.stroke();
    }
    drawX(color.fg);
    ael(cl.b, ov, function () {
      cl.b.style.backgroundColor = color.navButtonHoverX;
      drawX(color.bg);
    });
    ael(cl.b, lv, function () {
      cl.b.style.backgroundColor = color.bg;
      drawX(color.fg);
    });
    ael(f, ov, function () {
      f.style.backgroundColor = color.menuFileHover;
    });
    ael(f, lv, function () {
      f.style.backgroundColor = color.menuFile;
    });
    function refresh() {
      function appendCode(d, c) {
        var head = /(\s+)(<\/head>)/,
          body = /\s+<\/body>/;
        if (d.match(head)) {
          return d.replace(head, '$1  ' + c + '$1$2');
        } else if (d.match(body)) {
          return d.replace(body, '$1  ' + c + '$1$2');
        } else {
          return d + c;
        }
      }
      var doc = xh.value;
      if (xj.value) {
        var scr = cr('script');
        scr.type = 'text/javascript';
        scr.innerHTML = xj.value;
        doc = appendCode(doc, scr.outerHTML);
      }
      if (xc.value) {
        var sty = cr('style');
        sty.type = 'text/css';
        sty.innerHTML = xc.value;
        doc = appendCode(doc, sty.outerHTML);
      }
      var ms = 0;
      console.clear();
      ms = Date.now();
      o.onload = function () {
        console.log('DOMContentLoaded: ' + (Date.now() - ms) + 'ms');
      };
      o.srcdoc = doc;
      xr.innerHTML = doc;
    }
    function key(e, o) {
      var str, end;
      switch (e.key) {
        case "Tab":
          e.preventDefault();
          str = o.selectionStart;
          end = o.selectionEnd;
          var tab = "";
          if (o.value.substring(Math.max(0, o.value.substring(0, str).lastIndexOf('\n') + 1), str).length % 2 === 0) {
            tab = "  ";
          } else {
            tab = " ";
          }
          o.value = o.value.substring(0, str) + tab + o.value.substring(end, o.value.length);
          o.selectionStart = str + tab.length;
          o.selectionEnd = str + tab.length;
          refresh();
          break;
        case "Enter":
          e.preventDefault();
          str = o.selectionStart;
          end = o.selectionEnd;
          var linebreak = "\n";
          o.value = o.value.substring(0, str) + linebreak + o.value.substring(end, o.value.length);
          o.selectionStart = str + linebreak.length;
          o.selectionEnd = str + linebreak.length;
          refresh();
          break;
        default:
          break;
      }
    }
    xh.innerHTML = '<!doctype html>\n<html>\n  <head>\n    <title>HTML - Editor</title>\n    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>\n  </head>\n  <body></body>\n</html>';
    ael(xh, 'input', refresh);
    ael(xh, 'keydown', function (e) {
      key(e, xh);
    });
    xj.innerHTML = '(function () {\n  \'use strict\';\n  document.addEventListener(\'DOMContentLoaded\', function () {\n    \n  });\n})();';
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
    function activate(active, inactives) {
      active[0].style.display = 'block';
      active[0].focus();
      active[1].style.backgroundColor = color.bg;
      for (var i in inactives) {
        inactives[i][0].style.display = 'none';
        inactives[i][1].style.backgroundColor = color.bg + '00';
        inactives[i][1].style.border = bd();
        inactives[i][1].style.borderBottom = 'none';
      }
    }
    tf(h, xh, function () {
      activate([xh, h], [[xj, j], [xc, c], [xr, r]]);
    });
    tf(j, xj, function () {
      activate([xj, j], [[xh, h], [xc, c], [xr, r]]);
    });
    tf(c, xc, function () {
      activate([xc, c], [[xh, h], [xj, j], [xr, r]]);
    });
    tf(r, xr, function () {
      activate([xr, r], [[xh, h], [xj, j], [xc, c]]);
      xr.selectionStart = 0;
      xr.selectionEnd = xr.value.length;
    });
    activate([xh, h], [[xj, j], [xc, c], [xr, r]]);
  });
})();
