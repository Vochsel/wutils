
/* ----------------- DOM Utils --------------- */

var out_dom = {};

/* ======= Get element by ambiguous identifier =======
	 - Author: Ben Skinner
	 - Params: 
	 	- id (identifier to search for)
	 - Return: 
	 	- single element / array of elements
*/
out_dom.get = function(id) {
	//Initialize e as null
	var e = null;

	//Temporary storage
	var tmp = [];

	//Try all dom accessors
	if(e == null) {
		e = document.getElementById(id);
		if(e != null)
			return e;
	}
	if(e == null) {
		tmp = document.getElementsByClassName(id);
		if(tmp.constructor === HTMLCollection && tmp.length > 0) {
			e = (tmp.length > 1) ? tmp : tmp[0];
			return e;
		}
	}
	if(e == null) {
		tmp = document.getElementsByName(id);
		if(tmp.constructor === HTMLCollection && tmp.length > 0) {
			e = (tmp.length > 1) ? tmp : tmp[0];
			return e;
		}
	}
	if(e == null) {
		tmp = document.getElementsByTagName(id);
		if(tmp.constructor === HTMLCollection && tmp.length > 0) {
			e = (tmp.length > 1) ? tmp : tmp[0];
			return e;
		}
	}
	if(e == null) {
		tmp = document.getElementsByTagNameNS(module.exports.external.ns.svg, id);
		if(tmp.constructor === HTMLCollection && tmp.length > 0) {
			e = (tmp.length > 1) ? tmp : tmp[0];
			return e;
		}
	}

	//Return e
	return e;
};

/* ===== Get all element by ambiguous identifier ======
	 - Author: Ben Skinner
	 - Params: 
	 	- id (identifier to search for)
	 - Return: 
	 	- Appended array of elements
*/
out_dom.getAll = function(id) {
	//Initialize e as array
	var e = [];

	//Initialize temporary holder
	var tmp = null;

	//Get single element by ID
	tmp = document.getElementById(id);
	if(tmp != null)
		e.push(tmp);

	//Get all elements by class name
	tmp = document.getElementsByClassName(id);
	//Check if not null and if is a HTMLCollection
	if(tmp != null && tmp.constructor === HTMLCollection) {
		//Loop through all HTML elements
		for(var i = 0; i < tmp.length; ++i) {
			//Store individual elements
			var t = tmp[i];
			//Store individual element
			e.push(t);
		}
	}

	//Get all elements by tag name
	tmp = document.getElementsByTagName(id);
	//Check if not null and if is a HTMLCollection
	if(tmp != null && tmp.constructor === HTMLCollection) {
		//Loop through all HTML elements
		for(var i = 0; i < tmp.length; ++i) {
			//Store individual elements
			var t = tmp[i];
			//Store individual element
			e.push(t);
		}
	}

	//Get all elements by name
	tmp = document.getElementsByName(id);
	//Check if not null and if is a HTMLCollection
	if(tmp != null && tmp.constructor === HTMLCollection) {
		//Loop through all HTML elements
		for(var i = 0; i < tmp.length; ++i) {
			//Store individual elements
			var t = tmp[i];
			//Store individual element
			e.push(t);
		}
	}

	//Get all elements by NS: SVG
	tmp = document.getElementsByTagNameNS(module.exports.external.ns.svg, id);
	//Check if not null and if is a HTMLCollection
	if(tmp != null && tmp.constructor === HTMLCollection) {
		//Loop through all HTML elements
		for(var i = 0; i < tmp.length; ++i) {
			//Store individual elements
			var t = tmp[i];
			//Store individual element
			e.push(t);
		}
	}
	//Return elements
	return e;
}

module.exports = out_dom;