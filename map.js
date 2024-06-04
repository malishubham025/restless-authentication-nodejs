const secret="funny@123";
const jwt=require("jsonwebtoken");
function getuser(id){
    if(!id) return null;
    try{
        return jwt.verify(id,secret);
    }
    catch{
        return null;
    }
    
}
function setuser(user){
    
    return jwt.sign(user,secret);
}
module.exports={getuser,setuser};