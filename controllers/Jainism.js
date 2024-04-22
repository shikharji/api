const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config({ path: "./config/.env" });

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("shikharji");
const collection = database.collection("jainism");

exports.getAllJainismBlogs = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({}).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No Jainism blogs exist!",
      });
    }

    return res.send({
      success: true,
      message: "All Jainism blogs!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting all Jainism blogs!",
    });
  } finally {
    await client.close();
  }
};

exports.getJainismBlogById = async (req, res) => {
  try {
    await client.connect();

    const blog = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!blog) {
      return res.send({
        success: false,
        message: "No Jainism blog found with this ID",
      });
    }

    return res.send({
      success: true,
      message: "Jainism blog found with ID!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting Jainism blog by ID",
    });
  } finally {
    await client.close();
  }
};

exports.getCosmologyJainismBlogs = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({ category: "cosmology" }).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No cosmology Jainism blogs exist!",
      });
    }

    return res.send({
      success: true,
      message: "Cosmology Jainism blogs!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting cosmology Jainism blogs!",
    });
  } finally {
    await client.close();
  }
};

exports.getArtJainismBlogs = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({ category: "art" }).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No art Jainism blogs exist!",
      });
    }

    return res.send({
      success: true,
      message: "Art Jainism blogs!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting art Jainism blogs!",
    });
  } finally {
    await client.close();
  }
};

exports.getPracticeJainismBlogs = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({ category: "practice" }).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No practice Jainism blogs exist!",
      });
    }

    return res.send({
      success: true,
      message: "Practice Jainism blogs!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting practice Jainism blogs!",
    });
  } finally {
    await client.close();
  }
};

exports.getPhilosophyJainismBlogs = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({ category: "philosophy" }).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No philosophy Jainism blogs exist!",
      });
    }

    return res.send({
      success: true,
      message: "Philosophy Jainism blogs!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting philosophy Jainism blogs!",
    });
  } finally {
    await client.close();
  }
};

exports.getPrincipleJainismBlogs = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({ category: "principle" }).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No principle Jainism blogs exist!",
      });
    }

    return res.send({
      success: true,
      message: "Principle Jainism blogs!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting principle Jainism blogs!",
    });
  } finally {
    await client.close();
  }
};

exports.getTextsJainismBlogs = async (req, res) => {
  try {
    await client.connect();

    const blogs = await collection.find({ category: "texts" }).toArray();

    if (blogs.length === 0) {
      return res.send({
        success: false,
        message: "No texts Jainism blogs exist!",
      });
    }

    return res.send({
      success: true,
      message: "Texts Jainism blogs!",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while getting texts Jainism blogs!",
    });
  } finally {
    await client.close();
  }
};
