/*
 Junk Drawer and Launcher Script

 Filename: junk-drawer-script.js

 Global Variables:

 globalDate
  Current date which is either today by default, or whatever
  date is selected by the user

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Functions List:

 addEvent(object, evName, fnName, cap)
   Assigns an event handers to object where evName is the name of the event,
   fnName is the name of the function, and cap is the capture phase.
   This function works for both the IE and W3C event models.

 setup()
   If there is a cookie for the page, loads it into the to-do-list div.
   Calls the ToDoDate function which is in-line in the HTML to get today's date.
   Makes the buttons to switch the styles.

calendar(calendarDay)
   Creates the calendar table for the current month. The current date is 
   highlighted in the table.

writeCalTitle(calendarDay)
   Writes the title row in the calendar table

writeDayNames()
   Writes the weekday title rows in the calendar table

daysInMonth(calendarDay)
   Returns the number of days in the month from calendarDay

writeCalDays(calendarDay)
   Writes the daily rows in the calendar table, highlighting
   calendarDay

 */

var globalDate;

window.onload = setup;

function addEvent(object, evName, fnName, cap) {
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

addEvent(window, "load", createCalEventHandlers, false);

function setup() {
   if (getCookie("toDoList") != undefined) {
      document.getElementById("to-do-list").innerHTML = getCookie("toDoList");
   }
   ToDoDate();
   makeStyleButtons();
}

function calendar(calendarDay) {
   if (calendarDay == null) calDate=new Date()
   else calDate = new Date(calendarDay);

   document.write("<table id='calendar_table'>");
   writeCalTitle(calDate);
   writeDayNames();
   writeCalDays(calDate);
   document.write("</table>");

}

function writeCalTitle(calendarDay) {
   var monthName = new Array("January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December");

   var thisMonth=calendarDay.getMonth();
   var thisYear=calendarDay.getFullYear();

   document.write("<tr>");
   document.write("<th id='calendar_head' colspan='7'>");
   document.write(monthName[thisMonth]+" "+thisYear);
   document.write("</th>");
   document.write("</tr>");
}

function writeDayNames() {
   var dayName = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
   document.write("<tr>");
   for (var i=0;i<dayName.length;i++) {
      document.write("<th class='calendar_weekdays'> " + dayName[i]+"</th>");
   }
   document.write("</tr>");
}

function daysInMonth(calendarDay) {
   var thisYear = calendarDay.getFullYear();
   var thisMonth = calendarDay.getMonth();
   var dayCount = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

   if (thisYear % 4 == 0) {
      if ((thisYear % 100 != 0) || (thisYear % 400 == 0)) {
         dayCount[1]=29;  // this is a leap year
      }
   }
   return dayCount[thisMonth]; //return the number of days in the month
}

function writeCalDays(calendarDay) {
   var currentDay = calendarDay.getDate();

   // determine the starting day of the week
   var dayCount = 1;
   var totalDays = daysInMonth(calendarDay);
   calendarDay.setDate(1);               // set the date to the first day of the month
   var weekDay = calendarDay.getDay();   // the day of the week of the first day

   // write blank cells preceding the starting day
   document.write("<tr>");
   for (var i=0; i < weekDay; i++) {
      document.write("<td></td>");
   }

   // write cells for each day of the month
   while (dayCount <= totalDays) {
      //write the table rows and cells
      if (weekDay == 0) document.write("<tr>");
      
      if (dayCount == currentDay) {
         // highlight the current day
         document.write("<td class='calendar_dates' id='calendar_today'>" + dayCount +
            "</td>");
      } else {
         // display the day as usual
         document.write("<td class='calendar_dates'>"+dayCount+"</td>");
      }

      if (weekDay == 6) document.write("</tr>");

      // move to the next day
      dayCount++;
      calendarDay.setDate(dayCount);
      weekDay = calendarDay.getDay();
   }
   document.write("</tr>")
}

function showDate(dateObj) {
   thisDate = dateObj.getDate();
   thisMonth = dateObj.getMonth()+1;
   thisYear = dateObj.getFullYear();
   return thisMonth + "/" + thisDate + "/" + thisYear;
}

function selectDate() {
   var selectedDate = this[textContent];
   var d = new Date()
   var month = d.getMonth();
   var year = d.getFullYear();
   document.getElementById("selected-date").innerHTML = 
   "<p><i>Selected Date:&nbsp;&nbsp;</i><b>" + (month+1) + "/" + selectedDate + "/" + year + "</b></p>";
   document.getElementById("calendar_today").id = "";
   this.id = "calendar_today";

   globalDate = (month+1) + "/" + selectedDate + "/" + year;
}

function createCalEventHandlers() {
   for (var i=0; i<document.getElementsByTagName("td").length; i++) {
      var calCells = document.getElementsByTagName("td")[i];
      if (calCells.className == "calendar_dates") {
         calCells.onclick = selectDate;

      }
   }
}

function writeItem() {
   var input = document.getElementById("to-do-item").value;
   var activeDiv = document.getElementById(globalDate + "items");

   if (activeDiv == null) {
      document.getElementById("input").innerHTML += "<div id='" + globalDate + "'>" + 
         "<p class='date'>" + globalDate + "</p>" + "</div><div id='" + 
         globalDate + "items'></div>";
      activeDiv = document.getElementById(globalDate + "items");
   }
   activeDiv.innerHTML += "<li class='item'><input type='checkbox'>" + input + "</li>";
   var todo = document.getElementById("to-do-list").innerHTML;
   setCookie("toDoList", todo);
   clearBox();
}

function clearBox() {
   document.getElementById("to-do-item").value = "";
}

function reload() {
   document.getElementById("input").innerHTML = "";
}

function setCookie(cName, cValue, expDate, cPath, cDomain, cSecure) {

   if (cName && cValue != "") {
      var cString = cName + "=" + escape(cValue);
      cString += (expDate ? ";expires=" + expDate.toGMTString(): "");
      cString += (cPath ? ";path=" + cPath : "");
      cString += (cDomain ? ";domain=" + cDomain : "");
      cString += (cSecure ? ";secure" : "");
      document.cookie = cString;
   }
}

function getCookie(cName) {
   if (document.cookie) {
      var cookies = document.cookie.split("; ");
      for (var i = 0; i < cookies.length; i++) {
         if (cookies[i].split("=")[0] == cName) {
            return unescape(cookies[i].split("=")[1]);
         }
      }
   }
}