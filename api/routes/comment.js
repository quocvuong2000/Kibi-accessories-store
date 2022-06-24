const Comment = require("../models/Comment");
const User = require("../models/User");
const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");

//CREATE COMMENT
router.post("/add", verifyTokenAndAuthorization, async (req, res) => {
  const userFound = await Comment.findOne({
    username: req.body.username,
  });
  if (!userFound) {
    const newComment = {
      username: req.body.username,
      comments: [
        {
          productId: req.body.productId,
          commentList: [
            {
              content: req.body.content,
            },
          ],
        },
      ],
    };
    const newCommentSaved = new Comment(newComment)
    try {
      const savedData = await newCommentSaved.save();
      res.status(200).json(savedData)
    } catch (error) {
      res.status(500).json(err);
    }
  }else {
    const newComment = {
      
    }
  }

});

//DELETE COMMENT
router.post("/add", verifyTokenAndAuthorization, async (req, res) => {});
