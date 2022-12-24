const postModel = require("../../db/models/post_model");
const myHelper = require("../../app/helper");
class Post {
  static addPost = async (req, res) => {
    try {
      const postData = new postModel({
        userId: req.user._id,
        ...req.body,
      });
      await postData.save();
      myHelper.sendResponse(res, 200, true, postData, "added");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static myPosts = async (req, res) => {
    try {
      // const posts = await postModel.find({userId: req.user._id})
      await req.user.populate("myPosts");
      myHelper.sendResponse(
        res,
        200,
        true,
        {
          posts: req.user.myPosts,
          user: req.user,
        },
        "successfully get all my posts"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  //getAll (isMine)
  static getAll = async (req, res) => {
    try {
      let posts = await postModel.find();
      posts = posts.map((r) => {
        r.userId.toString() == req.user._id.toString()
          ? (r = { ...r._doc, isMine: true })
          : (r = { ...r._doc, isMine: false });
        return r;
      });
      myHelper.sendResponse(
        res,
        200,
        true,
        posts,
        "successfully get all posts"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  //get Single
  static getSingle = async (req, res) => {
    try {
      let post = await postModel.findOne({ id: req.params.id });
      if (!post) throw new Error("Post Not Found");
      post =
        post.userId.toString() == req.user._id.toString()
          ? (post = { ...post._doc, isMine: true })
          : (post = { ...post._doc, isMine: false });
      myHelper.sendResponse(
        res,
        200,
        true,
        post,
        "successfully get all this single post"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  //delete single
  static deleteSingle = async (req, res) => {
    try {
      let post = await postModel.findOneAndDelete({ id: req.params.id });
      if (post == null) throw new Error("Post Not Found");

      myHelper.sendResponse(res, 200, true, post, "Post deleted successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  //delete all
  static deleteAll = async (req, res) => {
    try {
      await postModel.deleteMany();
      myHelper.sendResponse(res, 200, true, "", "Post deleted successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  //edit
  static editSingle = async (req, res) => {};
}
module.exports = Post;
