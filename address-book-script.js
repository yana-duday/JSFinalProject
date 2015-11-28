/*
 Address Book Script

 Filename: address-book-script.js

 Global Variables:

 contacts
   Holds all of the contact records input by the user.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Functions List:

 fillArray()
   Puts the user input into an array, and then adds it to the bigger
   contacts array which contains every entry in the address book.  Then
   calls the writeTable function.

writeTable() 
   Generates the table that displays each address book entry based
   on the contacts array.

sortArray(option)
   Based on the option chosen by the user via radio buttons, sorts
   the contacts array either alphabetically by first name, by last name
   or by e-mail, and puts the newly sorted array into outputArray.
   Then, it re-writes the table in the new order using outputArray as source.

swap(array, index_a, index_b)
   Used to alphabetize the array, the function compares each entry alphabetically
   and switches the positions if one of the entries comes before the other 
   using a temp variable.

chooseSortOrder()
   Gets user input on what option was chosen to sort the table by.

reload()
   Refreshes the page to clear all entries.

 */


var contacts = new Array();

function fillArray() {
   var array = new Array();
   array[0] = document.getElementById("fname").value;
   array[1] = document.getElementById("lname").value;
   array[2] = document.getElementById("phone").value;
   array[3] = document.getElementById("email").value;

   contacts.push(array);
   document.getElementById("fname").value= "";
   document.getElementById("lname").value= "";
   document.getElementById("phone").value= "";
   document.getElementById("email").value= "";
   writeTable();
}

function writeTable() {
   var contentTable;
   contentTable = "<table class='contact-table'>";
   contentTable += "<tr>";

   for (var i=0; i<contacts.length; i++) {
      if(i % 6 == 0) {
         contentTable += "</tr>";
         contentTable += "<tr>";
      }
      contentTable += "<td>";
      contentTable += contacts[i][0];
      contentTable += "&nbsp;";
      contentTable += contacts[i][1];
      contentTable += "<br>";
      contentTable += contacts[i][2];
      contentTable += "<br>";
      contentTable += contacts[i][3];
   }

   contentTable += "</tr>";

   contentTable += "</table>";

   document.getElementById("contacts").innerHTML = contentTable;
}

function sortArray(option) {
   var outputArray = new Array();
   // Sort alphabetically by first name
   if (option == 1) {
      for (i=0; i<contacts.length; i++) {
         outputArray.push(contacts[i]);
         for (j=outputArray.length-1; j>=1; j--) {
            var n = outputArray[j][0].localeCompare(outputArray[j-1][0]);
            if (n == -1) {
               swap(outputArray, j, j-1);
            }
         }
      }
   }
   // Sort alphabetically by last name
   if (option == 2) {
      for (i=0; i<contacts.length; i++) {
         outputArray.push(contacts[i]);
         for (j=outputArray.length-1; j>=1; j--) {
            var n = outputArray[j][1].localeCompare(outputArray[j-1][1]);
            if (n == -1) {
               swap(outputArray, j, j-1);
            }
         }
      }
   }
   // Sort alphabetically by e-mail
   if (option == 3) {
      for (i=0; i<contacts.length; i++) {
         outputArray.push(contacts[i]);
         for (j=outputArray.length-1; j>=1; j--) {
            var n = outputArray[j][3].localeCompare(outputArray[j-1][3]);
            if (n == -1) {
               swap(outputArray, j, j-1);
            }
         }
      }
   }
   contacts = outputArray;
   writeTable();
}

function swap(array, index_a, index_b) {
   var temp = array[index_a];
   array[index_a] = array[index_b];
   array[index_b] = temp;
   return array;
}

function chooseSortOrder() {
   var FNameChoose = document.getElementById("aFName");
   var LNameChoose = document.getElementById("aLName");
   var EMailChoose = document.getElementById("aEMail");
   var option;

   if (FNameChoose.checked) {
      option = 1;
   }

   if (LNameChoose.checked) {
      option = 2;
   }

   if (EMailChoose.checked) {
      option = 3;
   }

   sortArray(option);
}

function reload() {
   location.reload();
}