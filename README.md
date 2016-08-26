# wutils
wutils - web utils
*pronounced (Woo-tills)*

### Overview

 - wutils is a helpful collection of javascript related tasks

### Features

#### Dom Manipulation
```javascript

/* -- Retrieving DOM -- */
var el = wutils.dom.get("canvas");
//returns HTML reference to first dom with id/class/name/tagname

var els = wutils.dom.getAll("canvas");
//returns array of all references to dom of id/class/name/tagname
```

#### File IO
```javascript

/* -- Load External File -- */
//Asynchronously loads single file and has callback after loaded
var f = wutils.file.load("path/to/file.txt", function(contents, data) {
	console.log(contents);	//Prints: File contents
	console.log(data);		//Prints: "extraData"
}, "extraData");

/* -- Load External Files -- */
//Asynchronously loads all files in array and has callback after all loaded
var f = wutils.file.loadMultiple(["path/to/file1.txt", "path/to/file2.txt"], function(contents, data) {
	console.log(contents);	//Prints: [file1, file2]
	console.log(data);		//Prints: "extraData"
}, "extraData");
```

#### Input Utils
```javascript
/* -- Binding keybinds -- */
wutils.input.keybind('k', {shift: true, alt: true}, function(evt) {
	console.log("Shift, alt, K just pressed")
});
//Modifier object footprint: {ctrl:false, shift: false, alt: false}
```

#### String Manipulation
```javascript
/* -- Combining Strings -- */
var str = wutils.string.combine(["Hello", "world"], {infix: ' '});
//returns "Hello world"

/* -- Affixes -- */
var str = wutils.string.combine(["Hey", "there"], {prefix: 'a', suffix: 'b'});
//returns "aHeybathereb";
```

### Notes

This library is being continuously updated. Feedback, and or suggestions are welcome

Created by Ben Skinner