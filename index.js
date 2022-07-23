const express=require('express')
const cors = require ('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('hello world')
})


app.listen(5050,()=>{
    console.log('app listening on: 5050');
})