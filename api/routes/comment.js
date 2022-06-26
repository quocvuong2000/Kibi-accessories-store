const Comment = require("../models/Comment");
const User = require("../models/User");
const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");

//CREATE COMMENT
router.post("/create", verifyTokenAndAuthorization, async (req, res) => {
  const newCommentSaved = new Comment({
    username: req.body.username,
    productId: req.body.productId,
    comment: req.body.comment,
    rating: req.body.rating,
  });
  try {
    const savedData = await newCommentSaved.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json(err);
  }
});

//DELETE COMMENT
router.delete("/delete", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.body.commentId);
    // const addCart = await pInfo.save();
    res.status(200).json("Delete success");
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
});

//GET COMMENT BY USERNAME
router.get("/user/:username", async (req, res) => {
  const qPage = req.query.page;

  let perPage = 5; // số lượng comment xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let comments;
    if (qPage) {
      comments = await Comment.find({
        username: req.params.username,
      })
        .skip(perPage * page - perPage)
        .limit(perPage);
      count = comments.length;
    } else {
      comments = await Comment.find();
    }
    // console.log(count);

    // count = await Comment.count();
    res.status(200).json({
      comments, // comments trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET COMMENT BY USERNAME
router.get("/product/:productId", async (req, res) => {
  const qPage = req.query.page;

  let perPage = 5; // số lượng comment xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let comments;
    if (qPage) {
      comments = await Comment.find({
        productId: req.params.productId,
      })
        .skip(perPage * page - perPage)
        .limit(perPage);
      count = comments.length;
    } else {
      comments = await Comment.find();
    }
    // console.log(count);

    // count = await Comment.count();
    res.status(200).json({
      comments, // comments trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
