const Blog = require("../models/Blog");
const { verifyTokenAndStaff } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndStaff, async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const saveBlog = await newBlog.save();
    res.status(200).json(saveBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndStaff, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json("Blog has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/update/:id", verifyTokenAndStaff, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/", async (req, res) => {
  const qPage = req.query.page;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;

  let count = 0;
  try {
    let blogs;
    if (req.query.status) {
      blogs = await Blog.find({ status: req.query.status })
        .skip(perPage * page - perPage)
        .limit(perPage);

      count = await Blog.find({ status: req.query.status }).count();
    } else {
      blogs = await Blog.find()
        .skip(perPage * page - perPage)
        .limit(perPage);
      count = await Blog.find().count();
    }

    res.status(200).json({
      blogs, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL LIMIT
router.get("/all", async (req, res) => {
  try {
    let blogs;
    blogs = await Blog.find().limit(req.query.limit);

    res.status(200).json({
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:idCateBlog", async (req, res) => {
  const qPage = req.query.page;
  let page = qPage || 1;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page

  try {
    let blogs;
    if (qPage) {
      blogs = await Blog.find({
        categoryblog: req.params.idCateBlog,
        status: "APPROVAL",
      })
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      if (req.params.limit) {
        blogs = await Blog.find({
          categoryblog: req.params.idCateBlog,
          status: "APPROVAL",
        }).limit(req.query.limit);
      } else {
        blogs = await Blog.find({
          categoryblog: req.params.idCateBlog,
          status: "APPROVAL",
        });
      }
    }
    count = await Blog.find({
      categoryblog: req.params.idCateBlog,
      status: "APPROVAL",
    }).count();
    // console.log(blogs);
    res.status(200).json({
      blogs, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT BY ID -> DETAIL
router.get("/get/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json(error);
  }
});

//APPROVE BLOG
router.patch("/updatestatus/:id", async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    res.status(200).json("Update successful");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
