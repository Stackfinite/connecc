const fs = require(`fs`)

const JSONpath = `../../data/contact.json`
const CONTACT = JSON.parse(fs.readFileSync(JSONpath, `utf8`))

const errorMsg = (req,res) =>{
    res.status(404).send({
        message: "Error, Not found!!"
    })
}

const contact = {
    show: (req, res) => {
        res.status(200).send(CONTACT)
    },
    
    add:(req,res) =>{
        if(req.body.name && req.body.phoneNumber && req.body.email && req.body.address){
            const data ={
                id : counter++,
                "name":req.body.name,
                "phoneNumber":req.body.phoneNumber,
                "email":req.body.email,
                "address":req.body.address
            }
            const beReadable =  JSON.stringify(CONTACT,null,2)
            fs.writeFileSync(JSONpath,be)
            data ? res.status(200).send(CONTACT) : errorMsg()
        }
    }
}

module.exports = contact
