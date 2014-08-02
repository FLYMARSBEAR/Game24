var windowx,windowh;
var canvas,ctx,then;
var bloodimage,uncleimage,hpbarimage,hpimage,imagearr;
var bandimage1,bandimage2,dizzyimage1,dizzyimage2;
var fistimage,clawimage,broomimage;
var then,hp,hpt;
var totaltime=0;
var isStart=false;
var beat1 =false;
var beat2 =false;
var beat3 =false;
var beat1_count, beat2_count, beat3_count;
var douchoice;
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

	douchoice = new Array();
	imagearr = new Array();
	
	hpt = 2000;
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
	    ctx.fillText(totaltime, 60, 300);
	}
	else if(isStart==true&&hp>0){
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
		douchoice[i-1] = 1;
		imagearr[i-1] = new Image();
		imagearr[i-1].src = "images/btn"+ i +".png";
	}
	hp = hpt;
	beat1_count = 0;
	beat2_count = 0;
	beat3_count = 0;
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
	bloodimage = new Image();
	bloodimage.src = "images/blood" +".png";
	bandimage1 = new Image();
	bandimage1.src = "images/bandage" +".png";
	bandimage2 = new Image();
	bandimage2.src = "images/bandage2" +".png";
	dizzyimage1 = new Image();
	dizzyimage1.src = "images/dizzy1" +".png";
	dizzyimage2 = new Image();
	dizzyimage2.src = "images/dizzy2" +".png";
	
};  
//Update game objects  
function update(modifier) { 
	if(parseInt(Math.random()*10)==0){
		var change = parseInt(Math.random()*3);
		douchoice[change] = parseInt(Math.random()*6);
	}	
};
//Draw everything  
function render(){
	ctx.clearRect(0,0,windowx,windowh);
	
	for (var i=0;i<3;i++){
		ctx.drawImage(imagearr[i], 200-80*i, 320);
	}
	for (var i=0;i<3;i++){
		ctx.drawImage(imagearr[i], 220, 260-60*i, 40, 40);
		ctx.fillText("x" + douchoice[i], 270, 290-60*i);
	}
	
	ctx.drawImage(uncleimage, 65, 140);
	if(hp<0.8*hpt){
		ctx.drawImage(bandimage1, 140, 185);
	}
	if(hp<0.6*hpt){
		ctx.drawImage(bandimage2, 130, 280);
	}
	if(hp<0.2*hpt){
		ctx.drawImage(bloodimage, 120, 135);
	}
	if(hp<0.4*hpt){
		var dizzy = Math.random()*2;
		if(dizzy<1){
			ctx.drawImage(dizzyimage1, 60, 100);
		}
		else{
			ctx.drawImage(dizzyimage2, 60, 100);
		}
		//ctx.drawImage(bandimage2, 150, 280);
	}
	ctx.drawImage(hpbarimage, 0, 80);
	ctx.drawImage(hpimage, 0, 0, 65+hp*235/hpt, 55, 0, 80, 65+hp*235/hpt, 55);
	//ctx.drawImage(heroImage, hero.x, hero.y);
	if(beat1==true){
		ctx.drawImage(fistimage, 0, 180);
	}
	if(beat2==true){
		ctx.drawImage(clawimage, 130, 150);
	}
	if(beat3==true){
		ctx.drawImage(broomimage, 100, 50);
	}
	
	ctx.fillStyle = "rgb(0, 0, 0)";  
    ctx.font = "24px Microsoft YaHei";   
    ctx.fillText("Time:" + totaltime/1000, 32, 32);
}; 

//touchFunc(imagearr[3],"start",beat);
function beat(){
	if(isStart==false){
		isStart=true;
		then = Date.now();
	}
	if(isStart==true 
		&&event.targetTouches[0].pageY>320&&event.targetTouches[0].pageY<400){
		var temp = 2-parseInt((event.targetTouches[0].pageX-40)/80);
	
		if(temp==0){
			hp-=10*douchoice[temp];
			beat1=true;
			setTimeout("beat1=false;",150);
			beat1_count++;
		}
		if(temp==1){
			hp-=10*douchoice[temp];
			beat2=true;
			setTimeout("beat2=false;",150);
			beat2_count++;
		}
		if(temp==2){
			hp-=10*douchoice[temp];
			beat3=true;
			setTimeout("beat3=false;",150);
			beat3_count++;
		}
	}
};
