/*
   Random Organization Tips

   Function List:

   tipText(n)
      Used to return the text of tip "n"
*/

function tipText(n) {
   var text = new Array();
   text[1] = "<b>Edit, edit, edit</b><br>How many pots and pans actually fit on your stove " + 
             "at the same time?<br>How many clear vases can be filled with flowers at " + 
             "one time? Many if you have a cutting garden, not so many if you live in " + 
             "a small city apartment.<br>How many (if any) ugly pens you got for free " +  
             "do you need?<br>How many T-shirts do you need to save for your next " +
             "paint job?  Constantly edit your belongings.";
   text[2] = "<b>Let it go</b><br>I always keep a row of grocery bags in the garage " +
             "designated for stuff I want to get rid of. One goes to the local charity " +
             "shop, one goes to my family, one goes to recycling. When one bag is full " + 
             "I bring it to wherever it's intended. I love it when all the bags are gone! ";
   text[3] = "<b>Set up a filing system and keep your papers in order</b><br>Pretty file" +
             " folders can make it nicer to look at, of course, but the trick is to really" +
             " use your filing system.  You can have 2 filing spots:  one for business" +
             " things, and one for household paperwork.  Keeping your paperwork organized " +
             "can make a big difference when it comes to paying bills and, of course, when" +
             " tax time rolls around.";
   text[4] = "<b>Start in one place</b><br>If you have several areas in your home you want" + 
             " to get under control, start with just one. You decide which one to start" +
             " with - is it the area that gives you the biggest headache, or the area that" +
             " guests to your home most easily see? Whatever your priorities, select one" +
             " area and stick to it. Many attempts at organization fail when the task of" +
             " cleaning up the entire house seems daunting and folks give up. When you " +
             "complete one area, celebrate and then move on to the next.";
   text[5] = "<b>Maximize vertical space</b><br> If you don't have a lot of room to work" +
             " with, a surefire way to instantly create more space is to go 'up'. Instead" +
             " of only having a couple of shelves to house your kitchen items, take them up" +
             " to the ceiling to really maximize the vertical space — you’ll store the " + 
             "things you need less frequently on the higher shelves.";
   return text[n];
}
