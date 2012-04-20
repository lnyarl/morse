var test_case = {
	test_feed : function() {
		var morse = new Morse();
		morse.feed(0);
		morse.feed(1);
		var a = morse.out();
		assert('a', a);
	}
};

Test(test_case);
