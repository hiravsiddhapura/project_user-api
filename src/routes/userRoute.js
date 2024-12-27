const express = require('express')
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: ".env", });
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const UsersDetail = require('../models/user')
// Handel the Post Request
router.post("/users", async (req, res) => {
    try {
        console.log(req.body);
        const user = await UsersDetail.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({ message: "email already exists" });
        }
        const addUser = new UsersDetail(req.body)
        const insertUsers = await addUser.save();
        console.log(insertUsers);
        const payload = {
            id: insertUsers._id,
            email: insertUsers.email
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        console.log(token);

        res.status(201).send({insertUsers, token:token})
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// Handel the get Request
router.get("/user",auth, async(req,res)=>{
    try {
        const getUser = await UsersDetail.findById(req.user.id)
        res.send(getUser)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Handel the get Request
router.get("/users", auth, async (req, res) => {
    try {
        const getUsers = await UsersDetail.find({})
        res.send(getUsers)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// Handel the get Individual Request 
router.get("/users/:id", auth, async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(_id);
        
        const getUser = await UsersDetail.findById( _id )
        console.log(getUser);
        
        res.send(getUser)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// Handel the patch Request 
router.patch("/users/:id", auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await UsersDetail.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.send(getUser)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

// Handel the Delete Request 
router.delete("/users/:id", auth, async (req, res) => {
    try {
        const getUser = await UsersDetail.findByIdAndDelete(req.params.id)
        res.send(getUser)
    }
    catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router;