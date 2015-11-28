/*
 To-Do List Generator Switch Styles for Printing

 Filename: switchstyle.js

 Global Variables:

 allStyles
 	An array that holds all the stylesheets available for the page
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Functions List:

 addEvent(object, evName, fnName, cap)
   Assigns an event handers to object where evName is the name of the event,
   fnName is the name of the function, and cap is the capture phase.
   This function works for both the IE and W3C event models.

 makeStyleButtons()
 	Creates the buttons depending on how many stylesheets there are.
 	Buttons include the title of the stylesheet from the HTML reference.
 	Also sets the formatting of the buttons

changeStyle()
	Sets the style of the page depending on which button the user clicked.

 */

function addEvent(object, evName, fnName, cap) {
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

var allStyles= new Array();

function makeStyleButtons() {
	var allLinks = document.getElementsByTagName("link");

	for (var i = 0; i < allLinks.length; i++) {
		if ((allLinks[i].rel == "stylesheet" || allLinks[i].rel == "alternate stylesheet")
			&& allLinks[i].title != "") {
			allStyles.push(allLinks[i]);
		}
	}

	var styleBox = document.createElement("div");

	for (var i =0; i<allStyles.length; i++) {

		if (allStyles[i].rel == "stylesheet") {
			allStyles[i].disabled = false;
		} else {
			allStyles[i].disabled = true;
		}

		styleButton = document.createElement("input");
		styleButton.type = "button";
		styleButton.className = "button";
		styleButton.value = allStyles[i].title + " view";
		styleButton.title = allStyles[i].title;

		styleButton.onclick = changeStyle;

		styleBox.appendChild(styleButton);
	}

	styleBox.style.width = "200px";
	styleBox.style.cssFloat = "center";
	styleBox.style.margin = "5px 5px 10px 10px";

	var sourceDoc = document.getElementById("doc");
	sourceDoc.insertBefore(styleBox, sourceDoc.firstChild);
}

function changeStyle() {
	for (var i = 0; i < allStyles.length; i++) {
		if (allStyles[i].title == this.title) {
			allStyles[i].disabled = false;
		} else {
			allStyles[i].disabled = true;
		}
	}
}