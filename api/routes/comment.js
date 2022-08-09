const Comment = require("../models/Comment");
const Product = require("../models/Product");
const User = require("../models/User");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE COMMENT
router.post("/create", verifyTokenAndAuthorization, async (req, res) => {
  try {
    try {
      const newCommentSaved = new Comment({
        username: req.body.username,
        productId: req.body.productId,
        comment: req.body.comment,
        rating: req.body.rating,
        name: req.body.name,
        avatar: req.body.avatar,
        productImage: req.body.productImage,
        status: "PENDING",
      });

      const savedData = await newCommentSaved.save();

      res.status(200).json(savedData);
    } catch (error) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//DELETE COMMENT
router.post("/delete", verifyTokenAndAuthorization, async (req, res) => {
  try {
    try {
      await Comment.findByIdAndRemove(req.body.commentId);
      const comment = await Comment.find({
        productId: req.body.productId,
      });

      let total = 0;
      comment.forEach((e) => {
        total += e.rating;
      });
      console.log(comment.length);
      await Product.findByIdAndUpdate(
        req.body.productId,
        {
          avgRating:
            comment.length !== 0
              ? parseFloat((total / comment.length).toFixed(1))
              : parseFloat((total / 1).toFixed(1)),
        },
        { new: true }
      );

      // const addCart = await pInfo.save();
      res.status(200).json("Delete success");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET ALL COMMENTS PER PAGE
router.get("/get", async (req, res) => {
  try {
    try {
      const qPage = req.query.page;

      let perPage = 5; // số lượng comment xuất hiện trên 1 page
      let page = qPage || 1;
      let count = 0;
      let comments;
      if (qPage) {
        comments = await Comment.find()
          .sort({ createdAt: 1 })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
      } else {
        comments = await Comment.find();
      }
      count = await Comment.find().count();

      res.status(200).json({
        comments, // comments trên một page
        currentPage: parseInt(page), // page hiện tại
        totalPages: Math.ceil(count / perPage), // tổng số các page: ;
        totalItems: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET ALL COMMENTS BY STATUS
router.get("/getbystatus", async (req, res) => {
  try {
    try {
      const qPage = req.query.page;

      let perPage = 5; // số lượng comment xuất hiện trên 1 page
      let page = qPage || 1;
      let count = 0;
      let comments;
      if (qPage) {
        comments = await Comment.find({ status: req.query.status })
          .sort({ createdAt: 1 })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
      } else {
        comments = await Comment.find({ status: req.query.status });
      }
      count = await Comment.find({ status: req.query.status }).count();

      res.status(200).json({
        comments, // comments trên một page
        currentPage: parseInt(page), // page hiện tại
        totalPages: Math.ceil(count / perPage), // tổng số các page: ;
        totalItems: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET COMMENT BY USERNAME
router.get("/user/:username", verifyTokenAndAuthorization, async (req, res) => {
  try {
    try {
      const qPage = req.query.page;

      let perPage = 5; // số lượng comment xuất hiện trên 1 page
      let page = qPage || 1;
      let count = 0;
      let comments;
      if (qPage) {
        comments = await Comment.find({
          username: req.params.username,
          status: "APPROVAL",
        })
          .sort({ createdAt: 1 })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
      } else {
        comments = await Comment.find({
          username: req.params.username,
          status: "APPROVAL",
        });
      }
      count = await Comment.find({
        username: req.params.username,
        status: "APPROVAL",
      }).count();
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
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET COMMENT BY PRODUCT
router.get("/product/:productId", async (req, res) => {
  try {
    try {
      const qPage = req.query.page;

      let perPage = 5; // số lượng comment xuất hiện trên 1 page
      let page = qPage || 1;
      let count = 0;
      let comments;
      if (qPage) {
        comments = await Comment.find({
          productId: req.params.productId,
          status: "APPROVAL",
        })
          .sort({ createdAt: -1 })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
      } else {
        comments = await Comment.find({
          productId: req.params.productId,
          status: "APPROVAL",
        });
      }
      // console.log(count);
      count = await Comment.find({
        productId: req.params.productId,
        status: "APPROVAL",
      }).count();
      const user = await Comment.find({
        user: req.body.userid,
      });
      // count = await Comment.count();
      res.status(200).json({
        user: user,
        comments, // comments trên một page
        currentPage: page, // page hiện tại
        totalPages: Math.ceil(count / perPage), // tổng số các page: ;
        totalItems: count,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//CHECK LIKED
router.get("/liked", async (req, res) => {
  try {
    try {
      const commentFound = await Comment.findById(req.query.id);
      const temp = commentFound.userLiked.some((value) => {
        return value.username === req.query.username;
      });
      temp === true && res.status(201).json("Liked");
      temp === false && res.status(200).json("not yet");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//LIKE COMMENT
router.post("/likecomment", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const commentFound = await Comment.findById(req.query.id);
    try {
      let temp = [];
      if (!commentFound.userLiked) {
        temp = [
          {
            username: req.query.username,
          },
        ];
      } else {
        if (
          commentFound.userLiked.some(
            (el) => el.username === req.query.username
          )
        ) {
          temp = commentFound.userLiked.filter(
            (el) => el.username !== req.query.username
          );
        } else {
          temp = commentFound.userLiked;
          temp.push({ username: req.query.username });
        }
      }

      const a = await Comment.findByIdAndUpdate(
        req.query.id,
        {
          countLike: temp.length,
          userLiked: temp,
        },
        { new: true }
      );
      res.status(200).json(a);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//APPROVE BLOG
router.patch("/updatestatus/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    try {
      await Comment.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );
      const detailcomment = await Comment.findById(req.params.id);

      const comment = await Comment.find({
        productId: detailcomment.productId,
      });

      let total = detailcomment.rating;
      comment.forEach((e) => {
        total += e.rating;
      });
      const product = await Product.findByIdAndUpdate(detailcomment.productId, {
        avgRating:
          comment.length !== 0
            ? parseFloat((total / comment.length).toFixed(1))
            : parseFloat((total / 1).toFixed(1)),
      });
      await product.save();

      res.status(200).json("Update successful");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
