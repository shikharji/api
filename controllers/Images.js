const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config({ path: "./config/.env" });

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("shikharji");
const collection = database.collection("images");

// Function to get all images
exports.getAllImages = async (req, res) => {
  try {
    await client.connect();

    const images = await collection.find({}).toArray();

    if (images.length === 0) {
      return res.send({
        success: false,
        message: "No images exist!",
      });
    }

    return res.send({
      success: true,
      message: "All images!",
      count: images.length,
      images,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting all images!",
    });
  } finally {
    await client.close();
  }
};

// Function to get an image by ID
exports.getImageById = async (req, res) => {
  try {
    await client.connect();

    const image = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!image) {
      return res.send({
        success: false,
        message: "No image found with this ID",
      });
    }

    return res.send({
      success: true,
      message: "Image found with ID!",
      image,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting image by ID",
    });
  } finally {
    await client.close();
  }
};

// Function to get only Shikharji images
exports.getOnlyShikharjiImages = async (req, res) => {
  try {
    await client.connect();

    const shikharjiImages = await collection
      .find({ category: "shikharji" })
      .toArray();

    if (shikharjiImages.length === 0) {
      return res.send({
        success: false,
        message: "No Shikharji images exist!",
      });
    }

    return res.send({
      success: true,
      message: "Shikharji images!",
      count: shikharjiImages.length,
      images: shikharjiImages,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting Shikharji images!",
    });
  } finally {
    await client.close();
  }
};
