var express = require('express');
var router = express.Router();
const passport=require('../stratergies')

const session=require('express-session')
const { connectdb }=require('../database/db')

router.use(session({
  secret: 'kamehameha',
  resave: false,
  saveUninitialized: true,
}))

router.use(passport.initialize())
router.use(passport.session())

function checkLogin(req, res, next) {
  if(req.user) {
      return next()
  }
  else {
      res.send('<h1>Error 403</h1><h3>Login First!!<h3>')
  }
}


/* GET home page. */
router.get('/exercise1', function(req, res, next) {
  res.render('index');
});

router.get("/breathing",(req,res,next)=>{
  res.render("breathing")
})

router.get("/menu", checkLogin, (req, res, next)=>{
  res.render('menu')
})

router.get("/exercise2",(req,res,next)=>{
  res.render("sideRaises")
})

router.get("/",(req,res,next)=>{
  res.render("home")
})

router.post('/signup', (req, res) => {
  let nuser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  }
  connectdb('hackTIET')
      .then(db => db.collection('users').insertOne(nuser))
      .then(() => res.redirect('/'))
      .catch(err => {
          console.log(err)
          res.send(err)
      })
})

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/menu',
  failureRedirect: '/'
}))


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
    calories+=calories+2*(el / max)
  })

  console.log(typeof calories)
  let tcal=calories.toFixed(2)
  console.log("caloires",tcal)

  res.render("graph_acc",{data:percentage,calories:tcal})
})
module.exports = router;
