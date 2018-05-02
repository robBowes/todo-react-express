const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))

let serverState = {
    items: [[],[],[]]
}

app.post('/items', (req, res) => {
    let listNumber = JSON.parse(req.body.toString()).listNumber
    res.send(JSON.stringify(serverState.items[listNumber]));
})

app.post('/addItem', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    console.log(parsedBody);
    
    // The following could be rewritten in a shorter way using push.
    // I'm trying to ween everyone off of push
    
    serverState.items[parsedBody.listNumber] = serverState.items[parsedBody.listNumber].concat(parsedBody.itemInput)
    res.send(JSON.stringify(serverState.items));
    
})

app.put('/reverseList', (req,res)=>{
    let listNumber = JSON.parse(req.body)
    serverState.items[listNumber] = [...serverState.items][listNumber].reverse();
    res.send(JSON.stringify({items: serverState.items[listNumber]}))
})
app.delete('/deleteList', (req,res)=>{
    let listNumber = JSON.parse(req.body)
    serverState.items[listNumber] = [];
    res.send(JSON.stringify({items: serverState.items[listNumber]}))
})

app.listen(4000, () => console.log('Example app listening on port 4000!'))
