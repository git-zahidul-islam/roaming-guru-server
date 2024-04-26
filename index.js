const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())
// mongodb added here





// for knowing server is running 
app.get('/', (req, res) => {
    res.send('roaming guru server is running')
})
app.listen(port, () => {
    console.log(`the port number is: ${port}`);
})