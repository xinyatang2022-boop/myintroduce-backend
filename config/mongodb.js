require('dotenv').config()
const mongoose = require('mongoose');
const uri = process.env.XinyaDB;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

module.exports = async function() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    // Ensures that the client will close when error happens.
    await mongoose.disconnect();
  }
}
// run().catch(console.dir);