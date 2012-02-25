$(document).ready(function() {
	getFollowers("jeffsonstein"); //sets the default account to be loaded
	
	$('#canvas').attr({height: ($(window).height() > 600) ? $(window).height() : '600', width: ($(window).width() > 740) ? $(window).width() : '740'});

	//if mask is clicked clear out the screen
	$('#mask').click(function() {
		$(this).hide();
		$('.window').hide();
	});     
	
	$('#load').submit(function(){
		clear('canvas');
		var username = $('#sn').val();
		getFollowers(username);
		return false;
	});
	
	$("#canvas").on("click",".circle", function() {
		var id = $(this).attr('id');
		
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		
		//Set height and width to mask to fill up the whole screen
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		 
		//transition effect     
		$('#mask').fadeIn(1000);    
		$('#mask').fadeTo("slow",0.8);  
	 
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
		
		//gets and sets the information
		getUserById(id);
		
		 //Set the popup window to center
		$('#twitter-info').css('top',  winH/2-$('#twitter-info').height()/2);
		$('#twitter-info').css('left', winW/2-$('#twitter-info').width()/2);
	
		//transition effect
		$('#twitter-info').fadeIn(2000); 
		
	});

});
	
randomColor = function() {
	//Credit: http://paulirish.com/2009/random-hex-color-code-snippets/
	return '#' + Math.floor(Math.random()*16777215).toString(16);
}

randomRange = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


getFollowers = function(sn) {
	console.log(sn);
	$.ajax({
		url: "http://api.twitter.com/1/friends/ids.json",
		dataType: "jsonp",
		data: { screen_name: sn },
		timeout: 15000,
		success: function(data) {
			console.log(data);
			//populate the bubbles and create the circles
			//loads only 150 random ids instead of all of them
			var len = data.ids.length;
			for (var i = 0; i < len; i++) {
				addCircle(data.ids[i]);
			}
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
			//load the information into the dom ready to be displayed
			displayUserInfo(data);
		}
	});			
}			

displayUserInfo = function(obj) {	
	clear('twitter-info'); //clear previous elements
	var display = document.getElementById('twitter-info'); 
	
	//create and append the figure element
	var figure = document.createElement('figure');
	var image = document.createElement('img');
	image.setAttribute('src', obj.profile_image_url);
	image.setAttribute('alt', obj.name);
	figure.appendChild(image);
	display.appendChild(figure);
	
	//add the screen name and attach an a tag
	var snNode = document.createElement('p');
	
	var linkNode = document.createElement('a');
	linkNode.setAttribute('href','http://www.twitter.com/' + obj.screen_name);
	
	var snTxt = document.createTextNode(obj.name + '(' + obj.screen_name + ')' );
	snNode.setAttribute('class', 'name');
	
	linkNode.appendChild(snTxt);
	snNode.appendChild(linkNode);
	display.appendChild(snNode);
	
	//adds the users count info for tweets, friends, and followers
	var infoNode = document.createElement('p');
	var infoTxt = document.createTextNode('Tweets: '+ obj.statuses_count + ' | Friends: ' + obj.friends_count + ' | Followers: ' + obj.followers_count );
	infoNode.setAttribute('class', 'info');
	infoNode.appendChild(infoTxt);
	display.appendChild(infoNode);
	
	//adds the users current status information
	var statNode = document.createElement('p');
	var statTxt =  document.createTextNode(obj.status.text);
	statNode.setAttribute('class', 'stats');
	statNode.appendChild(statTxt);
	display.appendChild(statNode);
}

addCircle = function(id) {
	var height = ($(window).height() > 600) ? $(window).height() : '600';
	var width = ($(window).width() > 740) ? $(window).width() : '740';
	var canvas = document.getElementById('canvas');
	var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
	var motion = document.createElementNS("http://www.w3.org/2000/svg","animateMotion");

	//sets the attributes for the circle
	circle.setAttribute('class', 'circle');
	circle.setAttribute('cx', randomRange(0,width));
	circle.setAttribute('cy', randomRange(0,height));
	circle.setAttribute('r', randomRange(2,50));
	circle.setAttribute('fill', randomColor());	
	circle.setAttribute('opacity', 0.4);
	circle.setAttribute('id', id);
	circle.style.cursor = 'pointer';
	
	//sets the attributes for animateMotion
	motion.setAttribute('dur', '1s');
	motion.setAttribute('repeatCount', 'indefinite');
	
	//attaches everything together
	circle.appendChild(motion);
	canvas.appendChild(circle);
}

clear = function(location) {
	node = document.getElementById( location );
	while (node.hasChildNodes()) {
		node.removeChild(node.lastChild);
	}
}
