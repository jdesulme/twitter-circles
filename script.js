$(document).ready(function(){
	
	var tempSN = "jeffsonstein";
	
	getFollowers(tempSN);
	
	/*
	for (var i=0; i < 100; i++) {
		var canvas = document.getElementById('canvas');
		addCircle(i);
	}
	*/

}

randomColor = function() {
	//Credit: http://paulirish.com/2009/random-hex-color-code-snippets/
	return '#' + Math.floor(Math.random()*16777215).toString(16);
}

randomRange = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

addCircle = function(id) {
	var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
	circle.setAttribute('cx', randomRange(5,1024));
	circle.setAttribute('cy', randomRange(5,1024));
	circle.setAttribute('r', randomRange(2,100));
	circle.setAttribute('fill', randomColor());	
	circle.setAttribute('opacity', 0.4);
	circle.setAttribute('id', id);
	circle.style.cursor = 'pointer';
	
	var animate = document.createElementNS("http://www.w3.org/2000/svg","animateTransform");
	animate.setAttribute('attributeName', 'transform');
	animate.setAttribute('type', 'rotate');
	animate.setAttribute('from', randomRange(2,100));
	animate.setAttribute('to', randomRange(2,100));
	animate.setAttribute('dur', '30s');
	animate.setAttribute('repeatCount', 'indefinite');
	
	//add an event listener so once they click on a bubble it loads there info
	//do a hover event where it loads a single person
	
	circle.appendChild(animate);
	canvas.appendChild(circle);
	
}

getFollowers = function(sn) {
	$.ajax({
		url: "http://api.twitter.com/1/friends/ids.json",
		dataType: "jsonp",
		data: {
			screen_name: sn
		},
		timeout: 15000,
		success: function( data ) {
			console.log(data);
			//populate the bubbles and create the circles
		}
	});		

}



getUserById = function(id) {
	$.ajax({
		url: "http://api.twitter.com/1/users/show.json",
		dataType: "jsonp",
		data: {
			user_id: id,
		},
		timeout: 15000,
		success: function(data) {
			console.log(data);
			//load a modal window displaying the information
		}
	});			
}			

clearAll = function(location) {
	node = document.getElementById( location );
	while (node.hasChildNodes()) {
		node.removeChild(node.lastChild);
	}
}
