/*
 Bill Tracker Script

 Filename: bill-tracker-script.js


 Functions List:

 fillArray()
   Puts the user input into an array, and pushes that to the main bills array.
   Then, calls the other functions necessary for this tool.

testPattern(field, regx)
   Tests the user input against the reg-ex passed as an argument.

verifyInput(bills)
   Tests the user input to make sure the date/dollar amounts are in the
   correct format by using reg ex.

verifyFields(bills) 
   Verifies that the correct fields are filled out together.  Due Date and
   Amount Due must be filled out together, and Date Paid and Amount Paid
   must be filled out together.  Also checks that if the Date Paid is filled
   out, that the Due Date is also filled out.

calcSumDue(bills)
   Adds up the amounts that are due, and subtracts the amount that has been
   paid to give the user the total amount due.

alerts(bills)
   Identifies bills that are overdue (have a due date of day prior to today)
   and generates an alert saying they are late.  Also identifies bills that
   are due in a week or late and generates an alert saying they are due soon.

reload()
   Refreshes page to clear user input.

 */


function fillArray() {
   bills = new Array();
   for (var i=1; i<10; i++) {
      var array = new Array();
      array[0] = document.getElementById("bill"+i).value;
      array[1] = document.getElementById("duedate"+i).value;
      array[2] = document.getElementById("amount"+i).value;
      array[3] = document.getElementById("datepaid"+i).value;
      array[4] = document.getElementById("amountpaid"+i).value;
      bills.push(array);
   }
   calcSumDue(bills);
   alerts(bills);
   verifyFields(bills);
   verifyInput(bills);
}

function testPattern(field, regx) {
   var result = regx.test(field);
   if (result == false) {
      return false;
   }
   else {
      return true;
   }
}

function verifyInput(bills) {
   var isValid = true;

   for (var i=0; i<bills.length; i++) {
      if (bills[i][1] != "") {
         isValid = isValid && testPattern(bills[i][1], /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[01])\/\d{2}$/);
      }

      if (bills[i][3] != "") {
         isValid = isValid && testPattern(bills[i][3], /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[01])\/\d{2}$/);
      }

      if (bills[i][2] != "") {
         isValid = isValid && testPattern(bills[i][2], /^\$?\d+\.\d{2}$/);
      }

      if (bills[i][4] != "") {
         isValid = isValid && testPattern(bills[i][4], /^\$?\d+\.\d{2}$/);
      }

      if (isValid == false) {
         document.getElementById("verify").innerHTML = "<i>Incorrect Input - " + 
      " use mm/dd/yy for dates, 000.00 for dollar amount</i><br><br>"; 
      } else {
         document.getElementById("verify").innerHTML = "";
      }
   }
}

function verifyFields(bills) {
   var filledCorrectly = true;
   for (var i=0; i<bills.length; i++) {
      if (bills[i][3] != "" && bills[i][4] == "") {
         filledCorrectly = false;
      }
      else if (bills[i][3] != "" && bills[i][1] == "") {
         filledCorrectly = false;
      }
      else if (bills[i][1] != "" && bills[i][2] == "") {
         filledCorrectly = false;
      }
   }
   
   if (filledCorrectly == false) {
      document.getElementById("completeness").innerHTML = 
         "<i>Due Date & Amount Due must be filled out together, " + 
         "Date Paid & Amount Paid must be filled out together if paid.</i><br><br>";
   } else {
      document.getElementById("completeness").innerHTML = "";
   }
}

function calcSumDue(bills) {
   var sumPaid = 0;
   var sumDue = 0;
   var output = 0;
   for (var i=0; i<bills.length; i++) {
      if (bills[i][4] != "") {
         var paid = parseFloat(bills[i][4]);
         sumPaid += paid;
      }
   }
   for (var i=0; i<bills.length; i++) {
      if (bills[i][2] != "") {
         var due = parseFloat(bills[i][2]);
         sumDue += due;
      }
   }

   output = sumDue - sumPaid;
   document.getElementById("total-due").value = output.toFixed(2);
}

function alerts(bills) {
   var today = new Date();
   var outputAlerts = "";
   var soonAlerts = "";
   for (var i=0; i<bills.length; i++) {
      var due = Date.parse(bills[i][1]);
      if (due < today && bills[i][3] == "") {
         var days = (today - due)/(1000*60*60*24);
         outputAlerts += "<p class='late'>" + bills[i][0] +
            " bill is " + Math.floor(days) + " days late.</p>";
      }
      
      document.getElementById("late-alerts").innerHTML = 
         outputAlerts;
   }
   for (var i=0; i<bills.length; i++) {
      var due = Date.parse(bills[i][1]);
      var diff = (due - today)/(1000*60*60*24);
      var daysDiff = Math.floor(diff);
      if (daysDiff < 7 && daysDiff > 0 && bills[i][3] == "") {
         soonAlerts += "<p class='soon'>" + bills[i][0] +
            " bill is due SOON -- in " + daysDiff + " days.</p>";
      }
      
      document.getElementById("soon-alerts").innerHTML = 
         soonAlerts;
   }
}

function reload() {
   location.reload();
}