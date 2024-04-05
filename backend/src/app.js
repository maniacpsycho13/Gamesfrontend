import cookieParser from "cookie-parser";

import express from "express";
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('public'))
app.use(cookieParser())



//routes

import userRoutes from "./routes/user.routes.js";
import progressRoutes from "./routes/progress.routes.js";

app.use('/api/v1/users',userRoutes)

app.use('/api/v1/users',progressRoutes)

app.get('/api/ans/level1', (req, res) => {
    res.json({message: process.env.LEVEL1ANS})
})

app.post('/api/ans/level1', (req, res) => {
    const {level1ans} = req.body
    
    if(level1ans===process.env.LEVEL1ANS){
        res.json({message: true, level1ans})
    }
    res.json({message: false, level1ans})
})
app.post('/api/ans/level5', (req, res) => {
    const {level5ans} = req.body
    
    if(level5ans===process.env.LEVEL5ANS){
        res.json({message: true, level5ans})
    }
    res.json({message: false, level5ans})
})

app.post('/api/ans/level9', (req, res) => {
    const {level9ans} = req.body
    
    if(level9ans===process.env.LEVEL9ANS){
        res.json({message: true, level9ans})
    }
    res.json({message: false, level9ans})
})

export {app};