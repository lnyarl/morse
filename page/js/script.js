/* Author: Yongjae Choi

*/

$(document).ready(function(){
	var default_dot_duration = 150;
	var morse = new Morse(default_dot_duration);
	var input_element = $('#input');
	var input_code_element = $('#input-code');
	var buffer_element = $('#input-buffer');
	var result_element = $('#result');
	var table = $('#code-table');
	var cursor = $('#cursor');

	var code = decode(getQueryVariable('code'));

	var blink = blinkCursor(default_dot_duration);

	make_code_table(Morse.table);

	defaultCode(code, morse);

	morse.setMorseKey(32);
	morse.setResetKey(27);
	morse.input_handler = function(input){ 
		input_element.css('border', '1px solid #000');
		cursor.before(input); 
		buffer_element.append(input); 
		var suggest = Morse.suggest(buffer_element.text());
		var correct = '';
		try {
			 correct = Morse.get(buffer_element.text());
		}
		catch (e){
		}

		table.find('.selected').removeClass('selected');
		table.find('.correct').removeClass('correct');
		for(i in suggest) {
			table.find('.' + suggest[i]).addClass('selected');
		}

		if(!!correct) {
			table.find('.' + correct).addClass('correct').removeClass('selected');
		}

		return false;
	};

	morse.letter_handler = function(input){ 
		if(!input) return;
		var text = input_element.text();
		text = text.substr(0, text.length - 1);
		input_element.text('');
		//cursor.remove();
		try {
			var letter = Morse.get(input);
			input_element.append(text.substr(0, text.length - input.length ) + letter);
			input_code_element.append(input + ' ');
		} catch (e) {
			input_element.css('border', '2px solid #ff0000');
			input_element.append(text.substr(0, text.length - input.length ));
			setTimeout(function(){ input_element.css('border', '1px solid #000'); }, 3000);
		}
		//result_element.append(morse.out(true)); 
		buffer_element.text('');
		input_element.append(cursor);
		buildTweetURL(input_code_element.text());
	};

	morse.word_handler = function(input){ 
		//result_element.append(' '); 
		cursor.before(' ');
		buffer_element.text('');
		input_code_element.append(' ');
	};
	
	morse.reset_handler = function() {
		buffer_element.text('');
		input_element.text('').append(cursor);
		input_code_element.text('');
		buffer_element.text('');
		table.find('.selected').removeClass('selected');
		table.find('.correct').removeClass('correct');
	};

	var handler = morse.getHandler();
	$(document).keydown(handler.on).keyup(handler.off).keyup(handler.reset);


	$(function() {
		$( "#slider" ).slider({
			min:50,
			max:1000,
			value:default_dot_duration,
			step: 10,
			slide: function( event, ui ) {
				$( "#slider-value" ).text( ui.value + " ms" );
			},
			change: function (event, ui) {
				$( "#slider-value" ).text( ui.value + " ms" );
				morse.setDotDuration(ui.value);
				clearInterval(blink);
				blink = blinkCursor(ui.value);
			}
		});
	});
	$( "#slider-value" ).text( default_dot_duration + " ms"  );


});

function defaultCode(str, morse) {
	var input_code_element = $('#input-code');
	input_code_element.append(str);
	buildTweetURL(str);
	str = decode(str).split('  ').join('/');
	
	morse.feed(str);
	$('#cursor').before(morse.out(true));
}


function blinkCursor(dot_duration) {
	return setInterval(function (){
		var cursor = $('#cursor');

		cursor.toggleClass('invisible');
	}, dot_duration);
}

function make_code_table(code_list) {
	var template = $('.template').clone().removeClass('template').removeClass('invisible');
	var table = $('#code-table tbody');

	$('.template').remove();

	var j = 1;
	var max_row = 13;
	var append = function(record) {
		if(table.find('tr').length < j) {
			table.append(record);
		} else {
			table.find('tr:nth-child('+j+')').append(record.find('td'));
		}
	}
	for(i in code_list) {
		var record = template.clone();
		record.find('.letter').text(code_list[i]).addClass(code_list[i]);
		record.find('.code').text(i).addClass(code_list[i]);

		if(j < max_row) {
			append(record);
			j++;
		} else {
			var tr = $('#code-table thead tr');
			var letter_head = tr.find('.letter:first').clone();
			var code_head = tr.find('.code:first').clone();
			tr.append(letter_head).append(code_head);
			append(record);
			j=1;
		}
	}

	for(; j <= max_row; j++) {
		var record = template.clone();
		table.find('tr:nth-child('+j+')').append(record.find('td'));
	}
}


function buildTweetURL(morse_code) {
	$('.twitter-share-button').remove();
	var encoded_code = encode(morse_code).split('.').join('%2E').split('-').join('%2D');
	var url = 'https://twitter.com/share/?text=' + morse_code + ' %5Bhttp://morse.magae.net%3Fcode%3D' + encode(encoded_code)+ '%5D';
	var a = $('<a></a>').attr({
		"href":url,
		"id":"twitter-share-button-morse",
		"data-count":"none",
		"class":"twitter-share-button",
		"data-lang":"en",
	});
	$('#tweet-button').append(a);
	maketweet(document,"script","twitter-wjs");
}




function getQueryVariable(variable) { 
	var query = window.location.search.substring(1); 
	var vars = query.split("&"); 
	for (var i=0;i<vars.length;i++) { 
		var pair = vars[i].split("="); 
		if (pair[0] == variable) { 
			return pair[1]; 
		} 
	} 
} 
function decode(str) {
	if(!str) return undefined;

	if(!!decodeURIComponent){
		return decodeURIComponent(str);
	} else if(!!decodeURI) {
		return decodeURI(str);
	} else {
		return unescape(str);
	}
}

function encode(str) {
	if(!str) return undefined;

	if(!!encodeURIComponent){
		return encodeURIComponent(str);
	}else if(!!encodeURI) {
		return encodeURI(str);
	} else {
		return escape(str);
	}
}
