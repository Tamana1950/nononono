song="";
scoreleftwrist=0;
leftwristx=0;
leftwristy=0;
scorerightwrist=0;
rightwristx=0;
rightwristy=0;
function setup()
{ 
    
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
    fill("#00ff6e");
    stroke("#05ff1a");
    circle(rightwristx,rightwristy,20);
    if(rightwristy>0 && rightwristy<=100)
    {
     document.getElementById("speed").innerHTML="speed = 0.5x";
     song.rate(0.5);
    }
    else if(rightwristx>100 && rightwristy<=200)
    {
        document.getElementById("speed").innerHTML="speed = 1x"
        song.rate(1);
    }
    else if(rightwristx>200 && rightwristy<=300)
    {
        document.getElementById("speed").innerHTML="speed = 1.5x"
        song.rate(1.5);
    }
    else if(rightwristx>300 && rightwristy<=400)
    {
        document.getElementById("speed").innerHTML="speed = 2x"
        song.rate(2);
    }
    else if(rightwristx>400 && rightwristy<=500)
    {
        document.getElementById("speed").innerHTML="speed = 2.5x"
        song.rate(2.5);
    }
    else if(rightwristx>500 && rightwristy<=600)
    {
        document.getElementById("speed").innerHTML="speed = 10x"
        song.rate(10);
    }
    if(scoreleftwrist>0.2)
    {
        
    circle(leftwristx,leftwristy,25);
    InNumberleftwristy=Number(leftwristy);
     remove_decimals=floor(InNumberleftwristy);
     volume=remove_decimals/500;
     document.getElementById("volume").innerHTML="volume="+ volume;
     song.setVolume(volume);
    }

     
   
}

function preload()
{
    song=loadSound("music.mp3");
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded()
{
    console.log('poseNet is initialized');
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keyPoint[9].score;
        scorerightwrist=results[0].pose.keyPoint[10].score;
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;

    }

}
