const jwt = require('jsonwebtoken');
require('dotenv').config();
import mongoose from 'mongoose';
import Login from '../Database/Login'


const authMiddleware = async (req, res, next)=>{
 
    const token = req.header("Authorization");

    if(!token){
        res.status(401).json("Token not provided");
    }
    else{
        try{
            const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);

            

            next()
        }
        catch(err){
            console.error(err);
            res.status(401).json("Server error");
        }
    }
}

