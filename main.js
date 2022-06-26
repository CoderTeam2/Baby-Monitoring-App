var alert = "";
var video = "";
var obj = [];
var obj_detector = "";
var model_state = "";
var person_counter = 0;

function preload() {
    alert = loadSound("Alert.mp3");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    canvas.position(550,250);
    video = createCapture(VIDEO);
    video.size(canvas.width, canvas.height);
    video.hide();
}
function modelLoaded() {
    console.log("Model loaded");
    model_state = true;
}
function start() {
    obj_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status1").innerHTML = "Status: loading......";
}

function draw() {
    image(video, 0, 0, 420, 640);
    if (model_state != "") {
        obj_detector.detect(video, gotResults);
        document.getElementById("status1").innerHTML = "Status: Objects Detected";
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].label == 'person') {
                person_counter++;
                document.getElementById("status2").innerHTML = "Baby found";
                alert.stop();

            } else if (obj[i].label != 'person') {
                if (person_counter == 0) {
                    document.getElementById("status2").innerHTML = "Baby not found";
                    alert.play();
                }
            }
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        obj = results
    }
}
