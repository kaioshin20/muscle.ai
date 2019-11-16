

let video;
let poseNet;
let poses = [];
var canvas; 
let case1=false;
// let recent=0;
let elbowLeft=0
let elbowRight=0
let elbowLeft2=0

var el_down = document.getElementById("GFG_DOWN"); 
var inputF = document.getElementById("id1"); 

var Accuracy=0
let elbowRight2=0
let Data=[0,0,0,0,0]
let case2=false;
let case3=false;
let cycle=0;
//var saved = false;
var ctx = document.getElementById('myChart').getContext('2d');

function setup() {
canvas =  createCanvas(500, 340);
  video = createCapture(VIDEO);
 video.size(width, height);
 console.log("Wie",width,height)
//  var x = (windowWidth - width/2) / 2;
//  var y = (windowHeight - (height+height/2)) / 2;
//  canvas.position(x, y);
 canvas.parent('sketch-holder');
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    //console.log("poses",poses)
  });

  // Hide the video element, and just show the canvas
   video.hide();
}

function modelReady() {
  select('#status').html("Let's Go!!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or keypoints[5])position.
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(124, 252, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }

  if(poses.length!=0){



    if(cycle==4){

      //   Data.forEach((el)=>{
      //     Accuracy=Accuracy+el
      //   })
  
      // Accuracy=Accuracy/
        //video.hide();
        select('#counting').html("Congrats! You Made It");
               console.log("data os",Data)
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
  
    // The data for our dataset
    data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: 'Your Accuracy',
            backgroundColor: 'rgb(0, 0, 0)',
            borderColor: 'rgb(255, 255, 255)',
            data: Data 
            //[0, 10, 5, 2, 20, 30, 45]
        }]
    },
  
    // Configuration options go here
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  }
  });
  
  
  
      }
     // recent=cycle;
      
if(cycle<5){
  let EFx=poses[0].pose.keypoints[7].position.x
  let EFy=poses[0].pose.keypoints[7].position.y
  let EFx2=poses[0].pose.keypoints[8].position.x
  let EFy2=poses[0].pose.keypoints[8].position.y
 //  console.log("elbow left"+EFx+"--",EFy)
   //console.log("elbow left"+EFx2+"--",EFy2)    
   elbowLeft=lerp(elbowLeft,EFx,.2)
       elbowRight=lerp(elbowRight,EFy,.2)
       elbowLeft2=lerp(elbowLeft2,EFx2,.2)
       elbowRight2=lerp(elbowRight2,EFy2,.2)
let distance2=dist(elbowLeft,elbowRight,elbowLeft2,elbowRight2)


case1=true;
if(abs(poses[0].pose.keypoints[6].position.y-poses[0].pose.keypoints[10].position.y)<30&&case1==true && abs(poses[0].pose.keypoints[5].position.y-poses[0].pose.keypoints[9].position.y)<30){
  case2=true;
  case3=false;
  case1=false;
  
}

if( poses[0].pose.keypoints[10].position.y<poses[0].pose.keypoints[2].position.y && case2==true && poses[0].pose.keypoints[9].position.y<poses[0].pose.keypoints[1].position.y ){
  case3=true;
  case2=false;
  case1=false;

 
}
if(poses[0].pose.keypoints[10].position.y < (poses[0].pose.keypoints[6].position.y-30) && case3==true && poses[0].pose.keypoints[9].position.y < (poses[0].pose.keypoints[5].position.y-30) ){
  case1=true;
  case2=false;
  case3=false;
  
  cycle++;
  
  
}

//  if(cycle!=recent){
  console.log("cycle: " + cycle);
  select('#counting').html(cycle);

Data[cycle-1]=Data[cycle-1]+distance2   


}
 
  
}
}

function gfg_Run() { 
  inputF.setAttribute('value', Data); 
 
} 

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(124, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
