const express=require("express");
const bodyParser=require("body-parser");
const mysql=require("mysql");
const app=express();
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("index");
})
const conn=mysql.createConnection({
    host:"localhost",
    database:"project",
    password:" ",
    user:"root"
})
conn.connect((err)=>{
    if(err){
        console.log("unable to connect ");
        console.log(err);
    }
    else{
        console.log("connected");
    }
})
const handleMain=require("./handlemain");
app.get("/main",handleMain,function(req,res){
    res.render("main");
})
const {getuser,setuser}=require("./map");
app.post("/login",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    console.log(username,password);
   
    conn.query("select * from user_login where username=? and password=?",[username,password],function(err,result){
        if(result.length>0){
            const user={username:username,password:password};
            const id=setuser(user);
            res.cookie("id",id);
            res.render("main");
        }
        else{
            res.render("login");
        }
    })
    
    
})

app.get("/login",function(req,res){
    res.render("login");
})


app.listen(3000,function(){
    console.log("listen");
})