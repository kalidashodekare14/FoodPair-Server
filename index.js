const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.POST || 5000

// middleware
app.use(cors())
app.use(express.json())

// kalidashodekare14
// xk0xziBMadKHp1XJ



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.25k7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    const foodProduct =  client.db('FoodProduct').collection('Foods')

    app.get('/food_products', async(req, res)=>{
      console.log('pagination query', req.query)
      const page = parseInt(req.query.page)
      const size = parseInt(req.query.size)
      const rusult = await foodProduct.find()
      .skip(page * size)
      .limit(size)
      .toArray()
      res.send(rusult)
    })


    app.get('/productCount', async(req, res) =>{
      const count = await foodProduct.estimatedDocumentCount();
      res.send({count})
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('FoodPair Server is Running')
})

app.listen(port, () => {
    console.log(`FoodPair Server is Running ${port}`)
})

