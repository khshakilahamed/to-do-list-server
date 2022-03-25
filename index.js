const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello, from server")
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jpgna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        console.log('connected');

        const database = client.db('to-do-list');
        const listCollection = database.collection('lists');

        // GET API
        app.get('/lists', async(req,res)=>{
            const cursor = listCollection.find({});
            const result = await cursor.toArray();
            console.log(result);
            res.send(result)
        })


        // POST API
        app.post('/lists', async(req, res) => {
            const list = req.body;
            const result = await listCollection.insertOne(list);
            console.log(result);
            res.send(result);
        });



    } 
    finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);





app.listen(port, ()=>{
    console.log("listening at port", port)
})