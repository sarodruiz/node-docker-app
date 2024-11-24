import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Posts must have a title"]
  },
  body: {
    type: String,
    required: [true, "Posts must have a body"]
  }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
