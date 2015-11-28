
/*

 Detect and return IE version OR return false if we're not on IE, for 
 compatibility purposes.

 This script was necessary because the to-do list uses cookies and those had to be
 tested in IE.  Unfortunately IE also caused some other JavaScript problems
 but I found this code to fix it.

 */

function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));

   return false;
}

/*

 Since IE8 doesn't support the textContent field, it's necessary to override it with
 the IE8 property name in the event that browser's detected.
 
 */
var textContent = "textContent";
if (msieversion() < 9) {
	textContent = "innerText";
}