var windowx,windowh;
var canvas,ctx,arr,then;
var uncleimage,hpbarimage,hpimage,imagearr;
var fistimage,clawimage,broomimage;
var hp;
var totaltime=0;
var isStart=false;
var beat1 =false;
var beat2 =false;
var beat3 =false;
var beat4 =false;
//var allstop=false;
$(document).ready(function(){
	windowx=window.screen.width;
	windowh=window.screen.height;
	$("#index_body").css("width",windowx+"px").css("height",windowh+"px");
	
	touchFunc($("#index_body").get(0),"move",hehe);
	
	

	// Create the canvas  
	canvas = document.createElement("canvas");  
	ctx = canvas.getContext("2d");  
	canvas.width = 320;  
	canvas.height = 400; 
	document.body.appendChild(canvas);
	touchFunc(canvas,"start",beat);

	arr = new Array();
	imagearr = new Array();
	reset();
	then = Date.now();
	// The main game loop  
	
	
	// Let's play this game!  
	setInterval(main, 1); // Execute as fast as possible  
	
});

function hehe(){
	return false;
};

function main(){  
	if(isStart==false){
		ctx.fillStyle = "rgb(0, 0, 0)";  
	    ctx.font = "24px Microsoft YaHei";   
	    ctx.fillText("消灭怪大叔", 60, 100);
	    ctx.fillText("点击开始游戏", 60, 200);
	}
	else if(hp>0){
		var now = Date.now();  
	    var delta = now - then;  
	    //console.log(delta);
	    totaltime+=delta;
	    update(delta / 1000);  
	    render();  
	  
	    then = now;
	}
	else{
		ctx.clearRect(0,0,windowx,windowh);
		ctx.fillStyle = "rgb(0, 0, 0)";  
	    ctx.font = "24px Microsoft YaHei";   
	    ctx.fillText("你消灭了怪大叔", 60, 100);
	    ctx.fillText("用了" + totaltime, 60, 130);
	    //ctx.fillText("点击开始游戏", 60, 200);
	}
      
};  
//Reset the game when the player catches a monster  
function reset() {  
	for (var i=1;i<5;i++){
		//arr[i] = parseInt(Math.random()*3)+1;
		imagearr[i-1] = new Image();
		imagearr[i-1].src = "images/btn"+ i +".png";
	}
	hp = 1000;
	uncleimage = new Image();
	uncleimage.src = "images/uncle.png";
	hpimage = new Image();
	hpimage.src = "images/hp.png";
	hpbarimage = new Image();
	hpbarimage.src = "images/hpbar.png";
	fistimage = new Image();
	fistimage.src = "images/fist.png";
	clawimage = new Image();
	clawimage.src = "images/claw.png";
	broomimage = new Image();
	broomimage.src = "images/broom" +".png";
	
};  
//Update game objects  
function update(modifier) { 
	
};
//Draw everything  
function render(){
	ctx.clearRect(0,0,windowx,windowh);
	
	for (var i=0;i<3;i++){
		ctx.drawImage(imagearr[i], 240-80*i, 320);
	}
	ctx.drawImage(uncleimage, 85, 140);
	ctx.drawImage(hpbarimage, 0, 80);
	ctx.drawImage(hpimage, 0, 0, 65+hp*235/1000, 55, 0, 80, 65+hp*235/1000, 55);
	//ctx.drawImage(heroImage, hero.x, hero.y);
	if(beat1==true){
		ctx.drawImage(fistimage, 0, 180);
	}
	if(beat2==true){
		ctx.drawImage(clawimage, 150, 150);
	}
	if(beat3==true){
		ctx.drawImage(broomimage, 120, 50);
	}
	
	ctx.fillStyle = "rgb(0, 0, 0)";  
    ctx.font = "24px Helvetica";   
    ctx.fillText("caught: " + totaltime, 32, 32);
}; 

//touchFunc(imagearr[3],"start",beat);
function beat(){
	if(isStart==false){
		isStart=true;
		then = Date.now();
	}
	if(isStart==true 
		&&event.targetTouches[0].pageY>320&&event.targetTouches[0].pageY<400){
		var temp = 3-parseInt(event.targetTouches[0].pageX/80);
	
		if(temp==0){
			hp-=10;
			beat1=true;
			setTimeout("beat1=false;",150);
		}
		if(temp==1){
			hp-=10;
			beat2=true;
			setTimeout("beat2=false;",150);
		}
		if(temp==2){
			hp-=10;
			beat3=true;
			setTimeout("beat3=false;",150);
		}
	}
};
