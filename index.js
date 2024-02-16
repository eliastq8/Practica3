const express = require ('express')
const morgan = require('morgan')
const app = express();
const port = 3000;

app.use(express.json())
app.use(morgan('dev'))

const data = [

    {
        hola:3,
        adios: "Adios",
        id:1
    },
    {
        hola:1,
        adios: "Adios :D",
        id:2
    },
    {
        hola:2,
        adios: "Adios",
        id:3
    },
    {
        hola:6,
        adios: "Adios :D",
        id:4
    }
]

app.get("/", (req, res) => {
    res.send("hola mundo")
})
app.get("/data/all", (req, res) => {
    res.status(200).json(data)
})
app.get("/data", (req, res) => {
    const query_adios=req.query.adios
    const query_hola=req.query.hola
    if(query_adios&&query_hola){
        const filtro= data.filter(item=>item.hola==query_hola&&item.adios==query_adios)
        if(filtro.length>0){
            res.status(200).json(filtro)
        }else{
            res.status(404).json({message:"Noencontrado"})
        }
    }else{
        res.status(301).redirect("/data/all")
    }
})
app.get("/data/:id",(req,res)=>{
    const id_user=req.params.id
    const encontrado= data.find(item=>item.id==id_user)
    if(encontrado){
        res.status(200).json(encontrado)
    }else{
        res.status(404).json({message:"Noencontrado"})
    }
})
app.post("/data",(req,res)=>{
    const user_body=req.body
    data.push(user_body)
    res.status(201).json(data)
})

app.put("/data/:hola",(req,res)=>{
    const user_body= req.body
    const param=req.params.hola
    const encontrado=data.findIndex(item=>item.hola==param)
    if(encontrado!=-1){
        data[encontrado]=user_body
        res.status(201).json(data)
    }else{
        res.status(404).json({message:"No encontrado"})
    }
})
app.listen(port, () => {
    console.log("Escuchando el puerto:", port)
})