window.addEventListener('load', function(){
    let rating = document.querySelector('#rating');

    rating.onkeypress = function (ev) {
        var key = window.event ? ev.which : ev.keyCode;
        if (key < 48 || key > 57) {
          ev.preventDefault();
        }
    }

});