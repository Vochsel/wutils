
/* ---------------- Input Utils -------------- */

module.exports.input = {};
	
/* ======= Add keybind =======
	 - Author: Ben Skinner
	 - Params: 
	 	- key 		(string of key)
		- mods		(object with properties: ctrl | shift | alt)
		- callback	(function to bind)
	 - Detail: 
		- Binds callback to key with modifiers
*/
module.exports.input.keybind = function(key, callback, mods) {
	document.addEventListener("keydown", function(e) {
		var k = key.toUpperCase().charCodeAt(0);

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