

let video;
let poseNet;
let poses = [];
var canvas; 
let case1=false;

let elbowLeft=0
let elbowRight=0
let elbowLeft2=0

var el_down = document.getElementById("GFG_DOWN"); 
var inputF = document.getElementById("id1"); 
var perf=document.getElementById("perf");
var Accuracy=0
let elbowRight2=0
let Data=[0,0,0,0,0]
let case2=false;
let case3=false;
let cycle=0;

var ctx = document.getElementById('myChart').getContext('2d');

function setup() {
canvas =  createCanvas(500, 340);
  video = createCapture(VIDEO);
 video.size(width, height);
 console.log("Wie",width,height)

 canvas.parent('sketch-holder');

  poseNet = ml5.poseNet(video, modelReady);
  
  poseNet.on('pose', function(results) {
    poses = results;
   
  });

  
   video.hide();
}

function modelReady() {
  select('#status').html("Let's Go!!");
}

function draw() {
  image(video, 0, 0, width, height);

 
  drawKeypoints();
  drawSkeleton();
}


function drawKeypoints()  {
 
  for (let i = 0; i < poses.length; i++) {
    
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      
      let keypoint = pose.keypoints[j];
     
      if (keypoint.score > 0.2) {
        fill(124, 252, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }

  if(poses.length!=0){



    if(cycle==5){
perf.style.display="block"
     
        select('#status').html("Congrats! You Made It");
            
  
      }
   
      
if(cycle<5){
  let EFx=poses[0].pose.keypoints[7].position.x
  let EFy=poses[0].pose.keypoints[7].position.y
  let EFx2=poses[0].pose.keypoints[8].position.x
  let EFy2=poses[0].pose.keypoints[8].position.y
   
   elbowLeft=lerp(elbowLeft,EFx,.2)
       elbowRight=lerp(elbowRight,EFy,.2)
       elbowLeft2=lerp(elbowLeft2,EFx2,.2)
       elbowRight2=lerp(elbowRight2,EFy2,.2)
let distance2=dist(elbowLeft,elbowRight,elbowLeft2,elbowRight2)

console.log(poses[0].pose.keypoints[6].position.y-poses[0].pose.keypoints[10].position.y)
  
case1=true;
if(abs(poses[0].pose.keypoints[6].position.y-poses[0].pose.keypoints[10].position.y)<40 &&case1==true && abs(poses[0].pose.keypoints[5].position.y-poses[0].pose.keypoints[9].position.y)<40){
  case2=true;
  case3=false;
  case1=false;
 
}

if( poses[0].pose.keypoints[10].position.y<poses[0].pose.keypoints[2].position.y && case2==true && poses[0].pose.keypoints[9].position.y<poses[0].pose.keypoints[1].position.y ){
  case3=true;
  case2=false;
  case1=false;

 
}
if(poses[0].pose.keypoints[10].position.y < (poses[0].pose.keypoints[6].position.y-40) && case3==true && poses[0].pose.keypoints[9].position.y < (poses[0].pose.keypoints[5].position.y-40) ){
  case1=true;
  case2=false;
  case3=false;
  
  cycle++;
  
  
}


  select('#counting').html(cycle);

Data[cycle-1]=Data[cycle-1]+distance2   


}
 
  
}
}

function gfg_Run() { 
  inputF.setAttribute('value', Data); 
 
} 


function drawSkeleton() {
  
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(124, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
