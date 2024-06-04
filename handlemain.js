const {getuser}=require("./map");
function handleMain(req,res,next){
    const id=req.cookies.id;
    // console.log(req.cookies);
    // next();
    if(!id || !getuser(id)){
        res.render("login");
    }
    else if(getuser(id)){
        res.render("main");
    }
}
module.exports=handleMain;