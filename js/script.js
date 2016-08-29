var d = document;
function g(i) {
  return d.getElementById(i);
}
function a(o, e, f) {
  o.addEventListener(e, f);
}
function t(o) {
  return o.getElementsByTagName('title')[0];
}
function f() {
  var e = g('editor');
  var r = g('result');
  a(e, 'input', function () {
    r.srcdoc = e.value;
    var i = window.setInterval(function () {
      var c = t(r.contentDocument);
      if (c) {
        clearInterval(i);
        t(document).innerHTML = c.innerHTML;
      };
    }, 100);
  });
}
a(d, 'DOMContentLoaded', f);