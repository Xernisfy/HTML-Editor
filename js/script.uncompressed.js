document.addEventListener('DOMContentLoaded', function() {
  var editor = document.getElementById('editor');
  var result = document.getElementById('result');
  editor.addEventListener('input', function() {
    result.srcdoc = editor.value;
    var interval = window.setInterval(function() {
      var contentTitle = result.contentDocument.getElementsByTagName('title')[0];
      if (contentTitle) {
        clearInterval(interval);
        document.getElementsByTagName('title')[0].innerHTML = contentTitle.innerHTML;
      };
    }, 100);
  });
});
