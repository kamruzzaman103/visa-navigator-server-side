const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const visaRoutes = require('./routes/visaRoutes'); // Import visa routes
const visaApplicationRoutes = require('./routes/visaApplicationRoutes');

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS

app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.DB_PASS}@cluster0.2e5uu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Database Connection
mongoose.connect(uri)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

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
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Routes
app.use('/api/visas', visaRoutes); // Visa-related routes
app.use('/api/visa-applications', visaApplicationRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Visa Navigator API is working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
