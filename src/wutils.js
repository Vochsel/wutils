var wutils = {
	dom: {
		/* ======= Get element by ambiguous identifier =======
			 - Author: Ben Skinner
			 - Params: 
			 	- id (identifier to search for)
			 - Return: 
			 	- single element / array of elements
		*/
		get: function(id) {
			//Initialize e as undefined
			var e = undefined;

			//Try all dom accessors
			if(e == undefined)
				e = document.getElementById(id);
			if(e == undefined)
				e = document.getElementById(id);
			if(e == undefined)
				e = document.getElementsByClassName(id);
			if(e == undefined)
				e = document.getElementsByName(id);
			if(e == undefined)
				e = document.getElementsByTagName(id);

			//Return e
			return e;
		}
	},
	file: {
		/* ======= Load file at path asynchronously =======
			 - Author: Ben Skinner
			 - Params: 
			 	- path (string of file path)
			 	- callback (function to be run on file load success, contents passed as param)
			 	- data (optional data pointer for extra information in callback)
		*/
		loadFile: function(path, callback, data) {
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
		},
		/* ======= Load files at paths asynchronously =======
			 - Author: Ben Skinner
			 - Params: 
			 	- paths (array of strings to file paths)
			 	- callback (function to be run on all files loaded successfully, array of contents in same order as paths)
				- data (optional data pointer for extra information in callback)
		*/
		loadFiles: function(paths, callback, data) {
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
				this.loadFile(curPath, function(contents, d) {
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
		},
	},
	string: {
		/* ======= Combine strings with options =======
			 - Author: Ben Skinner
			 - Params: 
			 	- strings (array of strings to combine)
			 	- affixes (object with optional affixes)
			 - Detail: 
			 	- Infixes are applied to middle combinations
		*/
		combine: function(strings, affixes) {
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
			return combinedString
		}
	}
}

