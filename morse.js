var Morse = function(){
	this.buffer = new Array();

	this.feed = function(input) {
		this.buffer.push(input);
	};

	this.out = function() {
		return 'b';
	};
};
