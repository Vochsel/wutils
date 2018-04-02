
/* ---------------- Query Utils -------------- */

module.exports.query = {};

/* ======== Query URL ========
	 - Author: Ben Skinner
	 - Params: 
	 	- key 		(post url string)
	 - Detail: 
		- Returns associated array of found paramaters
*/
module.exports.query.url = function(qs) {
	//If no paramater get current documents paramaters
	if(!qs)
		qs = document.location.search;

	//Split string
  	qs = qs.split('+').join(' ');

  	//Create variables
  	var params = {},
    	tokens,
      	re = /[?&]?([^=]+)=([^&]*)/g;

    //Parse all tokens and execute
  	while (tokens = re.exec(qs)) {
    	params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  	}

  	//Return associated array
  	return params;
};