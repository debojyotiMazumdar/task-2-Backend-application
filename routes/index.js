var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test',{
  useUnifiedTopology:true,
  useNewUrlParser:true,
  useFindAndModify:false
}).then(()=>{
  console.log('Connected to database')
}).catch((e)=>console.log("Error:"+e))

var Schema=mongoose.Schema;
var BlogDataSchema=new Schema({
  title:{type:String,required:true},
  description:String,
  created_at:{type:Date,default:Date.now()}
});

var BlogData=mongoose.model('BlogData',BlogDataSchema);

/* GET home page. */
router.get('/', async function(req, res, next) {
  const doc=await BlogData.find();
  res.render('index', { items:doc });
});

router.post('/find_by_id', async function(req,res,next){
  var req_id=req.body.id;
  const data=await BlogData.findOne({_id:req_id});
  console.log(data);
  res.render("show-single-data",{data:data});

})

router.get('/new_post_page',async function(req,res,next){
  res.render("new_post_page");
})

router.post('/create',async function(req,res,next){
  var item={
    title:req.body.title,
    description:req.body.description
  };
  var data=new BlogData(item);
  data.save();

  res.redirect('/');
})

//router.post('/delete_by_id',async function(req,res,next){
  //console.log("herer");
 // var id = req.body.id;
 // console.log("in here");
  //BlogData.findByIdAndRemove(id).exec();
 // console.log("deleted");
 // res.redirect('/');
//})

module.exports = router;
