window.onload=function(){
	load();
}

randomColor = function() {
	//Credit: http://paulirish.com/2009/random-hex-color-code-snippets/
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}

randomRange = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

addCircle = function(id) {
	var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
	circle.setAttribute('cx', randomRange(5,800));
	circle.setAttribute('cy', randomRange(5,800));
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
	
	circle.appendChild(animate);
	canvas.appendChild(circle);
	
}

function load() {
	for (var i=0; i < 100; i++) {
		var canvas = document.getElementById('canvas');
		addCircle(i);
	}
}
