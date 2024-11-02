const express = require('express')
const cors = require('cors')
const fs = require('fs')
const multer = require('multer')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

const {GoogleGenerativeAI} = require('@google/generative-ai')
const port = 8000

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'public')
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+"-"+file.originalname)
    }

})

const upload = multer({storage:storage}).single('file')

let filePath

app.post('/upload',(req,res) =>{
    upload(req,res,(err)=>{
        if(err){
            return res.send('500').json(err)
        }
        filePath = req.file.path
    })
})

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})