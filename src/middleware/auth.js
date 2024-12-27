const jwt = require("jsonwebtoken")
const UsersDetail = require('../models/user')
const dotenv = require("dotenv");
dotenv.config({ path: ".env", });

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    
    
    if(!token){
        return res.status(400).json({message:"token no provided"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        req.user = await UsersDetail.findById(decoded.id).select("-password");
        console.log(req.user);
        
        if(!req.user){
            return res.status(404).json({ message :"User not found"})
        }
        next();
    } catch (error) {
        res.status(401).json(error)
    }
}