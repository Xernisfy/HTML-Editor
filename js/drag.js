document.addEventListener('DOMContentLoaded', function () {
  var e = document.getElementById('panel');
  e.setAttribute("onmousedown", "drag.startMoving(this, 'container', event);");
  e.setAttribute("onmouseup", "drag.stopMoving('container');");
  e.style.height = document.getElementById("editor").clientHeight - 17 + 'px';
  e.style.width = document.getElementById("editor").clientWidth - 17 + 'px';
});
var drag = function () {
  return {
    move: function (d, x, y) {
      d.style.left = x + 'px';
      d.style.top = y + 'px';
    },
    startMoving: function (d, c, e) {
      e = e || window.event;
      var c = document.getElementById(c);
      var x = e.clientX;
      var y = e.clientY;
      var l = d.style.left;
      var t = d.style.top;
      var eh = d.clientHeight;
      var ew = d.clientWidth;
      var ch = c.clientHeight;
      var cw = c.clientWidth;
      c.style.cursor = 'move';
      l = l.replace('px', '');
      t = t.replace('px', '');
      var dx = x - l, dy = y - t;
      document.onmousemove = function (e) {
        e = e || window.event;
        var x = e.clientX, y = e.clientY, ax = x - dx, ay = y - dy;
        if (ax < 0) ax = 0;
        if (ay < 0) ay = 0;
        if (ax + ew > cw) ax = cw - ew;
        if (ay + eh > ch) ay = ch - eh;
        drag.move(d, ax, ay);
        drag.move(document.getElementById("editor"), ax, ay);
      };
    },
    stopMoving: function (c) {
      var a = document.createElement('script');
      document.getElementById(c).style.cursor = 'default';
      document.onmousemove = function () { };
    },
  };
} ();