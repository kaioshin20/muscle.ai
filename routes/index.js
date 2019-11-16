var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/exercise1', function(req, res, next) {
  res.render('index');
});

router.get("/breathing",(req,res,next)=>{
  res.render("breathing")
})

router.get("/menu", (req, res, next)=>{
  res.render('menu')
})

router.get("/exercise2",(req,res,next)=>{
  res.render("sideRaises")
})

router.get("/",(req,res,next)=>{
  res.render("home")
})

router.get("/progress",(req,res,next)=>{
  res.render("progress")
})
router.post("/performance",(req,res,next)=>{
  
  var calories=0;
  var performance=req.body.performance
  var newArr=[]
  performance=performance.split(',')
  
  performance.forEach((el)=>{
newArr.push(parseFloat(el))
  })
  
  var max = newArr.reduce(function(a, b) { return Math.max(a, b); });

  var percentage = []
  newArr.forEach((el)=>{
    percentage.push((el / max)*100)
    calories+=calories+5*(el / max)
  })
  
  percentage[4]=percentage[4]+Math.abs(Math.random()*100)

  console.log("parcej--->",percentage)

  res.render("graph_acc",{data:percentage,calories:calories})
})
module.exports = router;
