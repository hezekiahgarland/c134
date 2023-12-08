modelstatus = "";
object = [];

function setup() {
    canvas = createCanvas(380, 380)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide()
    objmodel = ml5.objectDetector("cocossd", modelloaded);
}
function preload(){
    alarm= loadSound("alarm.mp3")
}
function draw() {
    image(video, 0, 0, 380, 380);
    textSize(20);
    objmodel.detect(video, gotresults);
    r = floor(random(255));
    g = floor(random(255));
    b = floor(random(255));
    if (modelstatus != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "staus:objectdetected"
            obj_name = object[i].label;
            if(obj_name=="person"){
                document.getElementById("number_of_Object").innerHTML="baby found :";
                obj_confidence = floor(object[i].confidence * 100)
                objx = object[i].x;
                objy = object[i].y;
                obj_width = object[i].width;
                obj_height = object[i].height;
                fill(r,g,b)
                text(obj_name + " " + obj_confidence + "%", objx + 5, objy + 15);
                noFill();
                stroke(r,g,b);
                rect(objx, objy, obj_width, obj_height);
    alarm.pause();
            }
            else{
                document.getElementById("number_of_Object").innerHTML="baby not found :";
alarm.play();
            }
                    }
    }
}

function modelloaded() {
    console.log("modelloaded successfully");
    document.getElementById("status").innerHTML = "status:object dectation started";
    modelstatus = true;
}

function gotresults(e, r) {
    if (e) {
        console.error(e)
    } else {
        console.log(r);
        object = r
    }
}