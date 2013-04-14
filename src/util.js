Morse.suggest = function(code) {
	var result = new Array();
	for(i in Morse.table) {
		if(i.indexOf(code) === 0) {
			result.push(Morse.table[i]);
		}
	}

	return result;
};

Morse.trim = function(str) {
	if(!str) return "";
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
