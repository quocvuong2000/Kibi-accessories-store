const Branch = require("../models/Branch");
const {
  verifyTokenAndStaff,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndStaff, async (req, res) => {
  const newBranch = new Branch(req.body);

  try {
    const savedBranch = await newBranch.save();
    res.status(200).json(savedBranch);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  const qPage = req.query.page;
  let perPage = 8;
  let page = qPage || 1;
  let count = 0;
  try {
    let branches;
    if (qPage) {
      branches = await Branch.find()
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      branches = await Branch.find();
    }
    count = await Branch.count();
    res.status(200).json({
      branches, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndStaff, async (req, res) => {
  try {
    await Branch.findByIdAndDelete(req.params.id);
    res.status(200).json("Branch has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
