
/* ----------------- File Utils -------------- */

module.exports.file = {};

/* ======= Load file at path asynchronously =======
	 - Author: Ben Skinner
	 - Params: 
	 	- path (string of file path)
	 	- callback (function to be run on file load success, contents passed as param)
	 	- data (optional data pointer for extra information in callback)
*/
module.exports.file.load = function(path, callback, data) {
	//Contents of the file to be loaded
	var contents = "";

	//XMLHttp Request for file at path
	var xmlhttp = new XMLHttpRequest();

	//Callback when file is loaded
	xmlhttp.onreadystatechange = function() { 
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4) {
			//Set contents to response text
			contents = xmlhttp.responseText;

			//Call callback function with contents of file as param
			callback(contents, data);
		}
	};

	//Specify file and HTTP method
	xmlhttp.open("GET", path, true);

	//Send request
	xmlhttp.send();
};

/* ======= Load files at paths asynchronously =======
	 - Author: Ben Skinner
	 - Params: 
	 	- paths (array of strings to file paths)
	 	- callback (function to be run on all files loaded successfully, array of contents in same order as paths)
		- data (optional data pointer for extra information in callback)
*/
module.exports.file.loadMultiple = function(paths, callback, data) {
	//Store number of files
	var numFiles = paths.length;

	//Counter for number of successful loads
	var filesLoaded = 0;

	//Array of all contents loaded
	var fileContents = [];

	//Load all files, include iteration in data for callback
	for(var i = 0; i < numFiles; ++i) {
		var curPath = paths[i];
		//var c = i;
		this.load(curPath, function(contents, d) {
			//Increment number of files loaded
			filesLoaded++;

			//Current iteration in callback
			var it = d.iteration;

			//Store loaded contents in consolidated array
			fileContents[it] = contents;

			//If this is the last to load, call final callback
			if(filesLoaded == numFiles) {
				//This is the last to be loaded, call final callback, pass array with contents in same order as paths
				callback(fileContents, data);
			}
		}, {iteration: i});
	}
};