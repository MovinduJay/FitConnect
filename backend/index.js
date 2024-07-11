const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const stripe = require("stripe")(process.env.PAYMENT_SECRET);
const port = process.env.PORT || 3000

//middleware

app.use(cors());
app.use(express.json());

//mongodb connection

const { MongoClient, ServerApiVersion, ObjectId, deserialize } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fit-connect.qzxdufx.mongodb.net/?appName=fit-connect`;

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    //create a database and collections
    const database = client.db("fit-connect");
    const userCollection = database.collection("users");
    const classCollection = database.collection("classes");
    const cartCollection = database.collection("cart");
    const paymentsCollection = database.collection("payments");
    const enrolledCollection = database.collection("enrolled");
    const appliedCollection = database.collection("applied");

    //classes routes 
    app.post('/new-class', async (req, res) => {
      const newClass = req.body;
      //newClass.availableSeats=parseInt(newClass.availableSeats);
      const result = await classCollection.insertOne(newClass);
      res.send(result);
    })

     app.get('/classes',async (req,res)=>{
      const query ={title:"approved"};
      const result = await classCollection.find().toArray();
      res.send(result);
     })

     //get classes by instructor email
     app.get ('/classes/:email',async(req,res)=>{
      const email = req.params.email;
      const query ={instructorEmail:  email};
      const result= await classesCollection.find(query).toArray();
      res.send(result);
     })

     //manage classes 
     app.get('/classes-manage',async(req,res)=>{
      const result= await classCollection.find().toArray();
      res.send(result);
     })

     //update classes
     app.put('/change-status/:id',async(req,res)=>{
      const id = req.params.id;
      const status = req.body.status;
      const reason = req.body.reason;
      const filter = {_id: new ObjectId(id)}
      const options ={upsert:true};
      const updateDoc={
        $set:{
           status:status,
           reason:reason,
        },
      } ;
      const result= await classCollection.updateOne(filter,updateDoc,options)
      res.send (result);
     })

     //get approved classes
     app.get('/approved-classes',async(req,res)=>{
      const query ={status:'approved'};
      const result= await classCollection.find(query).toArray();
      res.send(result);
     })

     //get class single class details
     app.get('/class/:id',async(req,res)=>{
      const id = req.params.id;
      const query ={_id: new ObjectId(id)};
      const result = await classCollection.findOne(query);
      res.send(result);
     })

     //update class details (All data)
     app.put('/update-class/:id',async(req,res)=>{
      const id =req.params.id;
      const updateClass= req.body;
      const filter ={_id: new ObjectId(id)};
      const options={upsert:true};
      const updateDoc={
        $set:{
          name:updateClass.name,
          description:updateClass.description,
          price:updateClass.price,
          availableSeats:parseInt(updateClass.availableSeats),
          videoLink:updateClass.videoLink,
          status:'pending',
        }
      }
      const result= await classCollection.updateOne(filter,updateDoc,options);
      res.send(result)
     })

     //cart routes--
     app.post('/add-to-cart',async(req,res)=>{
      const newCartItem=req.body;
      const result =await cartCollection.insertOne(newCartItem);
      res.send(result);
     })

     //get cart item by id
     app.get('/card-item/:id',async(req,res)=>{
      const id= req.params.id;
      const email =req.body.email;
      const query={
        classId:id,
        userMail:email
      }
      const projection = {classId:1};
      const result= await cartCollection.findOne(query,{projection:projection})
      res.send(result)
     })

     //cart info by user email
     app.get('/cart/:email',async (req,res)=>{
      const email= req.params.email;
      const query={ userMail: email }
      const projection ={classId:1};
      const carts = await cartCollection.find(query,{projection:projection})
      const classIds=carts.map((cart)=>new ObjectId(cart.classId));
      const query2={_id:{$in:classIds}};
      const result = await classCollection.find(query2).toArray();
      res.send(result)
     })

     //delete cart items

     app.delete('/delete-cart-item/:id',async (req,res)=>{
      const id= req.params.id
      const query ={classId:id}
      const result = await cartCollection.deleteOne(query)
      res.send(result);
     })

     //payment routes
     app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount =parseInt(price)*100;
      const paymentInt= await stripe.paymentIntents.create({
        amount:amount,
        currency:"usd",
        payment_method_types:["card"],
      });
     })
    
     //post payment info to do 
     app.post ('/payment-info',async(req,res)=>{
      const paymentInfo = req.body;
      const classesId = paymentInfo.classesId
      const userEmail= paymentInfo.userEmail
      const singleClassId = req.query.classId;
      let query;
      if(singleClassId){
        query={classId: singleClassId,userMail:userEmail};

      }else{
        query={ classId :{$in:classesId}}
      }

      const classesQuery = {_id:{$in:classesId.map(id=>new ObjectId(id))}}
      const classes = await classCollection.find(classesQuery).toArray()
      const newEnrolledData={
        userEmail: userEmail,
        classId:singleClassId.map(id=>new ObjectId(id)),
        transactionId: paymentInfo.transactionId
      }

      const updatedDoc={
        $set :{
          totalEnrolled :classes.reduce((total,current)=>total+current.totalEnrolled,0)+1||0,
          availableSeats:classes.reduce((total,current)=> total+current.availableSeats,0)-1||0
        }
      }
      const updatedResult= await classCollection.updateMany(classesQuery,updatedDoc,{upsert:true})
      const enrolledResult= await enrolledCollection.insertOne(newEnrolledData);
      const deletedResult = await cartCollection.deleteMany(query);
      const paymentResult= await paymentsCollection.insertOne(paymentInfo)
      res.send({paymentResult,deletedResult,enrolledResult,updatedResult})
     })
    //get payment history
    app.get('/payment-history/:email',async (req,res)=>{
      const email = req.params.email;
      const query ={userEmail:email}
      const result = await paymentsCollection.find(query).sort({date:-1}).toArray();
      res.send(result);

    });

    //Payment history length
    app.get("/payment-history-length/:email",async(req,res)=>{
      const email = req.params.email;
      const query ={userEmail:email}
      const total = await paymentsCollection.countDocuments(query);
      res.send(total); 
    })

    //Enrollment routes 
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Devs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
