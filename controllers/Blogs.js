const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config({ path: "./config/.env" });

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("shikharji");
const collection = database.collection("blogs");

exports.getAllBlog = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({}).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No blogs exist!",
      });
    }

    return res.send({
      success: true,
      message: "All blogs!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting all blogs!",
    });
  } finally {
    await client.close();
  }
};

exports.getBlogById = async (req, res) => {
  try {
    await client.connect();

    const blog = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!blog) {
      return res.send({
        success: false,
        message: "No blog found with this ID",
      });
    }

    return res.send({
      success: true,
      message: "Blog found with ID!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting blog by ID",
    });
  } finally {
    await client.close();
  }
};

exports.getOnlyJainismBlogs = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({ category: "jainism" }).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No Jainism blogs found!",
      });
    }

    return res.send({
      success: true,
      message: "Jainism blogs found!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting Jainism blogs!",
    });
  } finally {
    await client.close();
  }
};

exports.getOnlyShikharjiBlogs = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({ category: "shikharji" }).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No shikharji blogs found!",
      });
    }

    return res.send({
      success: true,
      message: "shikharji blogs found!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting shikharji blogs!",
    });
  } finally {
    await client.close();
  }
};
