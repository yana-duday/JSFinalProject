/*
   Random Organization Tips

   Function List:
   randInt(lower, upper)
      Used to generate a random integer in the range (lower, upper)

*/

function randInt(lower, upper) {
	var size = (upper - lower)+1;
	return Math.floor(Math.random() * size + lower); 
   // Lower limit added so the number stays in the specified bounds
   // otherwise off-by-one error occurs.
}