(function () {
  'use strict';
  var d = document,
    ht = d.documentElement,
    tp = 'transparent',
    ov = 'focus mouseover',
    lv = 'blur mouseleave',
    fg = '#000000',
    bg = '#ffffff';
  function create(tag) {
    return d.createElement(tag);
  }
  function setAttributes(object, attributes) {
    function traverse(parent, value) {
      for (let key in value) {
        if (value[key].constructor.name === 'Object') {
          traverse(parent[key], value[key]);
        } else {
          parent[key] = value[key];
        };
      };
    }
    traverse(object, attributes);
  }
  function append(parent, child) {
    parent.appendChild(child);
  }
  function pixel(number = 0) {
    return number + 'px';
  }
  function number(string) {
    return parseInt(string.replace('px', ''));
  }
  function percent(number) {
    return (number ? number : 100) + '% ';
  }
  function addEventListeners(target, events, callback) {
    var eventList = events.split(' ');
    for (let event of eventList) {
      target.addEventListener(event, callback);
    };
  }
  function removeEventListeners(target, event, callback) {
    target.removeEventListener(event, callback);
  }
  function border(color) {
    return pixel(1) + ' solid ' + color;
  }
  function layer() {
    let div = create('div');
    setAttributes(d, {
      style: {
        top: pixel(),
        display: 'none',
        position: 'fixed',
        height: percent(),
        width: percent()
      }
    });
    return div;
  }
  function resizeHandle(window, direction) {
    var handle = create('div'),
      l = layer(),
      dh = 0,
      dl = 0,
      dt = 0,
      dw = 0,
      dx = 0,
      dy = 0;
    append(d.body, l);
    if (direction === 'ew') {
      handle.style.height = percent();
    } else {
      handle.style.height = pixel(8);
    };
    if (direction === 'ns') {
      handle.style.width = percent();
    } else {
      handle.style.width = pixel(8);
    };
    setAttributes(handle, {
      draggable: 'true',
      style: {
        position: 'absolute',
        cursor: direction + '-resize',
        backgroundColor: tp,
        MozUserSelect: 'none'
      }
    });
    function resize(e) {
      if (direction.includes('n') || direction.includes('s')) {
        if (dt + (dh / 2) > dy) {
          window.style.height = pixel(Math.min(dh + dt, Math.max(9 * 20 - 2, dh - (e.clientY - dy))));
          window.style.top = pixel(Math.min(dh + dt - (9 * 20 - 2), Math.max(0, dt + (e.clientY - dy))));
        } else {
          window.style.height = pixel(Math.min(innerHeight - dt - 2, Math.max(9 * 20 - 2, dh + (e.clientY - dy))));
        };
      };
      if (direction.includes('e') || direction.includes('w')) {
        if (dl + (dw / 2) > dx) {
          window.style.width = pixel(Math.min(dw + dl, Math.max(16 * 20 - 2, dw - (e.clientX - dx))));
          window.style.left = pixel(Math.min(dw + dl - (16 * 20 - 2), Math.max(0, dl + (e.clientX - dx))));
        } else {
          window.style.width = pixel(Math.min(innerWidth - dl - 2, Math.max(16 * 20 - 2, dw + (e.clientX - dx))));
        };
      };
    }
    addEventListeners(handle, 'mousedown', function (e) {
      dh = number(window.style.height);
      dl = number(window.style.left);
      dt = number(window.style.top);
      dw = number(window.style.width);
      dx = e.clientX;
      dy = e.clientY;
      l.style.display = 'block';
      addEventListeners(d, 'mousemove', resize);
    });
    addEventListeners(d, 'mouseup', function () {
      l.style.display = 'none';
      removeEventListeners(d, 'mousemove', resize);
    });
    append(window, handle);
    return handle;
  }
  function createHandles(window) {
    var frame = {
      top: resizeHandle(window, 'ns'),
      topRight: resizeHandle(window, 'nesw'),
      right: resizeHandle(window, 'ew'),
      bottomRight: resizeHandle(window, 'nwse'),
      bottom: resizeHandle(window, 'ns'),
      bottomLeft: resizeHandle(window, 'nesw'),
      left: resizeHandle(window, 'ew'),
      topLeft: resizeHandle(window, 'nwse')
    };
    setAttributes(frame, {
      top: { style: { top: pixel(-8) } },
      topRight: { style: { top: pixel(-8), right: pixel(-8) } },
      right: { style: { right: pixel(-8) } },
      bottomRight: { style: { bottom: pixel(-8), right: pixel(-8) } },
      bottom: { style: { bottom: pixel(-8) } },
      bottomLeft: { style: { bottom: pixel(-8), left: pixel(-8) } },
      left: { style: { left: pixel(-8) } },
      topLeft: { style: { top: pixel(-8), left: pixel(-8) } }
    });
    return frame;
  }
  function createTab(text, normal = true) {
    var tab = create('button');
    setAttributes(tab, {
      innerHTML: text,
      style: {
        float: 'left',
        display: 'block',
        height: percent(),
        width: pixel(56),
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: '9pt'
      }
    });
    if (normal) {
      setAttributes(tab, {
        style: {
          color: fg + 'a0',
          border: border('#dadbdc'),
          borderBottom: 'none'
        }
      });
    };
    return tab;
  }
  function tabFunctions(tab, panel, callback) {
    addEventListeners(tab, ov, function () {
      setAttributes(tab, {
        style: {
          border: border('#dadbdc'),
          borderBottom: 'none'
        }
      });
    });
    addEventListeners(tab, lv, function () {
      if (panel.style.display === 'none') {
        setAttributes(tab, {
          style: {
            border: border(tp),
            borderBottom: 'none'
          }
        });
      };
    });
    addEventListeners(tab, 'click', callback);
  }
  function createTextarea() {
    var textarea = create('textarea');
    setAttributes(textarea, {
      style: {
        display: 'none',
        height: percent(),
        width: percent(),
        fontFamily: 'monospace',
        color: fg,
        backgroundColor: bg,
        whiteSpace: 'pre'
      }
    });
    return textarea;
  }
  function createUIButton(panel) {
    var button = create('button'),
      canvas = create('canvas'),
      context = canvas.getContext('2d');
    append(panel, button);
    append(button, canvas);
    button.style.height = pixel(29);
    button.style.width = pixel(45);
    button.style.border = 'none';
    button.style.padding = pixel();
    button.style.backgroundColor = '#ffffff';
    canvas.height = '29';
    canvas.width = '45';
    canvas.style.backgroundColor = tp;
    return { 'b': button, 'c': canvas, 'cx': context };
  }
  addEventListeners(d, 'DOMContentLoaded', function () {
    var dx = 0,
      dy = 0,
      ratio = 40,
      l = layer(),
      output = create('iframe'),
      window = create('div'),
      frame = createHandles(window),
      navPanel = create('nav'),
      icon = create('img'),
      buttonPanel = create('div'),
      mi = createUIButton(buttonPanel),
      ma = createUIButton(buttonPanel),
      cl = createUIButton(buttonPanel),
      menuPanel = create('nav'),
      fileTab = createTab('Datei', false),
      editorPanel = create('div'),
      htmlArea = createTextarea(),
      jsArea = createTextarea(),
      cssArea = createTextarea(),
      rawArea = createTextarea(),
      htmlTab = createTab('html'),
      jsTab = createTab('js'),
      cssTab = createTab('css'),
      rawTab = createTab('raw');
    append(d.body, output);
    append(d.body, l);
    append(d.body, window);
    append(window, navPanel);
    append(navPanel, icon);
    append(navPanel, buttonPanel);
    append(window, menuPanel);
    append(menuPanel, fileTab);
    append(menuPanel, htmlTab);
    append(menuPanel, jsTab);
    append(menuPanel, cssTab);
    append(menuPanel, rawTab);
    append(window, editorPanel);
    append(editorPanel, htmlArea);
    append(editorPanel, jsArea);
    append(editorPanel, cssArea);
    append(editorPanel, rawArea);
    setAttributes(ht, {
      style: {
        height: percent(),
        width: percent()
      }
    });
    setAttributes(d, {
      body: {
        style: {
          height: percent(),
          width: percent(),
          overflow: 'hidden'
        }
      }
    });
    setAttributes(output, {
      style: {
        height: percent(),
        width: percent()
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
      o.srcdoc = doc;
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
