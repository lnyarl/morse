Morse.handler = function(morse) {
		var start = 0;
		var end = 0;
		var letter_timeout_obj = null;
		var word_timeout_obj = null;

		return {
			on : function(e) {
            var key_code = ('which' in e) ? e.which : e.keyCode;
				if(!!this_.morse_key && key_code != this_.morse_key) {
					return true;
				}

				if(start == 0) {
					start = new Date().getTime();
					clearTimeout(letter_timeout_obj);
					clearTimeout(word_timeout_obj);
				}

				return false;
			},
			off : function(e) {
            	var key_code = ('which' in e) ? e.which : e.keyCode;
				if(!!this_.morse_key && key_code != this_.morse_key) {
					return true;
				}

				var input = null;
				var dot = this_.dot;
				var dash = dot * 3
				var diff = 0;

				end = new Date().getTime();
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
				clearTimeout(letter_timeout_obj);
				clearTimeout(word_timeout_obj);
				letter_timeout_obj = setTimeout(function() { 
					this_.feed(' '); 
					this_.letter_handler(this_.getLastLetter(this_.input_buffer));
				}, dot*3);
				word_timeout_obj = setTimeout(function() { 
					this_.feed('/'); 
					this_.word_handler(this_.getLastWord(this_.input_buffer));
				}, dot*7);

				return false;
			},
			reset : function(e) {
            	var key_code = ('which' in e) ? e.which : e.keyCode;
				if(!!this_.reset_key && key_code != this_.reset_key) {
					return true;
				}
				this_.reset();
				this_.reset_handler();
			}
		};
	};

