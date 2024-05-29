const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config({ path: "./config/.env" });

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("shikharji");
const collection = database.collection("products");

exports.getAllProducts = async (req, res) => {
  try {
    await client.connect();

    const products = await collection.find({}).toArray();

    if (products.length === 0) {
      return res.send({
        success: false,
        message: "No products exist!",
      });
    }

    return res.send({
      success: true,
      message: "All products!",
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting all products!",
    });
  } finally {
    await client.close();
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();

    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.send({
        success: false,
        message: "Product not found!",
      });
    }

    return res.send({
      success: true,
      message: "Product found!",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting product by id!",
    });
  } finally {
    await client.close();
  }
};
