var windowx,windowh;
$(document).ready(function(){
	windowx=window.screen.width;
	windowh=window.screen.height;
	//$("#index_body").css("left",(window.screen.width-1024)/2);
	$("#index_body").css("left",windowx+"px").css("height",windowh+"px");
	touchFunc($("#index_body").get(0),"start",haha);
	touchFunc($("#index_body").get(0),"move",hehe);
	
	function haha(){
		//alert("ss");
	};
	function hehe(){
		//
		return false;
	};

	
	/*document.body.onmousemove = function(event) {
		return false;
	    event = event || window.event;
	    console.dir(event);	
	};*/
	
    // Global variables 
    var ballX = 20; // Ball x position. 
    var ballY = 20; // Ball y position. 
    var ballDX = 2; // Change in ball x position. 
    var ballDY = 4; // Change in ball y position.
    var ballR=5;
    var boardX = 500; // Board width. 
    var boardY = 500; // Board height. 
    var paddleDX = 0; // Change in board x position. 
    var paddleX = 150; // Initial paddle location. 
    var paddleH = 10; // Paddle height. 
    //var paddleD = boardY - paddleH; // Paddle depth. 
    var paddleW = 100; // Paddle width. 
    
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
    
    var paddle = document.createElementNS("http://www.w3.org/2000/svg","rect");
    paddle.setAttribute("x", 100);
    paddle.setAttribute("y", 100);
    paddle.setAttribute("width", paddleW);
    paddle.setAttribute("height", paddleH);
    paddle.setAttribute("fill", "navy");
    back.appendChild(paddle);
    
    function gravity() {
    	ballDY++;
    }
    
    function drawGameSVG() { 
      // Play the game until the ball stops. 
      gameLoop = setInterval(drawBall, 16); 
      //gravityLoop = setInterval(gravity, 96);
      // Add keyboard listener. 
      window.addEventListener('keydown', whatKey, true); 
    } 
    
    function stopGameSVG() { 
        // Play the game until the ball stops. 
        clearInterval(gameLoop); 

        // Add keyboard listener. 
        window.removeEventListener('keydown', whatKey, true); 
    } 

    function drawBall() { 
    	
    //document.getElementById("test").innerText+=new Date().getTime()+"\n\r";
      // Change the ball location. 
      ballX += ballDX; 
      ballY += ballDY;
      paddleX += paddleDX;
      ball.setAttribute("cx", ballX); 
      ball.setAttribute("cy", ballY); 
      if(paddleX<=0){
    	  paddleX=0;
    	  paddleDX=0;
      }
      else if(paddleX>=boardX-paddleW){
    	  paddleX=boardX-paddleW;
    	  paddleDX=0;
      }
      
      paddle.setAttribute("x", paddleX);
   
      


      // Bounce on a left or right edge. 
      if (ballX + ballDX > boardX - ballR || ballX + ballDX < ballR) ballDX = -ballDX; 

      // If ball hits the top, bounce it.  
      if (ballY + ballDY < ballR) ballDY = -ballDY; 
      // If the ball hits the bottom, check see if it hits a paddle. 
      else if (ballY + ballDY > boardY - ballR) { 
        // If the ball hits the paddle, bounce it. 
        if (ballX > paddleX && ballX < paddleX + paddleW) 
        {
        	ballDY = -ballDY;
        	ballDX += paddleDX; 
        	hints_count++;
        	document.getElementById("count").innerText=hints_count;
        }
        // Otherwise the game is over. 
        else { 
          clearInterval(gameLoop); 
          alert("Game over!"); 
        } 
      } 
    } 



    // Get key press. 


    function whatKey(evt) { 

      switch (evt.keyCode) { 
        // Left arrow. 
      case 37: 
        paddleDX--; 
        //if (paddleX < 0) paddleX = 0; 
        //paddle.setAttribute("x", paddleX); 
        break; 

        // Right arrow. 
      case 39: 
    	paddleDX++;  
        //if (paddleX > boardX - paddleW) paddleX = boardX - paddleW; 
        //paddle.setAttribute("x", paddleX); 
        break; 
      } 
    } 
    
    var control=1;
    drawGameSVG();
    //stopGameSVG();
    
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
});
