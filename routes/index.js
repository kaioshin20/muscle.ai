var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/breathing",(req,res,next)=>{
  res.render("breathing")
})


router.get("/exercise2",(req,res,next)=>{
  res.render("sideRaises")
})


router.post("/performance",(req,res,next)=>{
  
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
  })
  res.render("graph_acc",{data:percentage})
})
module.exports = router;
