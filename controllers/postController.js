import Post from "../models/postModel.js";

export async function getAllPosts (req, res, next) {
  try {
    const posts = await Post.find();
    return res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed"
    });
  }
}

export async function getOnePost (req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json({
      status: "success",
      data: {
        post
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: "failed"
    });
  }
}

export async function createPost (req, res, next) {
  try {
    const post = await Post.create(req.body);
    return res.status(200).json({
      status: "success",
      data: {
        post
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed"
    });
  }
}

export async function updatePost (req, res, next) {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    return res.status(200).json({
      status: "success",
      data: {
        post
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: "failed"
    });
  }
}

export async function deletePost (req, res, next) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "success"
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: "failed"
    });
  }
}
