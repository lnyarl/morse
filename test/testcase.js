$(document).ready(function() {
	var test_case = {
		test_feed : function() {
			var morse = new Morse();
			morse.feed('.');
			morse.feed('-');
			var a = morse.out();
			assert('a', a);
		},
		test_feed2 : function() {
			var morse = new Morse();
			morse.feed('.');
			morse.feed('-');
			morse.feed(' ');
			morse.feed('-');
			morse.feed('.');
			morse.feed('.');
			morse.feed('.');
			var a = morse.out();
			assert('ab', a);
		},

		test_input_div : function() {
			var w = Morse.bind($('#mydiv'));
		}
	};

	Test(test_case);
});
