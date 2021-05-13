img="";
status="";
objects=[];
function setup(){
    canvas=createCanvas(390,390);
    // canvas.position(475, 150);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    video.size(390,390)

    cocossd=ml5.objectDetector('cocossd',modalLoaded);
    document.getElementById("status").innerHTML="Detecting Objects";
}
function modalLoaded(){
    console.log("MODAL LOADED!");
    status=true;    
}
function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{        
        console.log(result);
        objects=result;
    }
}
function draw(){
    image(video,0,0,390,390);
    if(status!=""){        
        cocossd.detect(video,gotResult);
        console.log("VIDEO LOADED");
        for(l=0;l<objects.length;l++){
            r=random(225);
            g=random(225);
            b=random(225);
            fill(r,g,b);
            stroke(r,g,b);
            rect(objects[l].x,objects[l].y-30,120,30,0,10,0,0);
            fill('#ffffff');
            confidence=floor(objects[l].confidence*100);
            text(objects[l].label+"  "+confidence+"%",objects[l].x+5,objects[l].y-10);
            noFill();
            stroke(r,g,b);
            strokeWeight(5);
            rect(objects[l].x,objects[l].y,objects[l].width,objects[l].height);            
            document.getElementById("status").innerHTML="Objects Detected";
            document.getElementById("objects_detected").innerHTML="Objects Detected - "+objects.length;
        }
    }
}