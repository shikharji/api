const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config({ path: "./config/.env" });

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("shikharji");
const collection = database.collection("temples");

exports.getAllTemples = async (req, res) => {
  try {
    await client.connect();

    const temples = await collection
      .find({ location: { $ne: "shikharji" } })
      .toArray();

    if (temples.length === 0) {
      return res.send({
        success: false,
        message: "No temples found!",
      });
    }

    return res.send({
      success: true,
      count: temples.length,
      message:
        "Here are all temples excluding those with location 'shikharji'!",
      temples,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting all temples!",
    });
  } finally {
    await client.close();
  }
};

exports.getTempleById = async (req, res) => {
  try {
    await client.connect();

    const temple = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!temple) {
      return res.send({
        success: false,
        message: "No temple exist with this ID!",
      });
    }

    return res.send({
      success: true,
      message: "A temple by ID",
      temple,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting temple by ID",
    });
  } finally {
    await client.close();
  }
};

exports.getOnlyShikharjiTemples = async (req, res) => {
  try {
    await client.connect();

    const temples = await collection.find({ location: "shikharji" }).toArray();

    if (temples.length === 0) {
      return res.send({
        success: false,
        message: "No Shikharji temples found!",
      });
    }

    return res.send({
      success: true,
      count: temples.length,
      message: "Here are all Shikharji temples!",
      temples,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting Shikharji temples!",
    });
  } finally {
    await client.close();
  }
};
