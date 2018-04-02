var compressor = require('node-minify');
 
//Concatenate
compressor.minify({
  compressor: 'no-compress',
  input: ["./index.js", "./src/modules/*.js"],
  output: './lib/wutils.js',
  callback: function (err, min) {}
});

console.log("Concatenated into ./build/wutils.js");

//Minify
compressor.minify({
  compressor: 'gcc',
  input: './lib/wutils.js',
  output: './lib/wutils.min.js',
  callback: function (err, min) {}
});

console.log("Minified into ./build/wutils.min.js");
