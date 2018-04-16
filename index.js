const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send({Name: 'Brian Goldfarb'})
})

//Dynamic Port Binding
const PORT = process.env.PORT || 5000

app.listen(PORT)