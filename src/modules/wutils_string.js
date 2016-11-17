
/* ------------- Conversion String ----------- */

wutils.string = {};

/* ======= Combine strings with options =======
	 - Author: Ben Skinner
	 - Params: 
	 	- strings (array of strings to combine)
	 	- affixes (object with optional affixes)
	 - Detail: 
	 	- Infixes are applied to middle combinations
*/
wutils.string.combine = function(strings, affixes) {
	//Create final string storage
	var combinedString = "";

	//Loop through strings and store
	for(var i = 0; i < strings.length; ++i) {
		//Create temp copy of current string
		var curString = strings[i];

		//Try and add prefix
		if(affixes !== undefined && affixes.prefix !== "" && affixes.prefix !== undefined)
			combinedString += affixes.prefix;

		//Append to end of combined string
		combinedString += curString;

		//Try and add infix
		if(affixes !== undefined && affixes.infix !== "" && affixes.infix !== undefined)
			if(i < strings.length - 1)
				combinedString += affixes.infix;

		//Try and add suffix
		if(affixes !== undefined && affixes.suffix !== "" && affixes.suffix !== undefined)
			combinedString += affixes.suffix;
	}

	//Return combined string
	return combinedString;
}
