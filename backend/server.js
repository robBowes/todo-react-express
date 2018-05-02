const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))

let serverState = {
    items: []
}

app.get('/items', (req, res) => {
    res.send(JSON.stringify(serverState.items));
})

app.post('/addItem', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    // The following could be rewritten in a shorter way using push.
    // I'm trying to ween everyone off of push
    serverState.items = serverState.items.concat(parsedBody)
    res.send(JSON.stringify(serverState.items));
})

app.listen(4000, () => console.log('Example app listening on port 4000!'))
