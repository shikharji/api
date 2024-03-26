const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const client = new MongoClient(process.env.MONGO_URI);

const database = client.db("shikharji");
const collection = database.collection("tirthankaras");

exports.getAllTirthankar = async (req, res) => {
  try {
    await client.connect();

    const tirthankar = await collection.find({}).toArray();

    if (tirthankar.length === 0) {
      return res.send({
        success: false,
        message: "No Tirthankar exist!",
      });
    }

    return res.send({
      success: true,
      count: tirthankar.length,
      message: "All tirthankars",
      tirthankar,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting Tirthankar",
    });
  } finally {
    await client.close();
  }
};

exports.getTirthankarById = async (req, res) => {
  try {
    await client.connect();

    const tirthankar = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!tirthankar) {
      return res.send({
        success: false,
        message: "No tirthankar exist with this ID!",
      });
    }

    return res.send({
      success: true,
      message: "fetched Tirthankar with ID",
      tirthankar,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting Tirthankar by ID",
    });
  } finally {
    await client.close();
  }
};
