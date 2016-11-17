
/* ------------- Conversion Utils ------------ */

wutils.conversion = {};

wutils.conversion.hexToRGB = function(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
	    r: parseInt(result[1], 16),
	    g: parseInt(result[2], 16),
	    b: parseInt(result[3], 16)
	} : null;
}

wutils.conversion.hexToVec = function(hex) {
	var rgb = wutils.conversion.hexToRGB(hex);
	return [rgb.r / 255.0, rgb.g / 255.0, rgb.b / 255.0];
}
		
	