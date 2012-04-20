var assert = function(expected, actual, message) {
	if(expected != actual) {
		var message = 'it must be ' + expected + ' but ' + actual + (!!message ? ' : ' + message : '');
		var err = new Error(message).stack.split('\n');
		var err_filter = new Array();
		for(i in err) {
			if(i > 0 && i < 2) continue;
			if(i > err.length - 3) continue
			err_filter.push(err[i] + '\n');
		}
		throw new Exception(err_filter);
	}
};

var Exception = function(stack)
{
	this.stack = stack;
}

var Test = function(tc) {
	console.log('- test start');
	for(i in tc) {
		try {
			tc[i]();
			console.log('['+i+'] ok');
		} catch(e) {
			console.log('['+i+']' + e.stack );
		}
	}
	console.log('- test end');
};
