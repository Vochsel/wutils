
/* ---------------- Input Utils -------------- */

var out_input = {};
	
/* ======= Add keybind =======
	 - Author: Ben Skinner
	 - Params: 
	 	- key 		(string of key)
		- callback	(function to bind)
		- mods		(object with properties: ctrl | shift | alt)
	 - Detail: 
		- Binds callback to key with modifiers
*/
out_input.keybind = function(key, callback, mods) {
	document.addEventListener("keydown", function(e) {
		var k = key.toUpperCase();
		var l = e.key.toUpperCase();

		function mget(prop) { if(mods === null || mods === undefined) return false; return (mods[prop] !== undefined) ? true : false; }

		if(k === e.keyCode) {

			if(	e.ctrlKey 	===  mget("ctrl")  && 
				e.shiftKey 	===  mget("shift") && 
				e.altKey 	===  mget("alt") ){
				callback(e);
			}
		}
	});
}

module.exports = out_input;