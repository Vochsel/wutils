/* -------------- Core Web Utils ------------- */
var wutils = {

	/* --------------- Wutils Info --------------- */
	version: "1.2.1",
	author: "Ben Skinner",

	/* ---------- External Namespaces ------------ */
	external: {
		ns: {
			svg: "http://www.w3.org/2000/svg"
		}
	}
}

/* -------- External Helper Functions -------- */

/* ======= Is Value Valid =======
	 - Author: Ben Skinner
	 - Params:
	 	- val (value to check)
	 - Return:
	 	- bool whether value is valid
*/
wutils.isValid = function(value) { return (value === undefined || value === null) ? false : true; };

module.exports = wutils;
