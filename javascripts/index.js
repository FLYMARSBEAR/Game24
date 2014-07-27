$(document).ready(function(){
	
	$("#index_body").css("left",(window.screen.width-1024)/2);
	
	
	
    // Global variables 
    var ballX = 200; // Ball x position. 
    var ballY = 200; // Ball y position. 
    var ballDY = 0; // Change in ball y position.
    var ballR=10;
    var boardX = 500; // Board width. 
    var boardY = 450; // Board height.
    
    var hints_count=0;

    // This function is called on page load. 

    var bpard = document.createElementNS("http://www.w3.org/2000/svg","rect");
    bpard.setAttribute("x", 1);
    bpard.setAttribute("y", 1);
    bpard.setAttribute("width", boardX-2);
    bpard.setAttribute("height", boardY-2);
    bpard.setAttribute("fill", "thistle");
    back.appendChild(bpard);
    
    var ball = document.createElementNS("http://www.w3.org/2000/svg","circle");
    ball.setAttribute("cx", ballX);
    ball.setAttribute("cy", ballY);
    ball.r.baseVal.value = ballR;
    ball.setAttribute("fill", "tomato");
    back.appendChild(ball);

    var control=1;
    drawGameSVG();
    //stopGameSVG();
    function drawGameSVG() { 
      // Play the game until the ball stops. 
    	gameLoop = setInterval(drawObstacle, 16); 
      // Add keyboard listener. 
    	window.addEventListener('keydown', whatKey, true); 
    } 
    
    function stopGameSVG() { 
        // Play the game until the ball stops. 
        clearInterval(gameLoop); 
        // Add keyboard listener. 
        window.removeEventListener('keydown', whatKey, true); 
    } 
    
    $("#pause").click(function(){
		if(control==1){
			stopGameSVG();
			document.getElementById("pause").innerText="RESTART";
			control=0;
		}
		else{
			drawGameSVG();
			document.getElementById("pause").innerText="PAUSE";
			control=1;
		}
	});
    
    var Obstaclesup=new Array();
    var Obstaclesdown=new Array();
    var ObstacleW=80;
    var basic=600;
    var edge_fixed=50;
    var holeH=150;
    var space_times=3;
    for(var i=0;i<1000;i++)
    {
    	var hole=parseInt(Math.random()*(boardY-2*edge_fixed-holeH)); 
    	
    	Obstaclesup[i]=document.createElementNS("http://www.w3.org/2000/svg","rect");
    	Obstaclesup[i].setAttribute("x", space_times*ObstacleW*i+basic);
    	Obstaclesup[i].setAttribute("y", 0);
    	Obstaclesup[i].setAttribute("width", ObstacleW);
    	Obstaclesup[i].setAttribute("height", edge_fixed+hole);
    	Obstaclesup[i].setAttribute("fill", "navy");
        back.appendChild(Obstaclesup[i]);
        
        Obstaclesdown[i]=document.createElementNS("http://www.w3.org/2000/svg","rect");
    	Obstaclesdown[i].setAttribute("x", space_times*ObstacleW*i+basic);
    	Obstaclesdown[i].setAttribute("y", edge_fixed+holeH+hole);
    	Obstaclesdown[i].setAttribute("width", ObstacleW);
    	Obstaclesdown[i].setAttribute("height", boardY-hole-edge_fixed-holeH);
    	Obstaclesdown[i].setAttribute("fill", "navy");
        back.appendChild(Obstaclesdown[i]);
    }
    
    var timer=0;
    var wave=1;
    var next_wave=1;
    function drawObstacle() { 
    	
    	if(timer%300==0)
    	{
    		wave=next_wave;
    		var temp=Math.random()*2-1;
    		if(temp>0){
    			next_wave=wave+1;
    			next_wave=Math.min(next_wave,1);
    		}
    		else{
    			next_wave=wave-1;
    			next_wave=Math.max(next_wave,-1);
    		}
    		
    		switch (wave) { 
    		case 1: 
    			document.getElementById("wave_dir").innerText="DOWN";
    			break; 
    		case 0: 
    			document.getElementById("wave_dir").innerText="NONE";
    			ballDY=0;
    			break; 
    		case -1: 
    			document.getElementById("wave_dir").innerText="UP";
    			break;
    		}
    		
    		switch (next_wave) { 
    		case 1: 
    			document.getElementById("next_wave_dir").innerText="DOWN";
    			break; 
    		case 0: 
    			document.getElementById("next_wave_dir").innerText="NONE";
    			ballDY=0;
    			break; 
    		case -1: 
    			document.getElementById("next_wave_dir").innerText="UP";
    			break;
    		}
    	}
    	
    	timer++;
    	
    	for(var i=0;i<1000;i++)
        {
    		Obstaclesup[i].setAttribute("x", space_times*ObstacleW*i+basic-timer);
    		Obstaclesdown[i].setAttribute("x", space_times*ObstacleW*i+basic-timer);
        }
    	
    	ballY+=ballDY;
    	ball.setAttribute("cy",ballY);
    	if(timer%10==0)
    	{
    		if(wave==0){
    			ballDY-=ballDY/Math.max(Math.abs(ballDY),1);
    		}
    		else{
    			ballDY+=wave;
    		}	
    	}
    	
    //document.getElementById("test").innerText+=new Date().getTime()+"\n\r";
    } 



    // Get key press. 

    
    var hgive=20;
    var vgive=4;
    function whatKey(evt) { 
    	switch (evt.keyCode) { 
    		case 38: 
    			ballY-=hgive;
    			ballDY-=vgive;
    			if(ballDY<-4)
    				ballDY=-4;
    			break; 
    		case 40: 
    			ballY+=hgive;
    			ballDY+=vgive;
    			if(ballDY>4)
    				ballDY=4;
    			break; 
    	}
    }
       /*  // Left arrow. 
      case 37: 
        paddleDX--; 
        break; 

        // Right arrow. 
      case 39: 
    	paddleDX++; 
        break; 
      */
	
});
