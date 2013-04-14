var assert = function(expected, actual, message) {
	if(expected != actual) {
		var outMessage = 'it must be "' + expected + '" but "' + actual + '"' + (!!message ? ' : ' + message : '');
		var err = new Error(outMessage).stack.split('\n');
		var err_filter = new Array();
		for(i in err) {
			if(i > 0 && i < 2) continue;
			if(i > err.length - 3) continue;
			err_filter.push(err[i] + '\n');
		}
		throw new Exception(err_filter);
	}
};

var Exception = function(stack)
{
	this.stack = stack;
};

var Test = function(tc, name) {
  var testCaseName = (' [' + name + '] ') || ' ';

	console.log('-' + testCaseName + 'test start');
	for(i in tc) {
		try {
			tc[i]();
			console.log('\t['+i+'] ok');
		} catch(e) {
      if(!!e.stack)
			  console.log('\t['+i+'] ' + e.stack );
      else
			  console.log('\t['+i+'] ' + e );
		}
	}
};

exports.assert = assert;
exports.Test = Test;
