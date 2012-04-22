var Morse = function(dot){
	this.input_buffer = "";
	this.dot = !!dot ? dot : 200;

	this.isLetterSeperator = function(input) {
		return input == ' ';
	}

	this.isWordSeperator = function(input) {
		return input == '/';
	}

	this.feed = function(input) {
		if(this.isLetterSeperator(this.input_buffer[this.input_buffer.length-1]) 
			&& this.isWordSeperator(input))
		{
			this.input_buffer = this.input_buffer.substring(0, this.input_buffer.length-1);
			this.input_buffer += '/';
		}
		else
		{
			this.input_buffer += input;
		}
	};

	this.out = function(flush) {
		var input_words = this.getWords(this.input_buffer); 
		var result = "";

		try {
			for(i in input_words) {
				var input_letters = this.getLetters(input_words[i]);
				for(j in input_letters) {
					result += Morse.get(input_letters[j]);
				}

				if(i != input_words.length-1) {
					result += ' ';
				}
			}
		} catch (e) {
			this.error_handler(e);
		}

		if(!!flush) {
			this.flush();
		}

		return !!result ? result : "";
	};

	this.getWords = function(input) {
		var result = new Array();
		var item = $.trim(input).split('/');
		for(i in item) {
			if(item[i] == "") continue;
			result.push(item[i]);
		}
		return result;
	}

	this.getLetters = function(input) {
		return $.trim(input).split(' ');
	}

	this.getLastLetter = function(input) {
		var letters = this.getLetters(this.getLastWord(input));
		return letters[letters.length - 1];
	}
	this.getLastWord = function(input) {
		var words = this.getWords(input);
		return words[words.length - 1];
	}

	this.flush = function() {
		this.input_buffer = "";
	}

	this.input_handler = function(input){ console.log(input); };
	this.letter_handler = function(input){ };
	this.word_handler = function(input){ };
	this.error_handler = function(e) { console.log(e); }

	// there are chaos;
	this.handler = function() {
		var start = 0;
		var end = 0;
		var diff = 0;
		var dot = this.dot;
		var dash = dot * 3
		var letter_timeout_obj = null;
		var word_timeout_obj = null;
		var this_ = this;
		return {
			keydown : function(e) {
				if(start == 0) {
					start = e.timeStamp;
					clearTimeout(letter_timeout_obj);
					clearTimeout(word_timeout_obj);
				}

				return false;
			},
			keyup : function(e) {
				var input = null;

				end = e.timeStamp;
				diff = end - start;
				if(diff >= 0 && diff <= dot) {
					input = '.';
				} else if(diff > dot && diff <= dash) {
					input = '-';
				}
				else {
					input = '-';
				}
				diff = start = end = 0;

				this_.feed(input);
				this_.input_handler(input);
				letter_timeout_obj = setTimeout(function() { 
					this_.feed(' '); 

					var last = this_.getLastLetter(this_.input_buffer);
					this_.letter_handler(last);
				}, dot*3);
				word_timeout_obj = setTimeout(function() { 
					this_.feed('/'); 
					this_.word_handler(this_.getLastWord(this_.input_buffer));
					console.log(' ');
				}, dot*7);

				return false;
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

