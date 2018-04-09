(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var text = document.createElement('div');
    document.body.appendChild(text);
    text.contentEditable = 'true';
    text.style.height = '200px';
    text.style.width = '200px';
    text.style.border = '1px solid black';
    var out = document.createElement('span');
    document.body.appendChild(out);
    text.addEventListener('input', function(e) {
      text.innerHTML = text.innerText.replace(/test/g, '<span style="color:red;">test</span>');
      out.innerText = text.innerText;
      console.log(text);
      var sel = getSelection();
      var range = document.createRange();
      range.selectNode(text.childNodes[0]);
      sel.addRange(range);
      range.collapse();
    });
  });
})();
