var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/performance",(req,res,next)=>{
  console.log("Sss",req.body)
  var performance=req.body.performance
  var newArr=[]
  performance=performance.split(',')
  console.log("-->",performance)
  performance.forEach((el)=>{
newArr.push(parseFloat(el))
  })
  console.log(newArr,typeof(newArr))

  res.render("graph_acc",{data:newArr})
})
module.exports = router;
