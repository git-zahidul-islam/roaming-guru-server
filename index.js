const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())
// mongodb added here

const uri = "mongodb+srv://zahidulislamhere:7eGxK7yanCZggzc0@cluster0.bq1drti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        
        const travelCollection = client.db('travelDB').collection('travel')

        app.get('/travels', async(req,res) =>{
            const cursor = travelCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/travels/:id',async(req,res) =>{
            const id = req.params.id;
            const query = {_id : new ObjectId(id)}
            const result = await travelCollection.findOne(query)
            res.send(result)
        })

        app.get('/myList/:email', async(req,res) =>{
            const result = await travelCollection.find({ email: req.params.email }).toArray()
            res.send(result)
        })

        app.delete('/travels/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await travelCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/travels', async(req,res) =>{
            console.log(req.body);
            const traveler = req.body
            const result = await travelCollection.insertOne(traveler)
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





// for knowing server is running 
app.get('/', (req, res) => {
    res.send('roaming guru server is running')
})
app.listen(port, () => {
    console.log(`the port number is: ${port}`);
})