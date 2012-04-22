var Morse = function(dot){
	this.input_buffer = "";
	this.time = "";
	this.dot = !!dot ? dot : 200;

	this.feed = function(input) {
		if(this.input_buffer[this.input_buffer.length-1] == ' ' && input == '/')
		{
			this.input_buffer[this.input_buffer.length-1] = '/';
		}
		else
		{
			this.input_buffer += input;
		}
	};

	this.out = function(flash) {
		var inputs_word = this.input_buffer.split('/');
		var result = "";

		for(i in inputs_word) {
			var inputs_alpha = inputs_word[i].split(' ');
			for(j in inputs_alpha) {
				if(inputs_alpha[j] == ''){ continue; }
				result += Morse.get(inputs_alpha[j]);
			}

			if(i != inputs_word.length-1) {
				result += ' ';
			}
		}

		if(!!flash) {
			this.input_buffer = "";
		}

		return !!result ? result : "";
	};

	this.input_handler = function(){ };
	this.alpha_handler = function(){ };
	this.word_handler = function(){ console.log(this.out()); };

	// there are chaos;
	this.handler = function() {
		var start = 0;
		var end = 0;
		var diff = 0;
		var dot = this.dot;
		var dash = dot * 3
		var alphabet_timeout_obj = null;
		var word_timeout_obj = null;
		var this_ = this;
		return {
			keydown : function(e) {
				if(start == 0) {
					start = e.timeStamp;
					clearTimeout(alphabet_timeout_obj);
					clearTimeout(word_timeout_obj);
				}
			},
			keyup : function(e) {
				end = e.timeStamp;
				diff = end - start;
				var input = null;
				if(diff >= 0 && diff <= dot) {
					input = '.';
				} else if(diff > dot && diff <= dash) {
					input = '-';
				}
				else {
					input = '-';
				}
				diff = start = end = 0;

				this_.input_handler(input);
				this_.feed(input);
				alphabet_timeout_obj = setTimeout(function() { this_.feed(' '); this_.alpha_handler(); }, dot*3);
				word_timeout_obj = setTimeout(function() { this_.feed('/'); this_.word_handler();}, dot*7);
			}
		};
	};

	this.bind = function(dom_obj) {
		if(dom_obj == null) {
			throw new Error("can not bind morse input");
		}

		var handler = this.handler();

		dom_obj.keydown(handler.keydown);
		dom_obj.keyup(handler.keyup);
	}

};

// . : short
// - : long
Morse.table = {
	'.' : 'e',
	'..' : 'i',
	'...' : 's',
	'..-' : 'u',
	'....' : 'h',
	'...-' : 'v',
	'..-.' : 'f',
	'.-' : 'a',
	'.-.' : 'r',
	'.--' : 'w',
	'.-..' : 'l',
	'.--.' : 'p',
	'.---' : 'j',
	'-' : 't',
	'-.' : 'n',
	'--' : 'm',
	'-..' : 'd',
	'-.-' : 'k',
	'--.' : 'g',
	'---' : 'o',
	'-...' : 'b',
	'-..-' : 'x',
	'-.-.' : 'c',
	'-.--' : 'y',
	'--..' : 'z',
	'--.-' : 'q'
};

Morse.get = function(code) {
	try {
		return Morse.table[code];
	} catch (e) {
		throw "wrong code";
	}
}

Morse.suggest = function(code) {
	var result = new Array();
	for(i in Morse.table) {
		if(i.indexOf(code) == 0) {
			result.push(Morse.table[i]);
		}
	}

	return result;
};

