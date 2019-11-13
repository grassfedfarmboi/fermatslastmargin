
function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);
    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0; ) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }
    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
}

function setFriends(data) {
  var friends_table = document.getElementById('friends');
  var tbl_row = friends_table.insertRow();

  data.forEach(friend => {
      var row_cel = tbl_row.insertCell(0);
      var ank = document.createElement('a');
      ank.title = friend;
      if (friendview != friend) {
        ank.href = location.href + '&friendview=' + friend;
      } else {
        ank.href = removeURLParameter(location.href, 'friendview');
      }
      ank.appendChild(document.createTextNode(friend));
      row_cel.appendChild(ank);
  });
}

function hereagain() {
  return (
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname
  );
}

function initCode() {
  console.log("initCode firing");
  console.log("ReadyState: " + document.readyState);

  var reactComponent = ReactDOM.render(<ParentComponent />, document.getElementById('react-root'));

  var params = new URLSearchParams(document.location.search);
  var pagenum = parseInt(params.get('pagenum'), 10) || 1; // this can't be a good idea
  if (pagenum < 1) {
    pagenum = 1;
  }
  var uid = params.get('uid') || 'todo';
  var friendview = params.get('friendview') || '';
  var didJustEscape = false;
  reactComponent.testFunction();
  var content = document.getElementById('content'); // I use this everywhere.

  $('#status').val(hereagain());
  $('#pgup').val(pagenum + 1);
  $('#pgdn').val(pagenum - 1 || 1); // gosh that's ugly
  document.getElementById('uidtoupdate').value = uid;
  var append = '';
  if (friendview) {
    append = '&viewfriend=' + friendview;
  }

  function buildup() {
    return hereagain() + '?pagenum=' + (pagenum - 1) + '&uid=' + uid;
  }
  function builddown() {
    return hereagain() + '?pagenum=' + (pagenum + 1) + '&uid=' + uid;
  }
  function setAnnotation(a) {
    reactComponent.setAnnotations(a);
  }
  function setPageImage(pagenum) {
    let imgsrc = '/' + uid + '/page-' + pagenum + '.png';
    reactComponent.handleImgChange(imgsrc);
    //document.getElementById('pageimage').setAttribute('src', imgsrc);
    return imgsrc;
  }

  $.get(
    '/getannotate?pagenum=' + pagenum + '&paperuid=' + uid + append,
    '',
    setAnnotation,
    'json'
  );
  $.get('/friends?paperuid=' + uid, '', setFriends, 'json');
  setPageImage(pagenum);

  document.addEventListener('keydown', e => {
    if (
      e.key == 'PageDown' ||
      (e.key == 'ArrowRight' && document.activeElement != content)
    ) {
      location.href = builddown();
    }
    if (
      e.key == 'PageUp' ||
      (e.key == 'ArrowLeft' && document.activeElement != content)
    ) {
      if (pagenum >= 1) {
        location.href = buildup();
      } else {
        location.href = hereagain() + '?pagenum=1' + '&uid=' + uid;
      }
    }
    if (e.key == 'Enter' && e.ctrlKey) {
      // check focus
      if (content == document.activeElement) {
        // content already has focus, CTRL+enter should submit to the server if the contents are non-empty
        // submit, check for write, if success then redirect to this page
        if (content.value.length > 0) {
          // check for empty textarea, this might work?
          // submit to server
          $.post(
            '/annotate',
            JSON.stringify({
              pageNumber: pagenum,
              content: content.value,
              paperuid: uid
            })
          );
          content.blur();
          // display saved, and drop focus
        } else {
          alert('not saving empty annotation');
        }
      } else {
        content.focus(); // put focus on content
        content.style.height = content.scrollHeight + 'px';
      }
    }
    if (e.key == 'Escape') {
      content.blur();
      didJustEscape = true;
    }
  });

  content.addEventListener('blur', e => {
    colsole.log("blur");
    // check if escaped key triggered the blur, only submit if it did not.
    if (!didJustEscape) {
      didJustEscape = false;
      // submit, check for write, if success then redirect to this page
      if (content.value.length > 0) {
        // check for empty textarea, this might work?
        // submit to server
        $.post(
          '/annotate',
          JSON.stringify({
            pageNumber: pagenum,
            content: content.value,
            paperuid: uid
          })
        );
      } else {
        alert('not saving empty annotation');
      }
    }
  });
}

if( document.readyState !== 'loading' ) {
  console.log("not loading; no nead to listen")
  initCode();
} else {
  document.addEventListener('DOMContentLoaded', e => {
    console.log('DOMContentLoaded event');
    console.log("ReadyState: " + document.readyState);
    initCode();

    $(document).ready(function() {
      console.log('document ready jquery');
      console.log("ReadyState: " + document.readyState);
      console.log("init here?")
    });

  });
}


if( document.readyState == 'complete' ) {
  consol.log("already complete");
} else {
  window.addEventListener('complete', e => {
    console.log('complete event');
    console.log("ReadyState: " + document.readyState);

  });
}

