var isMobile = false,
    scrollTopPosition;
function getBrowser() {
    var ua = navigator.userAgent;
    var bName = function () {
        if (ua.search(/Edge/) > -1) return "edge";
        if (ua.search(/MSIE/) > -1) return "ie";
        if (ua.search(/Trident/) > -1) return "ie11";
        if (ua.search(/Firefox/) > -1) return "firefox";
        if (ua.search(/Opera/) > -1) return "opera";
        if (ua.search(/OPR/) > -1) return "operaWebkit";
        if (ua.search(/YaBrowser/) > -1) return "yabrowser";
        if (ua.search(/Chrome/) > -1) return "chrome";
        if (ua.search(/Safari/) > -1) return "safari";
        if (ua.search(/maxHhon/) > -1) return "maxHhon";
    }();
                                                                                                                                                                      
    var version;
    switch (bName) {
        case "edge":
            version = (ua.split("Edge")[1]).split("/")[1];
            break;
        case "ie":
            version = (ua.split("MSIE ")[1]).split(";")[0];
            break;
        case "ie11":
            bName = "ie";
            version = (ua.split("; rv:")[1]).split(")")[0];
            break;
        case "firefox":
            version = ua.split("Firefox/")[1];
            break;
        case "opera":
            version = ua.split("Version/")[1];
            break;
        case "operaWebkit":
            bName = "opera";
            version = ua.split("OPR/")[1];
            break;
        case "yabrowser":
            version = (ua.split("YaBrowser/")[1]).split(" ")[0];
            break;
        case "chrome":
            version = (ua.split("Chrome/")[1]).split(" ")[0];
            break;
        case "safari":
            version = ua.split("Safari/")[1].split("")[0];
            break;
        case "maxHhon":
            version = ua.split("maxHhon/")[1];
            break;
    }
    var platform = 'desktop';
    if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
    var browsrObj;
    try {
        browsrObj = {
            platform: platform,
            browser: bName,
            versionFull: version,
            versionShort: version.split(".")[0]
        };
    } catch (err) {
        browsrObj = {
            platform: platform,
            browser: 'unknown',
            versionFull: 'unknown',
            versionShort: 'unknown'
        };
    }
    return browsrObj;
};
var browserYou = getBrowser();
if (browserYou.platform == 'mobile') { isMobile = true;document.documentElement.classList.add('mobile')}else {document.documentElement.classList.add('desktop')}
if ((browserYou.browser == 'ie')) {document.documentElement.classList.add('ie');}
if ((browserYou.browser == 'ie' &&  browserYou.versionShort < +'9') || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < +'18') || (browserYou.browser == 'firefox' &&  browserYou.versionShort < +'30')) {
    alert('Обновите браузер','')
};
window.onload = function() {
  // PRELOADER
  var body = document.querySelector('body');
  body.classList.add('loading')
  setTimeout(function(){body.classList.add('loaded')},1000)
  setTimeout(function(){document.querySelector('.preloader').style.display = 'none';},1500)
  // //PRELOADER
  heightFullWindow(document.querySelector('.main-container'));
}
window.onresize = function() {
  heightFullWindow(document.querySelector('.main-container'));
}
window.onscroll = function() {
  scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}
function heightFullWindow(el) {
  var fullHeight =  window.innerHeight - document.querySelector('.header').clientHeight;
  el.style.height = fullHeight  + 'px';
}
function scrollTo(element, to, duration) {
    var start = element.scrollTop ;
    if(browserYou.browser == 'firefox') {
      start = document.documentElement.scrollTop
    }
    var change = to - start,
        currentTime = 0,
        increment = 20,
        scrollTopPosition = document.documentElement.scrollTop ;
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(browserYou.browser == 'firefox') {
          document.documentElement.scrollTop = val;
        }
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
function heightBlock(ell){
  var elem = document.querySelectorAll(ell);
  var maxH = 0;
  for (var i = 0; i < elem.length; ++i) {
    elem[i].style.height = "";
    elem[i].removeAttribute("style");
    if (maxH < elem[i].offsetHeight) {
      maxH = elem[i].offsetHeight; 
    }
  }
  for (var i = 0; i < elem.length; ++i) {
    elem[i].style.height = maxH + "px";
  }
}
$(document).ready(function() {
  if(isMobile == false) {
    $('.datepicker').pickadate();
  }
  $('.dropdown-button').dropdown();
  $('ul.tabs').tabs();
  $('select').material_select();
  $('.collapsible').collapsible();
  $('.modal').modal({
      opacity: 1,
  });
});
// validate form
function validate(form){
    var error_class = "error";
    var norma_class = "pass";
    var item        = form.find("[required]");
    var e           = 0;
    var reg         = undefined;
    var pass        = form.find('.password').val();
    var pass_1      = form.find('.password_1').val();
    var email       = false;
    var password    = false;
    var phone       = false;
    function mark (object, expression) {
        if (expression) {
            object.parents('.required-field').addClass(error_class).removeClass(norma_class).find('.error_text').show();
            e++;
        } else
            object.parents('.required-field').addClass(norma_class).removeClass(error_class).find('.error_text').hide();
    }
    form.find("[required]").each(function(){
        switch($(this).attr("data-validate")) {
            case undefined:
                mark ($(this), $.trim($(this).val()).length === 0);
            break;
            case "email":
                email = true;
                reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                mark ($(this), !reg.test($.trim($(this).val())));
                email = false;
            break;
            case "phone":
                phone = true;
                reg = /[0-9 -()+]{10}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
                phone = false;
            break;
            case "pass":
                password = true;
                reg = /^[a-zA-Z0-9_-]{6,}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
                password = false;
            break;
            case "pass1":
                mark ($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
            break;
            default:
                reg = new RegExp($(this).attr("data-validate"), "g");
                mark ($(this), !reg.test($.trim($(this).val())));
            break;
        }
    })
    $('.js_valid_radio').each(function(){
        var inp = $(this).find('input.required');
        var rezalt = 0;
        for (var i = 0; i < inp.length; i++) {
            if ($(inp[i]).is(':checked') === true) {
                rezalt = 1;
                break;
            } else {
                rezalt = 0;
            }
        }
        if (rezalt === 0) {
           $(this).addClass(error_class).removeClass(norma_class);
            e=1;
        } else {
            $(this).addClass(norma_class).removeClass(error_class);
        }
    })
    if (e == 0) {
     return true;
    }
    else {
        form.find("."+error_class+" input:first").focus();
        return false;
    }
}
// validate form 
