function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  function onLoad(){
    document.getElementById('user_name').innerHTML = getCookie('name');
  }

  function LogOut(){
    document.cookie = 'username=~;'

    location.href = "/login_"
  }

 /**
  * document.cookie = "asd=ASD;" stexcum e cookie
  * document.cookie = "asd=;" jnjum e ayd cookien
  * 
  * https://www.w3schools.com/jsref/prop_img_src.asp nkar@ poxelu hamar
  * https://www.w3schools.com/js/js_cookies.asp cookiener
  */