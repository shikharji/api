const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config({ path: "./config/.env" });

const client = new MongoClient(process.env.MONGO_URI);

exports.getAllTonks = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("shikharji");
    const collection = database.collection("tonks");

    const tonks = await collection.find({}).toArray();

    if (tonks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tonks found",
      });
    }

    return res.status(200).json({
      success: true,
      count: tonks.length,
      data: tonks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  } finally {
    await client.close();
  }
};
