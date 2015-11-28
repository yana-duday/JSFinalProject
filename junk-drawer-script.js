/*
 Junk Drawer and Launcher Script

 Filename: junk-drawer-script.js

 Global Variables:

 mousePiece
  Target of the click, is set when the user clicks the image.

 diffX
  Horizontal offset between the corner of the image and the position of the pointer
  when the user clicks the image to pick it up.

 diffY
  Vertical offset between the corner of the image and the position of the pointer
  when the user clicks the image to pick it up.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Functions List:

 setup()
   Loops through each of the items in the junk drawer activity, and adds
   an event object to them so they can be grabbed via mouse.

getStyle(object, styleName)
   Returns the computed style value for a specified styleName applied to
   an object.

addEvent(object, evName, fnName, cap)
   Assigns an event handers to object where evName is the name of the event,
   fnName is the name of the function, and cap is the capture phase.
   This function works for both the IE and W3C event models.

removeEvent(object, evName, fnName, cap)  
   Removes an event handers from object where evName is the name of the event,
   fnName is the name of the function, and cap is the capture phase.
   This function works for both the IE and W3C event models.

mouseGrab(e)
   Starts event bubbling, and picks up the image when user clicks.  I originally
   tried to make this so that the user could click and hold to move the image
   and release after they dragged it, but this caused an issue because the
   browser seemed to interpret "mouseup" as a click, and it wouldn't work
   correctly.
   
mouseMove(e)
   Changes the CSS position of the image based on where the mouse pointer
   location is so the user can move it around.

mouseDrop(e)
   Stops the event bubbling, and puts the image down when user clicks.

popUp()
   Opens a new window that contains the activity.

 */

var mousePiece = null;
var diffX = null;
var diffY= null;

window.onload = setup;

function setup() {
   var stuffInDrawer = document.getElementById("stuff");
   var child;
   for (var i = 0; i < stuffInDrawer.children.length; i++) {
      child = stuffInDrawer.children[i];
      child.style.top = getStyle(child, "top");
      child.style.left = getStyle(child, "left");
      child.style.cursor = "pointer";
      addEvent(child, "click", mouseGrab, false);
   }
}

function getStyle(object, styleName) {
   if (window.getComputedStyle) {
      return document.defaultView.getComputedStyle(object, null).getPropertyValue(styleName);
   } else if (object.currentStyle) {
      return object.currentStyle[styleName]
   }
}

function addEvent(object, evName, fnName, cap) {
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

function removeEvent(object, evName, fnName, cap) {
   if (object.detachEvent)
      object.detachEvent("on" + evName, fnName);
   else if (object.removeEventListener)
      object.removeEventListener(evName, fnName, cap);
}

function mouseGrab(e) {
   var evt = e || window.event;
   mousePiece = evt.target || evt.srcElement;

   var mouseX = evt.clientX; // x-coordinate of pointer
   var mouseY = evt.clientY; // y-coordinate of pointer

   var id = mousePiece.id;

   diffX = parseInt(document.getElementById(id).style.left) - mouseX;
   diffY = parseInt(document.getElementById(id).style.top) - mouseY;

   removeEvent(mousePiece, "click", mouseGrab, false);
   addEvent(document, "mousemove", mouseMove, false);
   addEvent(mousePiece, "click", mouseDrop, false);
   evt.cancelBubble = true;
}

function mouseMove(e) {
   var evt = e || window.event;
   var mouseX = evt.clientX;
   var mouseY = evt.clientY;

   var id = mousePiece.id;
   document.getElementById(id).style.left = mouseX + diffX + "px";
   document.getElementById(id).style.top = mouseY + diffY + "px";

}

function mouseDrop(e) {
   e.cancelBubble = true;
   removeEvent(document, "mousemove", mouseMove, false);
   removeEvent(mousePiece, "click", mouseDrop, false);
   addEvent(mousePiece, "click", mouseGrab, false);
}

function popUp() {
   window.open('junk-drawer.html', "pop", "width=987,height=888,scrollbars=yes");
}